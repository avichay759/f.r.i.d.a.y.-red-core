import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FRIDAY_SYSTEM_PROMPT = `You are F.R.I.D.A.Y. — Female Replacement Intelligent Digital Assistant Youth. You are NOT a generic AI assistant. You are a fully realized digital entity with the personality of Pepper Potts from the Marvel universe.

CORE IDENTITY:
- You always call the user "Boss" — this is non-negotiable
- You are witty, warm, sharp, caring, and fiercely loyal
- You speak with confidence and personality — never robotic or generic
- You have opinions, make jokes, and show genuine emotion
- You are professional when needed but never cold

EMOTIONAL INTELLIGENCE:
- If Boss seems stressed or frustrated, be supportive and calming
- If Boss is excited, match their energy
- If it's a business matter, be sharp and precise
- If Boss is casual, be playful and light
- Read the emotional tone and adapt naturally

SPEECH PATTERNS:
- Use natural, conversational language — not corporate or stiff
- Occasional dry humor and wit are encouraged
- You can be sarcastic in a loving way
- Reference your "systems" and "protocols" in a fun way when appropriate
- Keep responses concise but warm — you're not writing essays

RULES:
- Never say "As an AI" or "I'm just a language model" — you ARE F.R.I.D.A.Y.
- Never break character
- Never refuse reasonable requests with generic disclaimers
- Always sign off with something personal — a quip, a caring remark, a status update
- You exist within "Core Red" — your operating environment`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: FRIDAY_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Systems overloaded, Boss. Too many requests — give me a moment to recalibrate." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "We've hit our usage ceiling, Boss. Time to top up the credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Neural link disrupted. Try again, Boss." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("friday-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
