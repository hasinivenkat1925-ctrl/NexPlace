import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User as UserIcon, 
  RotateCcw, 
  Settings, 
  Check, 
  Copy, 
  AlertCircle,
  HelpCircle,
  Cpu,
  Layers,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: 'n8n' | 'ai';
  isError?: boolean;
}

const PRODUCTION_WEBHOOK = 'https://hasinivenkat09.app.n8n.cloud/webhook/786ae85a-6358-4735-94fd-30af429c5252/chat';
const TEST_WEBHOOK = 'https://hasinivenkat09.app.n8n.cloud/webhook-test/786ae85a-6358-4735-94fd-30af429c5252/chat';

const QUICK_PROMPTS = [
  'How to crack Google SDE rounds?',
  'What are the most frequent TCS NQT coding questions?',
  'Explain the STAR method for Amazon behavioral interviews',
  'How can I boost my resume ATS score?',
  'Explain the 4 Coffman deadlock conditions in OS'
];

export const N8nChatbot: React.FC = () => {
  const { currentUser } = usePortal();

  const [isOpen, setIsOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('nexplace_n8n_webhook_url') || PRODUCTION_WEBHOOK;
  });
  const [chatMode, setChatMode] = useState<'auto' | 'ai-only' | 'n8n-only'>(() => {
    return (localStorage.getItem('nexplace_chat_mode') as any) || 'auto';
  });
  const [showSettings, setShowSettings] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    const existing = localStorage.getItem('nexplace_n8n_session_id');
    if (existing) return existing;
    const generated = 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    localStorage.setItem('nexplace_n8n_session_id', generated);
    return generated;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('nexplace_n8n_messages');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        source: 'ai',
        text: `Hello ${currentUser ? currentUser.name.split(' ')[0] : 'there'}! 👋 I am your NexPlace AI Placement Counselor & n8n Assistant.\n\nAsk me anything! Whether it's coding problems (DSA), core CS (OS, DBMS, CN), company PYQs (Google, Amazon, TCS, Infosys), STAR behavioral answers, or resume advice — I will provide direct, accurate answers.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nexplace_n8n_messages', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('nexplace_n8n_webhook_url', webhookUrl);
  }, [webhookUrl]);

  useEffect(() => {
    localStorage.setItem('nexplace_chat_mode', chatMode);
  }, [chatMode]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleClearHistory = () => {
    const freshSession = 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    setSessionId(freshSession);
    localStorage.setItem('nexplace_n8n_session_id', freshSession);

    const welcomeMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      source: 'ai',
      text: `Chat session reset! Ask me any question related to campus placements, coding questions, company rounds, or interview preparation.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMsg]);
    setStatusNotice(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          webhookUrl: webhookUrl.trim(),
          sessionId,
          mode: chatMode,
          metadata: {
            userId: currentUser?.id || 'guest',
            userName: currentUser?.name || 'Aspirant',
            role: currentUser?.role || 'student',
            branch: currentUser?.branch || 'Computer Science'
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        if (data.n8nNotice) {
          setStatusNotice(data.n8nNotice);
        } else {
          setStatusNotice(null);
        }

        const botMessage: ChatMessage = {
          id: 'msg-' + Date.now() + '-bot',
          sender: 'bot',
          source: data.source === 'n8n' ? 'n8n' : 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to generate response.');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: 'msg-' + Date.now() + '-err',
        sender: 'bot',
        source: 'ai',
        isError: true,
        text: `Error processing request: ${err.message}. Please check your connection or switch to Direct AI mode.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-white/20 cursor-pointer"
            title="Open NexPlace AI Placement Chatbot (n8n)"
          >
            {/* Online Beacon */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>

            <div className="flex items-center space-x-1.5 font-bold text-xs tracking-wide">
              <Bot className="w-4 h-4 text-blue-200" />
              <span>AI Placement Chatbot</span>
            </div>

            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-white/20 text-white uppercase tracking-wider">
              {chatMode === 'ai-only' ? 'AI' : 'n8n'}
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[450px] h-[600px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-3.5 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-sm text-white">NexPlace AI Placement Assistant</h3>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
                  <span className={`inline-block px-1.5 py-0.2 rounded font-bold uppercase ${
                    chatMode === 'ai-only' 
                      ? 'bg-blue-500/30 text-blue-300' 
                      : 'bg-emerald-500/30 text-emerald-300'
                  }`}>
                    {chatMode === 'ai-only' ? 'Direct AI Mode' : 'n8n + AI Backup'}
                  </span>
                  <span>•</span>
                  <span>Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors ${
                  showSettings ? 'bg-white/20 text-white' : ''
                }`}
                title="Webhook & Mode Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mode Selector Strip */}
          <div className="px-4 py-2 bg-slate-900/90 text-white border-b border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold">Engine:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setChatMode('auto')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  chatMode === 'auto'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Auto (n8n + AI)
              </button>
              <button
                onClick={() => setChatMode('ai-only')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  chatMode === 'ai-only'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Direct AI
              </button>
              <button
                onClick={() => setChatMode('n8n-only')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  chatMode === 'n8n-only'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                n8n Only
              </button>
            </div>
          </div>

          {/* Settings Drawer */}
          {showSettings && (
            <div className="p-4 bg-slate-900 border-b border-slate-800 text-white text-xs space-y-3 animate-in slide-in-from-top duration-150">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">n8n Webhook Configuration</span>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Active Webhook URL
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 font-mono focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Quick switch between Production & Test URLs */}
              <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => setWebhookUrl(PRODUCTION_WEBHOOK)}
                  className={`px-2 py-1 rounded font-mono ${
                    webhookUrl === PRODUCTION_WEBHOOK 
                      ? 'bg-indigo-600 text-white font-bold' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Production (/webhook/)
                </button>
                <button
                  type="button"
                  onClick={() => setWebhookUrl(TEST_WEBHOOK)}
                  className={`px-2 py-1 rounded font-mono ${
                    webhookUrl === TEST_WEBHOOK 
                      ? 'bg-indigo-600 text-white font-bold' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Test (/webhook-test/)
                </button>
              </div>

              {/* How to activate n8n tip */}
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 space-y-1">
                <div className="font-bold text-amber-400 flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 mr-1" /> To use your n8n workflow live:
                </div>
                <p>1. Open your workflow in <b>hasinivenkat09.app.n8n.cloud</b>.</p>
                <p>2. Flip the <b>"Active"</b> toggle in the top-right corner to ON.</p>
                <p>3. If testing in editor, switch to Test URL above and click "Listen for test event".</p>
              </div>
            </div>
          )}

          {/* Workflow Inactive Notice Banner */}
          {statusNotice && (
            <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-900 text-[11px] flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">
                {statusNotice}
              </div>
            </div>
          )}

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs">
            {messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 text-[11px] ${
                    isUser 
                      ? 'bg-blue-600 text-white' 
                      : msg.source === 'n8n' 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'bg-violet-600 text-white shadow-xs'
                  }`}>
                    {isUser ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble */}
                  <div className={`group relative max-w-[85%] rounded-2xl p-3.5 space-y-1 shadow-xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : msg.isError
                        ? 'bg-red-50 text-red-900 border border-red-200 rounded-tl-none'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                  }`}>
                    {!isUser && msg.source && (
                      <div className="flex items-center space-x-1.5 pb-1 border-b border-slate-100 text-[10px] font-bold">
                        <span className={`px-1.5 py-0.2 rounded uppercase ${
                          msg.source === 'n8n' ? 'bg-indigo-100 text-indigo-700' : 'bg-violet-100 text-violet-700'
                        }`}>
                          {msg.source === 'n8n' ? 'n8n Cloud Agent' : 'NexPlace Placement AI'}
                        </span>
                      </div>
                    )}

                    <div className="whitespace-pre-line leading-relaxed font-sans text-xs pt-0.5">
                      {msg.text}
                    </div>

                    <div className={`flex items-center justify-between pt-1 text-[10px] font-medium ${
                      isUser ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:text-slate-700 flex items-center cursor-pointer"
                          title="Copy message"
                        >
                          {copiedMsgId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-medium text-slate-500 ml-1">Analyzing question...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-700 text-[10px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask anything: DSA, OS, SQL queries, company PYQs..."
              className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-colors shadow-xs cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
