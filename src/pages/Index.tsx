import { useState, useEffect } from "react";
import FridayOrb from "@/components/friday/FridayOrb";
import HUDOverlay from "@/components/friday/HUDOverlay";
import ChatInterface from "@/components/friday/ChatInterface";

const Index = () => {
  const [orbState, setOrbState] = useState<"idle" | "thinking" | "speaking">("idle");

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden border-2 border-primary/20">
      <HUDOverlay />

      <div className="relative z-10 flex flex-col items-center pt-8 pb-4 shrink-0">
        <FridayOrb state={orbState} size="md" />
        <h1 className="mt-4 text-lg font-mono tracking-[0.3em] uppercase text-primary animate-pulse">
          F.R.I.D.A.Y. CORE
        </h1>
        <div className="mt-2 px-3 py-1 bg-primary/10 rounded-full">
           <span className="text-[10px] tracking-widest uppercase text-primary font-mono font-bold">
             DIRECT LINK: ACTIVE
           </span>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-hidden">
        <ChatInterface onStateChange={setOrbState} />
      </div>
    </div>
  );
};

export default Index;
