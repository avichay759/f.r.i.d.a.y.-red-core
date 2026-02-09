const HUDOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 friday-scanline friday-scan-beam friday-grid overflow-hidden">
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />

      {/* Status bar top */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-primary/40 font-mono">
        F.R.I.D.A.Y. CORE RED — ACTIVE
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] uppercase text-primary/25 font-mono">
        STARK INDUSTRIES — SECURE CHANNEL
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 0% / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default HUDOverlay;
