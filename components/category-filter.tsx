"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";

const categories = [
  { label: "All", value: "" },
  { label: "Clothing", value: "clothing" },
  { label: "Accessories", value: "accessories" },
  { label: "Prints", value: "prints" },
];

export function CategoryFilter({ active }: { active?: string }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCategory, setOptimisticCategory] = useOptimistic(
    active ?? ""
  );

  return (
    <div className="flex items-center gap-1 overflow-x-auto" data-pending={isPending ? "" : undefined}>
      {categories.map((cat) => {
        const isActive = cat.value === optimisticCategory;
        return (
          <Link
            key={cat.value}
            href={cat.value ? `/?category=${cat.value}` : "/"}
            onClick={() => {
              startTransition(() => {
                setOptimisticCategory(cat.value);
              });
            }}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
