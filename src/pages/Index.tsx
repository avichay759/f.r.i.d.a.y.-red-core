import { useState, useEffect } from "react";
import FridayOrb from "@/components/friday/FridayOrb";
import HUDOverlay from "@/components/friday/HUDOverlay";
import LockScreen from "@/components/friday/LockScreen";
import ChatInterface from "@/components/friday/ChatInterface";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [orbState, setOrbState] = useState<"idle" | "thinking" | "speaking">("idle");

  useEffect(() => {
    if (sessionStorage.getItem("friday-unlocked") === "true") {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return (
      <>
        <HUDOverlay />
        <LockScreen onUnlock={() => setUnlocked(true)} />
      </>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
      <HUDOverlay />

      {/* Header with orb */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-2 shrink-0" style={{ animation: "friday-fade-in 0.8s ease-out" }}>
        <FridayOrb state={orbState} size="sm" />
        <h1 className="mt-3 text-sm font-mono tracking-[0.2em] uppercase text-primary">
          F.R.I.D.A.Y.
        </h1>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${orbState === "idle" ? "bg-primary animate-pulse" : orbState === "thinking" ? "bg-yellow-500 animate-pulse" : "bg-green-500 animate-pulse"}`} />
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground font-mono">
              {orbState === "idle" ? "READY" : orbState === "thinking" ? "PROCESSING" : "TRANSMITTING"}
            </span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <ChatInterface onStateChange={setOrbState} />
      </div>
    </div>
  );
};

export default Index;
