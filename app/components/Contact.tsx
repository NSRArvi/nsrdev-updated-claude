"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "hello@nsrdev.com";
const PHONE = "+8801318214398";

const STAGES = ["Just an idea", "Need a brand", "Need design", "Need development", "Need growth / SEO"];
const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm transition-all ${
        active ? "bg-brand-gradient border-ember text-paper" : "border-line text-paper/80 hover:border-paper/30"
      }`}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [stages, setStages] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ct-big", {
        yPercent: 100, stagger: 0.1, duration: 1.3, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".ct-form", {
        y: 60, opacity: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".ct-form", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const toggle = (s: string) => setStages((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Where I am: ${stages.join(", ") || "-"}`,
      `Budget: ${budget || "-"}`,
      "",
      `${f.get("idea")}`,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project idea — " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section ref={root} id="contact" className="relative z-10 overflow-hidden bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] sm:h-[600px] sm:w-[900px] -translate-x-1/2 rounded-full bg-ion/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-volt">Start a project</p>
        <h2 className="mt-4 font-display text-[13vw] font-bold leading-[0.9] tracking-[-0.04em] sm:mt-6 sm:text-7xl lg:text-[9rem]">
          <span className="block overflow-hidden"><span className="ct-big block">Your idea.</span></span>
          <span className="block overflow-hidden"><span className="ct-big block text-volt-gradient">Our move.</span></span>
        </h2>

        <div className="mt-10 grid gap-8 sm:mt-16 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          <div className="space-y-4 sm:space-y-6">
            <p className="max-w-sm text-base text-mist sm:text-lg">
              Tell us a little about what you&apos;re building. We reply within 24 hours with next steps and a free discovery call.
            </p>
            <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-line p-4 sm:p-5 transition-colors hover:border-volt">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-ember" />
              <span className="truncate font-display text-base sm:text-xl">{EMAIL}</span>
              <ArrowRight className="ml-auto h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={`tel:${PHONE}`} className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-line p-4 sm:p-5 transition-colors hover:border-volt">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-ember" />
              <span className="font-display text-base sm:text-xl">+880 1318-214398</span>
              <ArrowRight className="ml-auto h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <form onSubmit={submit} className="ct-form glass space-y-5 rounded-3xl p-5 sm:space-y-6 sm:p-8">
            <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
              <input required name="name" placeholder="Your name" className="w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm sm:py-3.5 sm:text-base outline-none transition-colors placeholder:text-mist focus:border-volt" />
              <input required type="email" name="email" placeholder="Email address" className="w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm sm:py-3.5 sm:text-base outline-none transition-colors placeholder:text-mist focus:border-volt" />
            </div>
            <div>
              <p className="mb-2.5 text-xs text-mist sm:mb-3 sm:text-sm">Where are you right now?</p>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((s) => <Chip key={s} active={stages.includes(s)} onClick={() => toggle(s)}>{s}</Chip>)}
              </div>
            </div>
            <div>
              <p className="mb-2.5 text-xs text-mist sm:mb-3 sm:text-sm">Budget range</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>{b}</Chip>)}
              </div>
            </div>
            <textarea required name="idea" rows={4} placeholder="Tell us about your idea…" className="w-full resize-none rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm sm:py-3.5 sm:text-base outline-none transition-colors placeholder:text-mist focus:border-volt" />
            <button className="bg-brand-gradient group flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01] sm:py-4 sm:text-base">
              {sent ? "Opening your mail app…" : "Send my idea"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
