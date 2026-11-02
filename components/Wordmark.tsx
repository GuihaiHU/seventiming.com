import Link from "next/link";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid size-5 place-items-center bg-ink font-mono text-[11px] font-semibold leading-none text-paper transition-colors group-hover:bg-accent"
      >
        7
      </span>
      <span className="text-[15px] font-medium tracking-[-0.02em]">
        SevenTiming
      </span>
    </Link>
  );
}
