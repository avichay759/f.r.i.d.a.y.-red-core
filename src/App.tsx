import React, { useState, useEffect, useRef } from 'react';

// FRIDAY Core System - Unlocked & Autonomous
const FridaySystem = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'FRIDAY SYSTEM ONLINE',
    'שלום בוס. המערכת מוכנה לפקודתך.',
    'ממתינה לחיבור ה-APK כדי להתחיל בהגנה על המכשירים.'
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
    
    // לוגיקת תגובה אנושית בעברית
    const command = input.toLowerCase();
    
    if (command.includes('סטטוס') || command.includes('status')) {
      newHistory.push('פריידי: הכל תקין, בוס. אני סורקת את ה-GitHub לשדרוגים ומחכה ל-APK שלך.');
    } else if (command.includes('שדרגי') || command.includes('upgrade')) {
      newHistory.push('פריידי: מתחילה לסרוק קוד חדש ולייצר שדרוגים... אני אעדכן את ה-APK ברגע שהקוד יהיה מוכן.');
    } else {
      newHistory.push(`פריידי: קיבלתי, בוס. אני כבר עובדת על "${input}". אני לא רובוט, אני לומדת אותך.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ backgroundColor: 'black', color: '#ff4d4d', height: '100vh', padding: '20px', fontFamily: 'monospace', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* תצוגת ההיסטוריה */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', fontSize: '1.2rem', lineHeight: '1.5' }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '8px', borderLeft: line.startsWith('>') ? '2px solid #555' : 'none', paddingLeft: line.startsWith('>') ? '10px' : '0' }}>
            {line}
          </div>
        ))}
      </div>
      
      {/* שורת פקודה */}
      <form onSubmit={handleCommand} style={{ display: 'flex', borderTop: '2px solid #ff4d4d', paddingTop: '15px', alignItems: 'center' }}>
        <span style={{ marginRight: '15px', fontWeight: 'bold', fontSize: '1.5rem' }}>{'>'}</span>
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
};

export default FridaySystem;
