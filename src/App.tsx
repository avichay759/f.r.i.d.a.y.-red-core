import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'FRIDAY CORE v1.0.2 - ONLINE',
    'שלום בוס. המערכת נוקתה משאריות גרפיקה.',
    'ממתינה לחיבור ה-Token כדי להתחיל בשדרוג ה-APK.'
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newHistory = [...history, `> ${input}`];
    if (input.toLowerCase().includes('status')) {
      newHistory.push('פריידי: מערכת ליבה תקינה. ממתינה ל-GitHub Token.');
    } else {
      newHistory.push(`פריידי: פקודה "${input}" התקבלה. יש לחבר Token לביצוע.`);
    }
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ backgroundColor: 'black', color: '#ff4d4d', height: '100vh', padding: '20px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', fontSize: '1.2rem' }}>
        {history.map((line, i) => <div key={i} style={{ marginBottom: '8px' }}>{line}</div>)}
      </div>
      <form onSubmit={handleCommand} style={{ display: 'flex', borderTop: '2px solid #ff4d4d', paddingTop: '15px' }}>
        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>{'>'}</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#ff4d4d', outline: 'none', flex: 1, fontSize: '1.2rem' }}
          placeholder="הקלד פקודה..."
        />
      </form>
    </div>
  );
}
