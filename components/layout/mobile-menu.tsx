"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/content/types";
import { ButtonLink } from "@/components/ui/button";
import { NavLinks, NavList } from "./nav-links";

type MobileMenuProps = {
  items: NavItem[];
  cta: NavItem;
};

/**
 * Full-screen mobile navigation built on the native <dialog> element, which
 * provides the focus trap, Escape-to-close and inert background for free.
 */
export function MobileMenu({ items, cta }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = useCallback(() => dialogRef.current?.close(), []);

  // Lock page scroll while open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="-mr-2 inline-flex size-11 items-center justify-center md:hidden"
      >
        <Menu aria-hidden className="size-5" strokeWidth={1.75} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site menu"
        className="menu-panel m-0 h-dvh max-h-none w-full max-w-none bg-surface p-0 text-ink backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="flex h-(--header-h) items-center justify-end px-(--gutter)">
          <button
            type="button"
            onClick={close}
            className="-mr-2 inline-flex size-11 items-center justify-center"
            autoFocus
          >
            <X aria-hidden className="size-5" strokeWidth={1.75} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-1 flex-col justify-between px-(--gutter) pt-8 pb-10">
          <Suspense
            fallback={<NavList items={items} className="space-y-2" linkClassName="text-h2 font-semibold" />}
          >
            <NavLinks
              items={items}
              onNavigate={close}
              className="space-y-2"
              linkClassName="text-h2 font-semibold"
            />
          </Suspense>
          <CloseOnRouteChange onChange={close} />
          <ButtonLink href={cta.href} onClick={close} className="w-full justify-between">
            {cta.label}
          </ButtonLink>
        </nav>
      </dialog>
    </>
  );
}

/** Closes the menu if navigation happens by any other means (e.g. browser back). */
function CloseOnRouteChange({ onChange }: { onChange: () => void }) {
  return (
    <Suspense fallback={null}>
      <PathWatcher onChange={onChange} />
    </Suspense>
  );
}

function PathWatcher({ onChange }: { onChange: () => void }) {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onChange();
  }, [pathname, onChange]);
  return null;
}
