import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Enable CORS for Vercel serverless function
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, chatInput, webhookUrl, sessionId, mode } = req.body || {};
    const query = (message || chatInput || '').trim();

    if (!query) {
      return res.status(400).json({ error: 'Message query is required' });
    }

    let n8nError: string | null = null;
    let n8nReply: string | null = null;

    // 1. If webhookUrl is provided and mode !== 'ai-only', call n8n cloud webhook
    if (webhookUrl && mode !== 'ai-only') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const n8nRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
          },
          body: JSON.stringify({
            action: 'sendMessage',
            chatInput: query,
            message: query,
            query: query,
            question: query,
            sessionId: sessionId || 'default-session',
            metadata: req.body?.metadata || {}
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (n8nRes.ok) {
          const contentType = n8nRes.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data: any = await n8nRes.json();
            if (typeof data === 'string') {
              n8nReply = data;
            } else if (data.output) {
              n8nReply = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
            } else if (data.response) {
              n8nReply = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
            } else if (data.text) {
              n8nReply = data.text;
            } else if (Array.isArray(data) && data[0]?.output) {
              n8nReply = typeof data[0].output === 'string' ? data[0].output : JSON.stringify(data[0].output);
            } else if (Array.isArray(data) && data[0]?.text) {
              n8nReply = data[0].text;
            } else if (data.message && !data.code) {
              n8nReply = data.message;
            } else {
              n8nReply = JSON.stringify(data, null, 2);
            }
          } else {
            n8nReply = await n8nRes.text();
          }
        } else {
          const errData: any = await n8nRes.json().catch(() => null);
          if (n8nRes.status === 404 && errData?.message?.includes('not registered')) {
            n8nError = 'Your n8n workflow is currently inactive. Turn ON the "Active" toggle in the top-right corner of your n8n canvas.';
          } else {
            n8nError = `n8n status ${n8nRes.status}: ${errData?.message || n8nRes.statusText}`;
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          n8nError = 'n8n webhook took over 20s to respond.';
        } else {
          n8nError = `Could not connect to n8n webhook: ${err.message || String(err)}`;
        }
      }
    }

    if (n8nReply && n8nReply.trim()) {
      return res.status(200).json({
        reply: n8nReply.trim(),
        source: 'n8n',
        n8nNotice: null
      });
    }

    if (mode === 'n8n-only') {
      return res.status(200).json({
        reply: `⚠️ n8n workflow did not return a response.\n\n**Reason:** ${n8nError || 'Empty output from n8n node'}.`,
        source: 'n8n',
        n8nNotice: n8nError
      });
    }

    // 2. Fallback to Gemini if API key is present
    let aiReply = '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        for (const modelName of ['gemini-3.1-flash-lite', 'gemini-2.5-flash', 'gemini-flash-latest']) {
          try {
            const result = await ai.models.generateContent({
              model: modelName,
              contents: query,
              config: {
                systemInstruction: 'You are NexPlace AI, an expert campus placement coach. Answer technical and interview questions clearly.'
              }
            });
            if (result.text && result.text.trim()) {
              aiReply = result.text.trim();
              break;
            }
          } catch {}
        }
      } catch {}
    }

    if (!aiReply) {
      aiReply = `I received your question about **"${query}"**.\n\nPlease ensure your n8n workflow in hasinivenkat09.app.n8n.cloud is toggled to **Active** to process this request through your custom nodes.`;
    }

    return res.status(200).json({
      reply: aiReply,
      source: 'ai',
      n8nNotice: n8nError
    });
  } catch (error: any) {
    const errMessage = typeof error === 'object' ? (error?.message || JSON.stringify(error)) : String(error);
    return res.status(500).json({
      error: errMessage,
      source: 'error'
    });
  }
}
