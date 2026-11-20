"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, FilesIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";

const links = [
  { href: "/admin", label: "Site content", icon: PencilSimpleLineIcon },
  { href: "/admin/notifications", label: "Notifications", icon: BellIcon },
  { href: "/admin/office", label: "Office desk", icon: FilesIcon },
];

export function PanelNav() {
  const path = usePathname();
  return (
    <nav className="admin-main-nav" aria-label="Admin">
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} aria-current={path === href || (href === "/admin/office" && path.startsWith(href + "/")) ? "page" : undefined}>
          <Icon size={17} aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}
