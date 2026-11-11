export default function ModuleArtwork({ kind }: { kind: 'cybersecurity' | 'history-ai' }) {
  if (kind === 'cybersecurity') {
    return (
      <svg viewBox="0 0 240 120" aria-hidden="true" className="h-28 w-full max-w-64 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M120 12 176 32v32c0 25-18 40-56 55-38-15-56-30-56-55V32z" className="fill-cyan-950/70" />
        <rect x="101" y="58" width="38" height="28" rx="5" />
        <path d="M109 58v-9a11 11 0 0 1 22 0v9M120 70v7" strokeLinecap="round" />
        <path d="M44 39H18m26 19H8m36 19H23m174-38h25m-25 19h35m-35 19h19" className="opacity-40" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" className="h-28 w-full max-w-64 text-purple-300" fill="none" stroke="currentColor" strokeWidth="3">
      <rect x="48" y="24" width="92" height="68" rx="7" className="fill-purple-950/70" />
      <path d="M61 44h38m-38 13h55M61 70h29m6 39h42m-21-17v17" strokeLinecap="round" />
      <circle cx="172" cy="39" r="8" /><circle cx="196" cy="61" r="8" /><circle cx="165" cy="85" r="8" />
      <path d="m178 45 12 11m-16 12-6 10m22-11-18 14M139 44h25" />
    </svg>
  );
}
