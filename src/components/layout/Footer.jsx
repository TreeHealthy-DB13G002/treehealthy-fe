import logoApp from "@/assets/icons/treehealthy-logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-100 px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img alt="TreeHealthy Logo" src={logoApp} className="h-8 w-auto object-contain" />
            <span className="font-extrabold text-lg text-brand-secondary tracking-tight">
              TreeHealthy <span className="text-brand-primary text-xs font-bold">- AI Health Planner</span>
            </span>
          </div>
          <p className="text-xs leading-5 text-brand-text font-medium opacity-80">
            Platform asisten digital preventif Penyakit Tidak Menular (PTM) melalui personalisasi program CERDIK Kemenkes RI yang didukung oleh teknologi Machine Learning dan Generative AI.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">ID Data Source: Kemenkes RI</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-secondary tracking-wider uppercase">Sitemap</h3>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <a href="#about" className="text-brand-text hover:text-brand-primary transition-colors">
                About Platform
              </a>
            </li>
            <li>
              <a href="#features" className="text-brand-text hover:text-brand-primary transition-colors">
                Core Features
              </a>
            </li>
            <li>
              <a href="#how" className="text-brand-text hover:text-brand-primary transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#faq" className="text-brand-text hover:text-brand-primary transition-colors">
                FAQ & Support
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-secondary tracking-wider uppercase">
            Capstone Team <span className="text-brand-primary">DB13-G002</span>
          </h3>
          <div className="grid grid-cols-2 gap-2.5 text-2xs leading-relaxed font-medium text-brand-text">
            <div>
              <p className="font-bold text-brand-secondary">Dewa Eka G. B.</p>
              <p className="opacity-75">Full-stack Web</p>
            </div>
            <div>
              <p className="font-bold text-brand-secondary">Dzikri Ibrahim W.</p>
              <p className="opacity-75">Full-stack Web</p>
            </div>
            <div>
              <p className="font-bold text-brand-secondary">Rif’at Fazle M.</p>
              <p className="opacity-75">Generative AI</p>
            </div>
            <div>
              <p className="font-bold text-brand-secondary">Sofiyah Muchsin</p>
              <p className="opacity-75">Generative AI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-2xs font-semibold text-brand-text opacity-75">
        <p>© 2026 TreeHealthy. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Dicoding Bootcamp • Product Capstone Project Batch 13</p>
      </div>
    </footer>
  );
}
