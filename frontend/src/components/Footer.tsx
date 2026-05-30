export function Footer() {
  return (
    <footer className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest border-t border-white/5">
      <div className="flex items-center gap-4">
        <span className="font-headline-md text-headline-md text-primary">
          GCA
        </span>
        <span className="font-label-md text-label-md text-outline">
          Desenvolvido por Try/Catchers
        </span>
      </div>
      <div className="text-outline font-label-md text-label-md">
        © 2026 Celestial Code Registry
      </div>
    </footer>
  );
}
