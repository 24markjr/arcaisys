"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MotionRoot } from "@/components/motion/motion-root";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <Container className="py-24 md:py-36">
        <Eyebrow index="500">Error</Eyebrow>
        <h1 className="mt-8 max-w-[18ch] text-h1 font-semibold">Something went wrong on this page.</h1>
        <p className="mt-6 max-w-[44ch] text-lead text-ink-soft">
          This was a problem on our side, not something you did. Try again, or go back to the home page.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-12 items-center gap-3 rounded-[3px] bg-ink px-6 text-small font-semibold text-ink-inverse transition-colors hover:bg-ink-navy"
          >
            Try again
            <RotateCw aria-hidden className="size-4" strokeWidth={1.75} />
          </button>
          <Link href="/" className="group inline-flex items-center gap-2 text-small font-semibold">
            <span className="link-underline pb-0.5">Back to home</span>
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
        {error.digest ? (
          <p className="mt-12 font-mono text-label text-ink-muted">Reference: {error.digest}</p>
        ) : null}
      </Container>
      <MotionRoot />
    </section>
  );
}
