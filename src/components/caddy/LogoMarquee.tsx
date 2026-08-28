import { motion, useReducedMotion } from "motion/react";
import { Activity, HeartPulse, Hospital, Microscope, Pill, Stethoscope } from "lucide-react";

const PARTNERS = [
  { name: "Northside Care", Icon: Stethoscope },
  { name: "Glow Skin Lab", Icon: Activity },
  { name: "Little Hearts", Icon: HeartPulse },
  { name: "Caddy Smile Studio", Icon: Hospital },
  { name: "Vitalis Labs", Icon: Microscope },
  { name: "MedPoint Pharmacy", Icon: Pill },
] as const;

/** Luxe, continuously drifting strip of partner clinic marks. */
export function LogoMarquee() {
  const calm = useReducedMotion();
  const row = [...PARTNERS, ...PARTNERS];

  return (
    <section aria-label="Clinics using Caddy Care" className="relative mt-16">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="text-center text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-muted-foreground"
      >
        Trusted by <span className="foil-text foil-animate">leading clinics</span>
      </motion.p>

      <div className="logo-marquee relative mt-6 overflow-hidden py-2">
        <motion.div
          className="flex w-max items-center gap-4"
          animate={calm ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {row.map(({ name, Icon }, i) => (
            <motion.span
              key={`${name}-${i}`}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 420, damping: 20 }}
              className="glass-card group relative flex shrink-0 items-center gap-2.5 rounded-2xl px-5 py-3"
            >
              <motion.span
                className="grid size-8 place-items-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-care)" }}
                animate={calm ? {} : { rotate: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <Icon aria-hidden className="size-4" />
              </motion.span>
              <span className="whitespace-nowrap font-display text-sm font-extrabold tracking-tight">
                {name}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-foil)", mixBlendMode: "soft-light" }}
              />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
