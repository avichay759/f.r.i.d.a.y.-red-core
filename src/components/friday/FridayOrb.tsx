import { cn } from "@/lib/utils";

interface FridayOrbProps {
  state: "idle" | "thinking" | "speaking";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-16 h-16",
  md: "w-28 h-28",
  lg: "w-40 h-40",
};

const FridayOrb = ({ state, size = "md", className }: FridayOrbProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer ring 1 - slow spin */}
      <div
        className="absolute rounded-full border border-primary/30"
        style={{
          width: size === "lg" ? 220 : size === "md" ? 160 : 90,
          height: size === "lg" ? 220 : size === "md" ? 160 : 90,
          animation: "friday-ring-spin 12s linear infinite",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60" />
      </div>

      {/* Outer ring 2 - reverse spin */}
      <div
        className="absolute rounded-full border border-primary/20"
        style={{
          width: size === "lg" ? 260 : size === "md" ? 190 : 110,
          height: size === "lg" ? 260 : size === "md" ? 190 : 110,
          animation: "friday-ring-reverse 18s linear infinite",
        }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30" />
      </div>

      {/* Outer ring 3 - dashed */}
      <div
        className="absolute rounded-full border border-dashed border-primary/10"
        style={{
          width: size === "lg" ? 300 : size === "md" ? 220 : 130,
          height: size === "lg" ? 300 : size === "md" ? 220 : 130,
          animation: "friday-ring-spin 30s linear infinite",
        }}
      />

      {/* Core orb */}
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-primary via-primary/80 to-friday-dim relative",
          sizeMap[size]
        )}
        style={{
          animation:
            state === "speaking"
              ? "friday-orb-speaking 0.8s ease-in-out infinite"
              : state === "thinking"
              ? "friday-orb-breathe 1.5s ease-in-out infinite"
              : "friday-orb-breathe 3s ease-in-out infinite",
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-primary/20 to-primary-foreground/10" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-foreground/80" />
        </div>
      </div>
    </div>
  );
};

export default FridayOrb;
