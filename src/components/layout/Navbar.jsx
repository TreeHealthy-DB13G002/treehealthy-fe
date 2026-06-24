import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import logoApp from "../../assets/images/treehealthy-logo.png";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-4 max-w-7xl mx-auto">
      <nav aria-label="Global" className="flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-md bg-white/40 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-all">
        <div className="flex lg:flex-1 items-center gap-2">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">TreeHealthy</span>
            <img alt="TreeHealthy-logo" src={logoApp} className="h-8 w-auto" />
            <span className="font-bold text-lg text-brand-secondary tracking-tight">
              Tree<span className="text-brand-primary">Healthy</span>
            </span>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-secondary hover:text-brand-primary transition-colors">
            <span className="sr-only">Open main menu</span>
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors">
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/90 p-6 sm:max-w-sm sm:ring-1 sm:ring-black/5 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">TreeHealthy</span>
              <img alt="TreeHealthy-logo" src={logoApp} className="h-8 w-auto" />
              <span className="font-bold text-lg text-brand-secondary">TreeHealthy</span>
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-brand-secondary hover:text-brand-primary transition-colors">
              <span className="sr-only">Close menu</span>
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-100">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-brand-secondary hover:bg-brand-bg hover:text-brand-primary transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold text-brand-primary hover:bg-brand-bg transition-all">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
