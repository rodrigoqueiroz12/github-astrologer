import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-4 max-w-max-width mx-auto left-0 right-0 bg-background/60 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        <span
          className="material-symbols-outlined text-primary text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <Link
          to="/"
          className="font-headline-md text-headline-md text-primary tracking-tight"
        >
          Astrologia de Commits GitHub
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <span className="text-primary font-bold border-b-2 border-primary pb-1">
          Mapas Astrais
        </span>
        <span className="text-on-surface-variant font-medium">
          Constelações
        </span>
        <span className="text-on-surface-variant font-medium">Zodíaco</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary cursor-pointer">
          settings
        </span>
        <span className="material-symbols-outlined text-primary cursor-pointer">
          auto_awesome
        </span>
      </div>
    </nav>
  );
}
