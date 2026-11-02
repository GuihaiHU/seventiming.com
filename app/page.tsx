import Image from "next/image";

import { site } from "@/lib/site";

const capabilities = [
  {
    title: "Product engineering",
    body: "We build web applications end to end: data models, APIs, interfaces, and the details that keep them running.",
    tag: "End to end",
  },
  {
    title: "Interface design",
    body: "We design clear interfaces that make the product obvious to use. We work in the browser, so decisions stay honest.",
    tag: "In the browser",
  },
  {
    title: "Applied AI",
    body: "We add AI where it earns its place, with clear boundaries and human review.",
    tag: "With boundaries",
  },
] as const;

const steps = [
  {
    title: "Scope first",
    body: "We start with the smallest version worth building, and agree on what finished means before work begins.",
  },
  {
    title: "Working software early",
    body: "You see something usable early, in weeks rather than decks. Every round is real, not a mockup.",
  },
  {
    title: "Measure, then decide",
    body: "We watch how the product is actually used, then decide what deserves to be built next.",
  },
] as const;

export default function HomePage() {
  return (
    <main id="main">
      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-12 px-5 pb-16 pt-14 sm:px-8 md:pt-20 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Independent software studio
            </p>

            <h1 className="animate-rise delay-1 mt-6 text-[clamp(2.6rem,7.2vw,7.4rem)] font-medium leading-[0.93] tracking-[-0.05em]">
              <span className="block">Small software,</span>
              <span className="block">built with care.</span>
            </h1>

            <p className="animate-rise delay-2 mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
              SevenTiming designs and builds focused web products, from first
              sketch to running release.
            </p>

            <div className="animate-rise delay-3 mt-9 flex flex-wrap items-center gap-3">
              <a href={site.projectMailto} className="btn-primary">
                Start a project
              </a>
              <a href="#approach" className="btn-secondary">
                How we work
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="image-reveal relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface">
              <Image
                src="/hero.webp"
                alt="Glass towers seen from street level"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-accent/10 mix-blend-multiply"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-20">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-4">
            <h2 className="max-w-[14ch] text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
              Three things, done carefully.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {capabilities.map((item, index) => (
                <li
                  key={item.title}
                  className="reveal grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-7 md:grid-cols-[3.5rem_1fr_7rem] md:gap-8 md:py-9"
                >
                  <span className="pt-1 font-mono text-[11px] tracking-[0.14em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                  <span className="hidden pt-1.5 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:block">
                    {item.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="principle-heading"
        className="relative isolate overflow-hidden border-y border-line"
      >
        <Image
          src="/structure.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-25 grayscale"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-paper/80" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
          <h2
            id="principle-heading"
            className="reveal max-w-[24ch] text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em]"
          >
            We would rather ship a small thing that works than a large thing
            that almost does.
          </h2>
        </div>
      </section>

      <section id="approach" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
                How we work
              </h2>
              <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-muted">
                A small process, repeated until the product is right.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="reveal border-t border-line pt-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl lg:col-span-3">
              About
            </h2>

            <div className="lg:col-span-8 lg:col-start-5">
              <p className="reveal max-w-[38ch] text-2xl leading-[1.25] tracking-[-0.02em] md:text-3xl">
                SevenTiming is an independent software studio. We build our own
                products and take on a small number of client projects.
              </p>
              <p className="reveal mt-8 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                We keep the team small on purpose. Fewer handoffs, and more of
                the work done by the people who decided to do it.
              </p>
              <p className="reveal mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                Good software is mostly a matter of attention: to the problem,
                to the details, and to the people who will use it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="text-[clamp(2.6rem,6vw,5.6rem)] font-medium leading-[0.95] tracking-[-0.05em]">
                <span className="block">Start a</span>
                <span className="block">project.</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
                Tell us what you are working on. A short note is enough.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-4 flex items-center justify-between gap-4 border-b border-ink pb-3 text-lg tracking-[-0.01em] transition-colors hover:border-accent hover:text-accent sm:text-xl"
              >
                <span>{site.email}</span>
                <span
                  aria-hidden="true"
                  className="text-2xl transition-transform group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                For new projects, questions, and anything else worth a
                conversation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
