import { ArrowRight } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="relative isolate px-6 h-screen w-full flex items-center justify-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40">
        <div
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#4ade80]/30 to-[#38bdf8]/40 opacity-40 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-3xl w-full">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-4 py-1 text-sm/6 text-brand-text ring-1 ring-brand-primary/20 bg-white/50 backdrop-blur-xs hover:ring-brand-primary/40 transition-all">
            ✨ Introducing Intelligent Health Tracking.{" "}
            <a href="#features" className="font-semibold text-brand-primary ms-1 inline-flex items-center gap-0.5">
              <span aria-hidden="true" className="absolute inset-0" />
              Learn more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-balance text-brand-secondary sm:text-7xl leading-tight">
            Your Health, <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-brand-primary to-emerald-600 bg-clip-text text-transparent">Intelligently Guided.</span>
          </h1>

          <p className="mt-6 text-base font-medium text-pretty text-brand-text sm:text-lg/8 max-w-2xl mx-auto-balance">
            Understand your health profile through supportive AI explanations. Say goodbye to medical anxiety, follow your tailored daily checklist, and watch your wellness thrive.
          </p>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-secondary transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-all duration-200"
            >
              Get started
              <ArrowRight size={16} />
            </a>
            <a href="#how" className="text-sm/6 font-semibold text-brand-secondary hover:text-brand-primary transition-colors duration-200">
              How it works <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#4ade80]/20 to-[#38bdf8]/30 opacity-40 sm:left-[calc(50%+20rem)] sm:w-288.75"
        />
      </div>
    </div>
  );
}
