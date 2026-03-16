const shapes = [
  <g key="0">
    <circle cx="200" cy="140" r="60" fill="currentColor" opacity="0.08" />
    <rect x="140" y="100" width="50" height="50" rx="4" fill="currentColor" opacity="0.12" transform="rotate(15 165 125)" />
  </g>,
  <g key="1">
    <rect x="120" cy="100" width="80" height="80" rx="8" fill="currentColor" opacity="0.1" transform="rotate(45 160 140)" />
    <circle cx="220" cy="120" r="30" fill="currentColor" opacity="0.06" />
  </g>,
  <g key="2">
    <polygon points="200,80 250,170 150,170" fill="currentColor" opacity="0.1" />
    <circle cx="160" cy="130" r="20" fill="currentColor" opacity="0.06" />
  </g>,
  <g key="3">
    <rect x="150" y="100" width="100" height="60" rx="30" fill="currentColor" opacity="0.08" />
    <circle cx="180" cy="150" r="15" fill="currentColor" opacity="0.1" />
    <circle cx="220" cy="110" r="10" fill="currentColor" opacity="0.12" />
  </g>,
  <g key="4">
    <rect x="140" y="90" width="70" height="90" rx="4" fill="currentColor" opacity="0.08" />
    <rect x="190" y="110" width="50" height="50" rx="4" fill="currentColor" opacity="0.1" transform="rotate(-10 215 135)" />
  </g>,
  <g key="5">
    <circle cx="180" cy="130" r="50" fill="currentColor" opacity="0.06" />
    <polygon points="210,100 240,160 180,160" fill="currentColor" opacity="0.1" />
  </g>,
];

export function ProductImage({ index }: { index: number }) {
  return (
    <div className="aspect-4/3 bg-muted flex items-center justify-center">
      <svg
        viewBox="0 0 400 280"
        className="w-full h-full text-foreground"
        fill="none"
      >
        {shapes[index % shapes.length]}
      </svg>
    </div>
  );
}
