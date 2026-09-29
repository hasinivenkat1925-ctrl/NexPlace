import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini API client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  // Dedicated Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, chatInput, webhookUrl, sessionId, mode } = req.body;
      const query = (message || chatInput || '').trim();

      if (!query) {
        return res.status(400).json({ error: 'Message query is required' });
      }

      let n8nError: string | null = null;
      let n8nReply: string | null = null;

      // 1. If webhookUrl is provided and mode !== 'ai-only', call n8n cloud webhook with a generous 25s timeout
      if (webhookUrl && mode !== 'ai-only') {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s for complex AI workflows

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
              metadata: req.body.metadata || {}
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
              n8nError = 'Your n8n workflow is currently inactive. In your n8n dashboard (hasinivenkat09.app.n8n.cloud), turn ON the "Active" toggle switch in the top-right corner.';
            } else {
              n8nError = `n8n status ${n8nRes.status}: ${errData?.message || n8nRes.statusText}`;
            }
          }
        } catch (err: any) {
          if (err.name === 'AbortError') {
            n8nError = 'n8n webhook took over 25 seconds to reply.';
          } else {
            n8nError = `Could not connect to n8n webhook: ${err.message || String(err)}`;
          }
        }
      }

      // If n8n gave a valid non-empty response, return it directly
      if (n8nReply && n8nReply.trim()) {
        return res.json({
          reply: n8nReply.trim(),
          source: 'n8n',
          n8nNotice: null
        });
      }

      // If user explicitly selected 'n8n-only' and n8n failed or was empty
      if (mode === 'n8n-only') {
        return res.json({
          reply: `⚠️ n8n workflow did not return a response.\n\n**Reason:** ${n8nError || 'Empty output from n8n node'}.\n\nPlease ensure your workflow in hasinivenkat09.app.n8n.cloud has the "Active" switch turned ON and the Chat/Webhook node is connected to an Agent output.`,
          source: 'n8n',
          n8nNotice: n8nError
        });
      }

      // 2. Intelligent AI Answer directly related to the user's specific question
      const systemInstruction = `You are NexPlace AI, an expert campus placement coach, engineering mentor, and technical interview specialist.
Your mission is to directly, accurately, and comprehensively answer the user's specific questions regarding:
- Data Structures & Algorithms (Two Pointers, Sliding Window, Trees, Graphs, DP, Heaps, Kadane, LCA, complexity analysis with Big-O).
- Core CS Subjects (Operating Systems: deadlocks, Coffman conditions, Banker's algorithm, semaphores vs mutex, paging, virtual memory; DBMS: SQL queries, normalization 1NF to BCNF, ACID properties; Computer Networks: OSI 7 layers, TCP 3-way handshake, DNS resolution; OOPs: 4 pillars, virtual functions, dynamic dispatch, design patterns).
- Company Placements & PYQs: Specific hiring rounds, syllabus, and frequently asked PYQs for Google, Microsoft, Amazon, TCS (NQT Ninja/Digital/Prime), Infosys (SP/DSE), Accenture (ASE/AASE), Goldman Sachs, etc.
- Technical & HR Interviews: Behavioral STAR method answers (Situation, Task, Action, Result), handling conflict, weaknesses, project walkthroughs.
- Tech Resumes: ATS score optimization, quantifiable bullet points, action verbs.
- Any general coding, math, aptitude, or computer science concepts.

Formatting rules:
- Directly answer the specific question asked without dodging or reciting unrelated disclaimers.
- Use clean Markdown with headers, bullet points, and code snippets when helpful.
- Be concise, accurate, and encouraging.`;

      let aiReply = '';
      let quotaExhausted = false;

      // Avoid gemini-3.8-flash since its quota limit (25M tokens) is exhausted.
      // Use gemini-3.1-flash-lite or gemini-2.5-flash.
      for (const modelName of ['gemini-3.1-flash-lite', 'gemini-2.5-flash', 'gemini-flash-latest']) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: query,
            config: {
              systemInstruction,
            }
          });
          if (response.text && response.text.trim()) {
            aiReply = response.text.trim();
            break;
          }
        } catch (err: any) {
          const errStr = (err?.message || String(err)).toLowerCase();
          if (errStr.includes('resource_exhausted') || errStr.includes('quota') || errStr.includes('429')) {
            quotaExhausted = true;
          }
          console.warn(`Model ${modelName} error:`, err?.message || err);
          await sleep(200);
        }
      }

      // If AI models encountered quota limits and n8n was not reachable, provide an informative contextual answer
      if (!aiReply) {
        if (quotaExhausted) {
          aiReply = `### Placement Knowledge Base Response\n\nYou asked about: **"${query}"**\n\n*(Notice: Google Gemini API quota for the day is currently limited; your primary **n8n Cloud Chatbot** is connected to handle live queries)*.\n\nHere are the core placement preparation recommendations:\n1. **Topic Preparation**: Check the *Topic Preparation* tab for full lecture notes, curated YouTube classes, and interactive quizzes for DSA, OS, DBMS, Networks, and OOPs.\n2. **Company PYQs**: Head to *Company Preparation* to view real interview coding questions and hiring patterns for Google, Amazon, TCS, Microsoft, and more.\n3. **Interview & STAR**: Use the *Interview Preparation* tab to practice behavioral responses and the Mock Simulator.\n\n*Tip: Turn on the **"Active"** toggle in your n8n cloud canvas (hasinivenkat09.app.n8n.cloud) so your custom n8n AI agent answers every query directly without rate limits!*`;
        } else {
          aiReply = `I understand you are asking about **"${query}"**.\n\nKey placement prep tips:\n- Review the corresponding concepts in the **Topic Preparation** or **Company Preparation** tabs for step-by-step algorithms, complexity analysis, and practice problems.\n- Feel free to rephrase or ask for a specific code solution!`;
        }
      }

      return res.json({
        reply: aiReply,
        source: 'ai',
        n8nNotice: n8nError
      });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      const errMessage = typeof error === 'object' 
        ? (error?.message || JSON.stringify(error)) 
        : String(error);

      return res.status(500).json({
        error: errMessage,
        source: 'error'
      });
    }
  });

  // Mount Vite dev middleware or serve production static assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
