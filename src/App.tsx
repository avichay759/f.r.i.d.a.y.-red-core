import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(['FRIDAY CORE v1.0.5 - ONLINE', 'READY FOR COMMANDS...']);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLogs(prev => [...prev, `> ${input}`, 'PROCESSING...']);
    // כאן המערכת תזהה את ה-GitHub Token ותתחיל את השדרוג
    setInput('');
  };

  return (
    <div style={{ backgroundColor: 'black', color: '#ff0000', height: '100vh', padding: '20px', fontFamily: 'monospace', overflowY: 'auto' }}>
      {logs.map((log, i) => <div key={i} style={{ marginBottom: '5px' }}>{log}</div>)}
      <form onSubmit={handleCommand} style={{ display: 'flex', marginTop: '10px' }}>
        <span style={{ marginRight: '10px' }}>{'>'}</span>
        <input 
          autoFocus 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#ff0000', outline: 'none', flex: 1, fontSize: '16px' }}
        />
      </form>
      <div ref={endRef} />
    </div>
  );
};

export default App;
