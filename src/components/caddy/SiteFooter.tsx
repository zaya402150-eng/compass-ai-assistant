import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Heart, Instagram, Linkedin, Stethoscope, Twitter } from "lucide-react";

const COLUMNS: { title: string; links: { label: string; to?: string }[] }[] = [
  {
    title: "Patients",
    links: [
      { label: "Find doctors", to: "/" },
      { label: "Live queue", to: "/queue" },
      { label: "My profile", to: "/profile" },
      { label: "Health vault", to: "/dashboard" },
    ],
  },
  {
    title: "Clinics",
    links: [
      { label: "Doctor console", to: "/doctor" },
      { label: "Onboard a clinic", to: "/onboarding" },
      { label: "Create account", to: "/signup" },
      { label: "Sign in", to: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Caddy" },
      { label: "Careers" },
      { label: "Privacy" },
      { label: "Terms" },
    ],
  },
  {
    title: "Clinic hours",
    links: [
      { label: "Mon – Fri · 9:00 – 21:00" },
      { label: "Sat · 10:00 – 18:00" },
      { label: "Sun · emergency queue only" },
      { label: "Clifton, Karachi" },
    ],
  },
];

const MARQUEE = [
  "no lobby waiting",
  "verified clinics",
  "live queue",
  "health vault",
  "care streaks",
  "one tap booking",
];

/** Bubble crest: position / size / travel / timing for each rising blob. */
const BUBBLES = Array.from({ length: 128 }, (_, i) => ({
  position: (i / 128) * 100 + (i % 5) * 0.4,
  size: 1.6 + ((i * 37) % 40) / 10,
  distance: 4 + ((i * 53) % 40) / 6,
  time: 2.4 + ((i * 29) % 40) / 10,
  delay: -1 * (((i * 71) % 40) / 10),
}));


export function SiteFooter() {
  const calm = useReducedMotion();

  return (
    <footer className="site-footer">
      {/* goo filter used by the bubble crest */}
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <filter id="caddy-blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      {/* rising bubble crest */}
      <div className="relative h-10">
        <div aria-hidden className="footer-bubbles">
          {BUBBLES.map((b, i) => (
            <div
              key={i}
              className="footer-bubble"
              style={
                {
                  "--position": `${b.position}%`,
                  "--size": `${b.size}rem`,
                  "--distance": `${b.distance}rem`,
                  "--time": `${b.time}s`,
                  "--delay": `${b.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="footer-body">
        {/* marquee ribbon */}
        <div
          className="relative overflow-hidden py-2.5"
          style={{ background: "color-mix(in oklab, white 12%, transparent)" }}
          aria-hidden
        >
          <motion.div
            className="flex w-max gap-6 whitespace-nowrap"
            animate={calm ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="font-display text-xs font-extrabold uppercase tracking-[0.22em] opacity-85"
              >
                {word} <span className="opacity-60">✦</span>
              </span>
            ))}
          </motion.div>
        </div>


        <div className="mx-auto w-full max-w-[1500px] px-6 pb-8 pt-10 sm:px-12 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_2.6fr]">
            <div>
              <div className="flex items-center gap-3">
                <motion.span
                  className="grid size-12 shrink-0 place-items-center rounded-2xl"
                  style={{
                    background: "color-mix(in oklab, white 22%, transparent)",
                    border: "1px solid color-mix(in oklab, white 34%, transparent)",
                  }}
                  animate={calm ? {} : { rotate: [-5, 5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Stethoscope aria-hidden className="size-5.5" />
                </motion.span>
                <span className="font-display text-2xl font-extrabold leading-none">
                  Caddy Care
                </span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-80">
                The daily operating system for small clinics — bookings, live queue, patient
                records and follow-ups, wrapped in something patients actually enjoy using.
              </p>

              <div className="mt-6 flex gap-3">
                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    aria-label="Caddy Care social"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 420, damping: 14 }}
                    className="grid size-11 place-items-center rounded-2xl"
                    style={{
                      background: "color-mix(in oklab, white 16%, transparent)",
                      border: "1px solid color-mix(in oklab, white 28%, transparent)",
                    }}
                  >
                    <Icon aria-hidden className="size-4.5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:justify-items-end">
              {COLUMNS.map((col) => (
                <div key={col.title} className="min-w-0">
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] opacity-70">
                    {col.title}
                  </p>
                  <ul className="mt-4 space-y-3 text-sm font-semibold">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.to ? (
                          <Link to={l.to} className="inline-block hover:translate-x-0.5">
                            {l.label}
                          </Link>
                        ) : (
                          <span className="inline-block opacity-80">{l.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 pb-20 text-xs font-semibold opacity-80 sm:pb-6 lg:pr-56"
            style={{ borderTop: "1px solid color-mix(in oklab, white 20%, transparent)" }}
          >

            <p>© {new Date().getFullYear()} Caddy Care. Built for clinics that care.</p>
            <p className="inline-flex items-center gap-1.5">
              Made with
              <motion.span
                animate={calm ? {} : { scale: [1, 1.35, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart aria-hidden className="size-3" />
              </motion.span>
              for waiting rooms everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
