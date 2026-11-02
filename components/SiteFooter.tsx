import Link from "next/link";

import { site } from "@/lib/site";

import { Wordmark } from "./Wordmark";

const footerNavigation = [
  { href: "/#work", label: "What we do" },
  { href: "/#approach", label: "How we work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-muted">
              An independent software studio. Focused web products, built with
              care.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Sections
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Contact
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-lg tracking-[-0.01em] underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm text-muted">
              For new projects and questions.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SevenTiming. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy/"
              className="transition-colors hover:text-ink"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
