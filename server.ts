import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// 1. Safe initialization of GoogleGenAI with Environment Variable and telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

type SupportedLanguages = "es" | "en" | "fr" | "de" | "pt";

interface TranslationRequestBody {
  text: string;
  targetLang: SupportedLanguages;
}

interface MailboxEntry {
  id: string;
  category: string;
  message: string;
  language: string;
  timestamp: string;
}

const MAILBOX_FILE = path.join(process.cwd(), "mailbox_data.json");
let mailboxStore: MailboxEntry[] = [];

// Load persisted feedback on startup
try {
  if (fs.existsSync(MAILBOX_FILE)) {
    const rawData = fs.readFileSync(MAILBOX_FILE, "utf-8");
    mailboxStore = JSON.parse(rawData);
  }
} catch (err) {
  console.warn("Could not read mailbox_data.json on startup:", err);
  mailboxStore = [];
}

function saveMailboxToDisk() {
  try {
    fs.writeFileSync(MAILBOX_FILE, JSON.stringify(mailboxStore, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist mailbox data to disk:", err);
  }
}

const VALID_PINS = new Set([
  "1969",
  "silo2026",
  "regla2026",
  (process.env.ADMIN_PIN || "1969").trim(),
]);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser is mandatory for receiving req.body
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mailbox Public Submission Route
  app.post("/api/mailbox", (req: Request, res: Response): void => {
    try {
      const { category, message, language } = req.body || {};
      if (!message || typeof message !== "string" || message.trim() === "") {
        res.status(400).json({ success: false, error: "El mensaje es obligatorio." });
        return;
      }

      const newEntry: MailboxEntry = {
        id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        category: category && typeof category === "string" ? category.trim() : "General",
        message: message.trim(),
        language: language && typeof language === "string" ? language.trim() : "es",
        timestamp: new Date().toISOString(),
      };

      mailboxStore.unshift(newEntry); // newest first
      saveMailboxToDisk();

      res.status(200).json({
        success: true,
        id: newEntry.id,
        message: "Comentario guardado correctamente en el Buzón Anónimo.",
      });
    } catch (err) {
      console.error("Error saving feedback in /api/mailbox:", err);
      res.status(500).json({ success: false, error: "Error interno guardando la devolución." });
    }
  });

  // Mailbox Admin Authentication & Retrieval Route (PIN Protected)
  app.post("/api/mailbox/admin", (req: Request, res: Response): void => {
    try {
      const { pin } = req.body || {};
      if (!pin || !VALID_PINS.has(String(pin).trim())) {
        res.status(401).json({ success: false, error: "PIN o Clave Secreta incorrecta." });
        return;
      }

      res.status(200).json({
        success: true,
        entries: mailboxStore,
        count: mailboxStore.length,
      });
    } catch (err) {
      console.error("Error accessing admin mailbox:", err);
      res.status(500).json({ success: false, error: "Error al acceder al panel de control." });
    }
  });

  // Mailbox Admin Delete Entry Route (PIN Protected)
  app.delete("/api/mailbox/admin", (req: Request, res: Response): void => {
    try {
      const { pin, id } = req.body || {};
      if (!pin || !VALID_PINS.has(String(pin).trim())) {
        res.status(401).json({ success: false, error: "PIN o Clave Secreta incorrecta." });
        return;
      }

      if (id === "ALL") {
        mailboxStore = [];
      } else if (id && typeof id === "string") {
        mailboxStore = mailboxStore.filter((item) => item.id !== id);
      }

      saveMailboxToDisk();

      res.status(200).json({
        success: true,
        entries: mailboxStore,
        count: mailboxStore.length,
      });
    } catch (err) {
      console.error("Error deleting entry from admin mailbox:", err);
      res.status(500).json({ success: false, error: "Error al eliminar la devolución." });
    }
  });

  // Translation route requested by user
  app.post("/api/translate", async (req: Request, res: Response): Promise<void> => {
    try {
      const { text, targetLang } = req.body as TranslationRequestBody;

      // Validation
      if (!text || typeof text !== "string" || text.trim() === "") {
        res.status(400).json({ error: "El texto a traducir es requerido y debe ser una cadena válida." });
        return;
      }

      const validLanguages: SupportedLanguages[] = ["es", "en", "fr", "de", "pt"];
      if (!validLanguages.includes(targetLang)) {
        res.status(400).json({ error: `Idioma destino no soportado. Opciones válidas: ${validLanguages.join(", ")}` });
        return;
      }

      // Basic sanitization to neutralize potential XSS in dynamic text
      const sanitizedText = text
        .replace(/<script[^>]*>([\S\s]*?)<\/script>/gi, "") // Removes script tags
        .replace(/on\w+="[^"]*"/gi, ""); // Removes inline event handlers

      // Model call with strict system instructions
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `[Idioma_Destino]: ${targetLang}\n[Texto_A_Traducir]: ${sanitizedText}`,
        config: {
          systemInstruction: `Eres un microservicio API de traducción en tiempo real de baja latencia incorporado en la aplicación "La Práctica de la Regla de Oro".
Tu única tarea es traducir el texto dinámico que introduce el usuario al idioma destino especificado, manteniendo el formato original (HTML, Markdown o texto plano).

RESTRICCIONES CRÍTICAS:
1. No saludes, no expliques la traducción y no respondas al usuario bajo ningún concepto. Tu salida debe ser ÚNICAMENTE el string con el texto traducido limpio.
2. Conserva intactos los nombres propios, variables entre corchetes (ej: {user}) y emojis.
3. Si el idioma destino es 'de' (Alemán), utiliza obligatoriamente conjugaciones formales de respeto ("Sie").
4. Si el idioma destino es 'pt' (Portugués), utiliza un estándar neutro internacional aplicable tanto a Brasil como a Portugal.`,
          temperature: 0.0, // Ensures maximum accuracy and linguistic determinism
        },
      });

      const translatedText = response.text?.trim();

      if (!translatedText) {
        throw new Error("La API de Google devolvió una respuesta vacía.");
      }

      res.status(200).json({ translatedText });
    } catch (error) {
      console.error("Error crítico en el endpoint de traducción:", error);
      res.status(500).json({ error: "Error interno del servidor al procesar la traducción automática." });
    }
  });

  // Vite middleware for development vs static asset serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
