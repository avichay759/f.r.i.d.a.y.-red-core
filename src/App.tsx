import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState([
    'FRIDAY CORE v1.0.5 - ONLINE',
    'SYSTEM STATUS: ACTIVE',
    'ממתינה לחיבור ה-GitHub Token להפעלת פרוטוקול שדרוג...'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLog(prev => [...prev, `> ${input}`, 'המערכת זיהתה פקודה. נדרש טוקן לאישור ביצוע.']);
    setInput('');
  };

  return (
    <div style={{ backgroundColor: 'black', color: '#ff0000', height: '100vh', padding: '20px', fontFamily: 'monospace', overflow: 'hidden' }}>
      <div style={{ height: '90%', overflowY: 'auto', marginBottom: '10px' }}>
        {log.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
      </div>
      <form onSubmit={handleCommand} style={{ display: 'flex', borderTop: '1px solid #ff0000', paddingTop: '10px' }}>
        <span style={{ marginRight: '10px' }}>{'>'}</span>
        <input 
          autoFocus
          style={{ backgroundColor: 'transparent', border: 'none', color: '#ff0000', outline: 'none', flex: 1, fontSize: '16px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
