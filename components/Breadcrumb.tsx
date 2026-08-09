import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm font-mono tracking-wide text-khaki">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="opacity-50">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-brass transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-forest">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
