"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/types";
import { isActivePath } from "@/lib/site";
import { cn } from "@/lib/cn";

type NavLinksProps = {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

/** Nav links with active-page state. Needs a Suspense boundary (usePathname). */
export function NavLinks({ items, className, linkClassName, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <NavList
      items={items}
      pathname={pathname}
      className={className}
      linkClassName={linkClassName}
      onNavigate={onNavigate}
    />
  );
}

/** Static fallback rendered while the pathname is unknown during prerendering. */
export function NavList({
  items,
  pathname,
  className,
  linkClassName,
  onNavigate,
}: NavLinksProps & { pathname?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => {
        const active = pathname ? isActivePath(pathname, item.href) : false;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn("link-underline pb-0.5", linkClassName)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
