import { useState, useEffect } from "react";
import FridayOrb from "@/components/friday/FridayOrb";
import HUDOverlay from "@/components/friday/HUDOverlay";
import LockScreen from "@/components/friday/LockScreen";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [orbState, setOrbState] = useState<"idle" | "thinking" | "speaking">("idle");

  useEffect(() => {
    if (sessionStorage.getItem("friday-unlocked") === "true") {
      setUnlocked(true);
    }
  }, []);

  // Cycle through states for demo
  useEffect(() => {
    if (!unlocked) return;
    const interval = setInterval(() => {
      setOrbState((s) => (s === "idle" ? "thinking" : s === "thinking" ? "speaking" : "idle"));
    }, 4000);
    return () => clearInterval(interval);
  }, [unlocked]);

  if (!unlocked) {
    return (
      <>
        <HUDOverlay />
        <LockScreen onUnlock={() => setUnlocked(true)} />
      </>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background overflow-hidden">
      <HUDOverlay />

      <div className="relative z-10 flex flex-col items-center gap-8" style={{ animation: "friday-fade-in 0.8s ease-out" }}>
        <FridayOrb state={orbState} size="lg" />

        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-mono tracking-[0.2em] uppercase text-primary">
            F.R.I.D.A.Y.
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono">
            Female Replacement Intelligent Digital Assistant Youth
          </p>
        </div>

        <div className="mt-8 px-6 py-3 border border-primary/20 rounded-md bg-friday-panel/50 backdrop-blur-sm max-w-md text-center">
          <p className="text-sm text-friday-text font-mono leading-relaxed">
            Good to see you, <span className="text-primary">Boss</span>. All systems nominal. 
            <br />
            <span className="text-muted-foreground text-xs">Core Red is online and awaiting your command.</span>
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono">SYSTEMS ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono">AI BRAIN: PENDING</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono">VOICE: OFFLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
