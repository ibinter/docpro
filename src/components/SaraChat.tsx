'use client';
import { useState, useRef, useEffect } from 'react';

interface Msg { role: 'user' | 'assistant'; content: string }

const WELCOME: Msg = {
  role: 'assistant',
  content: "Bonjour ! Je suis SARA, votre assistante IBIG DocPro 👋\nJe vous aide à trouver le bon document, comprendre nos tarifs, ou répondre à vos questions. Comment puis-je vous aider ?",
};

export default function SaraChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const updated: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/sara/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json() as { reply?: string };
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply ?? '…' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Une erreur s'est produite. Réessayez ou contactez-nous par WhatsApp." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bulle flottante */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Parlez à SARA — assistant IBIG DocPro"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1100,
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          background: 'linear-gradient(135deg,#1565C0,#0D2B4E)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,.35)',
          transition: 'transform .15s',
        }}
        aria-label="Ouvrir l'assistant SARA"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Panneau chat */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 24, zIndex: 1099,
          width: 'min(360px, calc(100vw - 48px))',
          background: '#fff', borderRadius: 14,
          boxShadow: '0 8px 40px rgba(0,0,0,.22)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          maxHeight: '70vh',
        }}>
          {/* En-tête */}
          <div style={{
            background: 'linear-gradient(135deg,#1565C0,#0D2B4E)',
            color: '#fff', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', flexShrink: 0,
            }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '.95rem' }}>SARA</div>
              <div style={{ fontSize: '.75rem', opacity: .8 }}>Assistante IBIG DocPro · En ligne</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '14px 14px 8px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '82%',
                  background: m.role === 'user' ? '#1565C0' : '#f0f4f8',
                  color: m.role === 'user' ? '#fff' : '#222',
                  padding: '10px 13px', borderRadius: 12,
                  fontSize: '.88rem', lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  borderBottomRightRadius: m.role === 'user' ? 3 : 12,
                  borderBottomLeftRadius: m.role === 'assistant' ? 3 : 12,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#f0f4f8', padding: '10px 14px', borderRadius: 12,
                  fontSize: '.85rem', color: '#888',
                }}>
                  SARA rédige…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions rapides */}
          {messages.length === 1 && (
            <div style={{ padding: '0 10px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Combien ça coûte ?', 'Quels documents ?', 'Comment payer ?'].map(s => (
                <button key={s} onClick={() => { setInput(s); }}
                  style={{
                    background: '#f0f4f8', border: '1px solid #dde', borderRadius: 16,
                    padding: '4px 10px', fontSize: '.78rem', cursor: 'pointer', color: '#1565C0',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Zone de saisie */}
          <div style={{
            borderTop: '1px solid #eee', padding: '10px 12px',
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="Posez votre question…"
              disabled={loading}
              style={{
                flex: 1, border: '1px solid #dde', borderRadius: 8, padding: '8px 12px',
                fontSize: '.88rem', outline: 'none', background: '#fafafa',
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: '#1565C0', border: 'none', color: '#fff',
                width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
                opacity: loading || !input.trim() ? .5 : 1,
              }}
              aria-label="Envoyer"
            >
              ➤
            </button>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center', fontSize: '.7rem', color: '#bbb', padding: '4px 0 8px',
          }}>
            SARA · IBIG DocPro — <a href="https://wa.me/2250555059901" target="_blank" rel="noopener noreferrer"
              style={{ color: '#25D366' }}>WhatsApp si urgent</a>
          </div>
        </div>
      )}
    </>
  );
}
