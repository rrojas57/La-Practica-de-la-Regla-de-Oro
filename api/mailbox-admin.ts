interface MailboxEntry {
  id: string;
  category: string;
  message: string;
  language: string;
  timestamp: string;
}

let mailboxStore: MailboxEntry[] = [];

const VALID_PINS = new Set([
  '1969',
  'silo2026',
  'regla2026',
  (process.env.ADMIN_PIN || '1969').trim(),
]);

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

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  if (req.method === 'POST') {
    try {
      const { pin } = body;
      if (!pin || !VALID_PINS.has(String(pin).trim())) {
        return res.status(401).json({ success: false, error: 'PIN o Clave Secreta incorrecta.' });
      }

      return res.status(200).json({
        success: true,
        entries: mailboxStore,
        count: mailboxStore.length,
      });
    } catch (err) {
      console.error('Error in Vercel admin mailbox:', err);
      return res.status(500).json({ success: false, error: 'Error al acceder al panel de control.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { pin, id } = body;
      if (!pin || !VALID_PINS.has(String(pin).trim())) {
        return res.status(401).json({ success: false, error: 'PIN o Clave Secreta incorrecta.' });
      }

      if (id === 'ALL') {
        mailboxStore = [];
      } else if (id && typeof id === 'string') {
        mailboxStore = mailboxStore.filter((item) => item.id !== id);
      }

      return res.status(200).json({
        success: true,
        entries: mailboxStore,
        count: mailboxStore.length,
      });
    } catch (err) {
      console.error('Error deleting entry in Vercel admin mailbox:', err);
      return res.status(500).json({ success: false, error: 'Error al eliminar la devolución.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
