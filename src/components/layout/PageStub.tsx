import type { ReactNode } from 'react';

type PageStubProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** Temporary page shell used until each section is built in a later phase. */
export default function PageStub({ title, subtitle, children }: PageStubProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">{title}</h1>
      {subtitle && <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">{subtitle}</p>}
      {children}
    </section>
  );
}
