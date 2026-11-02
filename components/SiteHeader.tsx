import Link from "next/link";

import { site } from "@/lib/site";

import { Wordmark } from "./Wordmark";

const navigation = [
  { href: "/#work", label: "What we do" },
  { href: "/#approach", label: "How we work" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.projectMailto}
          className="inline-flex items-center justify-center bg-ink px-4 py-2.5 text-[12px] font-medium tracking-[0.02em] text-paper transition-colors hover:bg-accent active:translate-y-px"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
