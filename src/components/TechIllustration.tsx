export default function TechIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto text-[#4779C7] animate-subtle-float">
      {/* Grid lines */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2A3648" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grid)" />

      {/* Nodes */}
      <circle cx="100" cy="150" r="4" fill="currentColor" className="animate-node-pulse" />
      <circle cx="300" cy="150" r="4" fill="currentColor" className="animate-node-pulse" />
      <circle cx="200" cy="80" r="4" fill="currentColor" className="animate-node-pulse" />
      <circle cx="200" cy="220" r="4" fill="currentColor" className="animate-node-pulse" />

      {/* Connections */}
      <line x1="100" y1="150" x2="200" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="200" y1="80" x2="300" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="300" y1="150" x2="200" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="200" y1="220" x2="100" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      
      {/* Data pulses */}
      <circle cx="100" cy="150" r="2" fill="white" className="animate-data-flow" />
    </svg>
  );
}
