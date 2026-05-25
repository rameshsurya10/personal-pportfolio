import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const base =
  "inline-flex items-center gap-2 text-sm font-medium text-ink transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:opacity-50";
const styles = {
  primary: "border-b border-ink pb-1",
  secondary: "border-b border-border pb-1 text-ink-muted hover:text-ink",
};

export function Button({
  children, href, variant = "primary", type = "button",
  download, external, onClick, disabled, className = "",
}: ButtonProps) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    if (external || download) {
      return (
        <a
          href={href}
          className={cls}
          {...(download ? { download: true } : {})}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
          <span aria-hidden="true">→</span>
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
        <span aria-hidden="true">→</span>
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}
