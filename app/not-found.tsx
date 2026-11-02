import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 md:py-36 lg:px-12"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        404
      </p>
      <h1 className="mt-6 text-5xl font-medium tracking-[-0.05em] md:text-7xl">
        Page not found.
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
        The page you are looking for does not exist, or it has moved.
      </p>
      <Link href="/" className="btn-primary mt-10">
        Back to home
      </Link>
    </main>
  );
}
