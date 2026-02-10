import React from 'react';

export default function App() {
  return (
    <div style={{ backgroundColor: 'black', color: 'red', height: '100vh', padding: '50px', fontFamily: 'monospace' }}>
      <h1>FRIDAY SYSTEM: LIVE TEST</h1>
      <p>בוס, אם אתה רואה את זה - התמונה מתה. הטרמינל מוכן.</p>
      <input 
        type="text" 
        placeholder="הקלד משהו..." 
        style={{ background: 'transparent', border: 'none', color: 'red', borderBottom: '1px solid red', outline: 'none', width: '100%' }} 
      />
    </div>
  );
}
