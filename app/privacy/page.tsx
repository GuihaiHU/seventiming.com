import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How SevenTiming handles information on this website.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-16 sm:px-8 md:pt-24 lg:px-12"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] md:text-5xl">
            Privacy
          </h1>
          <p className="mt-4 text-sm text-muted">
            Last updated: November 2, 2026
          </p>
        </div>

        <div className="space-y-10 lg:col-span-7 lg:col-start-6">
          <p className="text-xl leading-relaxed tracking-[-0.01em]">
            This is a static website. It does not use cookies, analytics,
            advertising, or tracking scripts.
          </p>

          <section className="space-y-3 border-t border-line pt-6">
            <h2 className="text-base font-medium">Hosting</h2>
            <p className="max-w-[65ch] text-[15px] leading-relaxed text-muted">
              The site is served by GitHub Pages. GitHub may collect standard
              technical information, such as IP addresses and request logs,
              when serving pages. See{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                GitHub&apos;s privacy statement
              </a>
              .
            </p>
          </section>

          <section className="space-y-3 border-t border-line pt-6">
            <h2 className="text-base font-medium">Email</h2>
            <p className="max-w-[65ch] text-[15px] leading-relaxed text-muted">
              If you send an email to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {site.email}
              </a>
              , we receive your address and message. We use them to reply and
              to keep the conversation. We do not add you to a mailing list.
            </p>
          </section>

          <section className="space-y-3 border-t border-line pt-6">
            <h2 className="text-base font-medium">Questions</h2>
            <p className="max-w-[65ch] text-[15px] leading-relaxed text-muted">
              Write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {site.email}
              </a>
              .
            </p>
          </section>

          <p>
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
