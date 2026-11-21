import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../hooks/useLanguage';

type PageStubProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** Temporary page shell used until each section is built in a later phase. */
export default function PageStub({ title, subtitle, children }: PageStubProps) {
  const { lang } = useLanguage();
  return (
    <section className="landing pending-page">
      <nav className="landing-micro" aria-label={lang === 'es' ? 'Ubicación' : 'Breadcrumb'}><Link to="/">TECH ACADEMY</Link><span aria-hidden="true"> / </span><span>{title}</span></nav>
      <div className="pending-heading"><h1>{title}</h1><span aria-hidden="true">↗</span></div>
      {subtitle && <p className="pending-description">{subtitle}</p>}
      <div className="pending-status">{children}</div>
      <Link to="/learn" className="landing-button">{lang === 'es' ? 'Explorar los módulos' : 'Explore the modules'}<span aria-hidden="true">↗</span></Link>
    </section>
  );
}
