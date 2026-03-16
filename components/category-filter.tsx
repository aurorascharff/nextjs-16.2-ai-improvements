const categories = [
  { label: "All", value: "" },
  { label: "Clothing", value: "clothing" },
  { label: "Accessories", value: "accessories" },
  { label: "Prints", value: "prints" },
];

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <div className="flex items-center gap-1">
      {categories.map((cat) => {
        const isActive = cat.value === (active ?? "");
        return (
          <a
            key={cat.value}
            href={cat.value ? `/?category=${cat.value}` : "/"}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </a>
        );
      })}
    </div>
  );
}
