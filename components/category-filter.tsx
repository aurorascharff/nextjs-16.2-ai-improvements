"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { label: "All", value: "" },
  { label: "Clothing", value: "clothing" },
  { label: "Accessories", value: "accessories" },
  { label: "Prints", value: "prints" },
];

export function CategoryFilter({ active }: { active?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticCategory, setOptimisticCategory] = useOptimistic(
    active ?? ""
  );

  return (
    <div className="flex items-center gap-1" data-pending={isPending ? "" : undefined}>
      {categories.map((cat) => {
        const isActive = cat.value === optimisticCategory;
        return (
          <button
            key={cat.value}
            onClick={() => {
              startTransition(() => {
                setOptimisticCategory(cat.value);
                router.push(cat.value ? `/?category=${cat.value}` : "/");
              });
            }}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
