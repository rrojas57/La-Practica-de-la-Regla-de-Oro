interface MailboxEntry {
  id: string;
  category: string;
  message: string;
  language: string;
  timestamp: string;
}

// In-memory store for serverless execution
let mailboxStore: MailboxEntry[] = [];

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { category, message, language } = body || {};
      
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ success: false, error: 'El mensaje es obligatorio.' });
      }

      const newEntry: MailboxEntry = {
        id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        category: category && typeof category === 'string' ? category.trim() : 'General',
        message: message.trim(),
        language: language && typeof language === 'string' ? language.trim() : 'es',
        timestamp: new Date().toISOString(),
      };

      mailboxStore.unshift(newEntry);

      return res.status(200).json({
        success: true,
        id: newEntry.id,
        message: 'Comentario guardado correctamente en el Buzón Anónimo.',
      });
    } catch (err) {
      console.error('Error saving feedback in Vercel API:', err);
      return res.status(500).json({ success: false, error: 'Error guardando la devolución.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
