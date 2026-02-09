import { useState, useCallback } from "react";
import FridayOrb from "./FridayOrb";

interface LockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PIN = "1234";
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30000; // 30 seconds

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const isLockedOut = lockedUntil !== null && Date.now() < lockedUntil;

  const handleKey = useCallback(
    (key: string) => {
      if (isLockedOut || unlocking) return;

      if (key === "DEL") {
        setPin((p) => p.slice(0, -1));
        setError(false);
        return;
      }

      if (key === "CLR") {
        setPin("");
        setError(false);
        return;
      }

      const newPin = pin + key;
      if (newPin.length > 4) return;

      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setUnlocking(true);
          sessionStorage.setItem("friday-unlocked", "true");
          setTimeout(onUnlock, 800);
        } else {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          setError(true);

          if (newAttempts >= MAX_ATTEMPTS) {
            setLockedUntil(Date.now() + LOCKOUT_DURATION);
            setTimeout(() => {
              setLockedUntil(null);
              setAttempts(0);
            }, LOCKOUT_DURATION);
          }

          setTimeout(() => {
            setPin("");
            setError(false);
          }, 600);
        }
      }
    },
    [pin, attempts, isLockedOut, unlocking, onUnlock]
  );

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "CLR", "0", "DEL"];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      style={{
        animation: unlocking ? "friday-unlock 0.8s ease-in forwards" : undefined,
      }}
    >
      <div
        className="flex flex-col items-center gap-6"
        style={{ animation: "friday-fade-in 0.6s ease-out" }}
      >
        <FridayOrb state={unlocking ? "speaking" : error ? "thinking" : "idle"} size="sm" />

        <p className="text-xs tracking-[0.3em] uppercase text-primary/60 font-mono">
          {isLockedOut
            ? "SYSTEM LOCKED — THREAT DETECTED"
            : "IDENTITY VERIFICATION REQUIRED"}
        </p>

        {/* PIN dots */}
        <div
          className="flex gap-3"
          style={{ animation: error ? "pin-shake 0.4s ease-in-out" : undefined }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                i < pin.length
                  ? error
                    ? "bg-destructive border-destructive shadow-[0_0_10px_hsl(0_84%_60%/0.5)]"
                    : "bg-primary border-primary shadow-[0_0_10px_hsl(0_85%_45%/0.5)]"
                  : "border-primary/30"
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              disabled={isLockedOut}
              className={`w-16 h-14 rounded-md font-mono text-sm tracking-wider transition-all duration-150
                ${isLockedOut
                  ? "border border-destructive/20 text-destructive/30 cursor-not-allowed"
                  : "border border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40 hover:shadow-[0_0_15px_hsl(0_85%_45%/0.15)] active:bg-primary/20 active:scale-95"
                }`}
            >
              {key}
            </button>
          ))}
        </div>

        {error && !isLockedOut && (
          <p className="text-[10px] tracking-widest uppercase text-destructive/70 font-mono">
            ACCESS DENIED — {MAX_ATTEMPTS - attempts} ATTEMPTS REMAINING
          </p>
        )}
      </div>
    </div>
  );
};

export default LockScreen;
