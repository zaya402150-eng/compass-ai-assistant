import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { CalendarPlus, Mic, MicOff, Sparkles, Stethoscope, X } from "lucide-react";

const PROMPTS = [
  "Book me a dentist this week",
  "What's my place in the queue?",
  "Find a skin doctor near Clifton",
];

const SCRIPT = [
  "Listening…",
  "Got it — a dentist, near you, this week.",
  "Dr. Rao has 4:30 PM tomorrow. Shall I hold it?",
];

/**
 * Sticky Caddy assistant: a voice-first helper that guides the patient and
 * hands off to booking. The voice loop is a scripted demo of the agent.
 */
export function CaddyDock() {
  const calm = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (!listening) return;
    setLine(0);
    const timers = SCRIPT.map((_, i) =>
      window.setTimeout(() => setLine(i), i * 1600),
    );
    const stop = window.setTimeout(() => setListening(false), SCRIPT.length * 1600 + 1200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(stop);
    };
  }, [listening]);

  return (
    <div className="fixed bottom-5 right-4 z-100 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="caddy-dock-surface w-[min(92vw,22rem)] origin-bottom-right overflow-hidden rounded-3xl"
            role="dialog"
            aria-label="Caddy assistant"
          >
            <div
              className="flex items-center gap-3 px-5 py-4 text-primary-foreground"
              style={{ background: "var(--gradient-care)" }}
            >
              <span className="grid size-9 place-items-center rounded-2xl bg-white/20">
                <Stethoscope aria-hidden className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-base font-extrabold leading-none">Caddy</p>
                <p className="mt-1 text-[0.7rem] font-semibold opacity-85">
                  Voice guide · books in 30s
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Caddy"
                className="ml-auto grid size-8 place-items-center rounded-full bg-white/20"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-2xl bg-secondary/70 p-4">
                <p className="text-sm font-bold leading-snug">
                  {listening ? SCRIPT[line] : "Tap the mic and just say what hurts."}
                </p>
                <div className="mt-3 flex h-6 items-end gap-1" aria-hidden>
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-1 rounded-full bg-primary/70"
                      animate={
                        listening && !calm
                          ? { height: [6, 8 + ((i * 7) % 16), 6] }
                          : { height: 6 }
                      }
                      transition={{
                        duration: 0.7 + (i % 5) * 0.12,
                        repeat: listening && !calm ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      style={{ height: 6 }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setListening(true)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setListening((v) => !v)}
                  className="btn-3d inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-extrabold text-primary-foreground"
                >
                  {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  {listening ? "Stop" : "Talk to Caddy"}
                </button>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-extrabold"
                >
                  <CalendarPlus className="size-4" />
                  Book
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Caddy assistant" : "Open Caddy assistant"}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="relative inline-flex items-center gap-2.5 rounded-full py-3 pl-3 pr-5 text-sm font-extrabold text-primary-foreground shadow-[var(--shadow-glow)]"
        style={{ background: "var(--gradient-care)" }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/40"
          animate={calm ? {} : { scale: [1, 1.28], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative grid size-9 place-items-center rounded-full bg-white/22">
          {open ? <X className="size-4.5" /> : <Sparkles className="size-4.5" />}
        </span>
        <span className="relative hidden sm:inline">Ask Caddy</span>
      </motion.button>
    </div>
  );
}
