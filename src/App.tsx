import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'FRIDAY SYSTEM ONLINE',
    'שלום בוס. המערכת מוכנה לפקודתך.',
    'ממתינה לחיבור ה-APK כדי להתחיל בהגנה.'
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newHistory = [...history, `> ${input}`];
    newHistory.push(`פריידי: קיבלתי בוס, אני מעבדת את "${input}"...`);
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ backgroundColor: 'black', color: '#ff4d4d', height: '100vh', padding: '20px', fontFamily: 'monospace', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', fontSize: '1.2rem' }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} style={{ display: 'flex', borderTop: '2px solid #ff4d4d', paddingTop: '15px' }}>
        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>{'>'}</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#ff4d4d', outline: 'none', flex: 1, fontSize: '1.2rem' }}
          placeholder="דבר אלי, בוס..."
        />
      </form>
    </div>
  );
}
