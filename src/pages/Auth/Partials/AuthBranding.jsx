import logoApp from "@/assets/icons/treehealthy-logo.png";
import bgImage from "@/assets/images/auth-bg.png";

const AuthBranding = () => {
  return (
    <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 text-brand-secondary pt-28">
      <img src={bgImage} alt="Health Planning & Wellness Concept" className="absolute inset-0 w-full h-full object-cover" />

      {/* ⬜ OVERLAY */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-xs" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-11">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xs border border-gray-100">
            <img src={logoApp} alt="TreeHealthy Logo" className="h-7 w-auto object-contain" />
          </div>

          <div>
            <h2 className="font-extrabold text-base text-brand-secondary tracking-tight">TreeHealthy</h2>
            <p className="text-xs font-semibold text-brand-primary tracking-wider">AI Health Planner</p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="h-1.5 w-44 rounded-full bg-brand-primary" />

          <h1 className="max-w-2xl text-6xl font-black tracking-tight text-brand-secondary leading-tight">
            Your Health,
            <br />
            <span className="text-brand-primary">Intelligently Guided.</span>
          </h1>

          <p className="max-w-lg text-sm font-semibold text-brand-secondary leading-relaxed tracking-wide drop-shadow-2xs">
            Understand your health profile through supportive AI explanations. Say goodbye to medical anxiety, follow your tailored daily checklist, and watch your wellness thrive.
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-4 w-full">
        <div className="bg-white/60 border border-white/60 p-4 rounded-2xl backdrop-blur-md shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-lg font-black text-brand-primary tracking-tight">95%</p>
            <p className="text-sm font-semibold text-brand-secondary/80 uppercase tracking-wider">Junk Food</p>
          </div>
          <p className="text-xs text-brand-text font-medium leading-normal mt-2 opacity-90">Remaja aktif mengonsumsi makanan siap saji harian.</p>
        </div>

        <div className="bg-white/60 border border-white/60 p-4 rounded-2xl backdrop-blur-md shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-lg font-black text-brand-secondary tracking-tight">37.4%</p>
            <p className="text-sm font-semibold text-brand-secondary/80 uppercase tracking-wider">Kurang Gerak</p>
          </div>
          <p className="text-xs text-brand-text font-medium leading-normal mt-2 opacity-90">Masyarakat kekurangan aktivitas fisik berkala.</p>
        </div>

        <div className="bg-white/60 border border-white/60 p-4 rounded-2xl backdrop-blur-md shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-lg font-black text-brand-primary tracking-tight">&lt; 6 Jam</p>
            <p className="text-sm font-semibold text-brand-secondary/80 uppercase tracking-wider">Kurang Tidur</p>
          </div>
          <p className="text-xs text-brand-text font-medium leading-normal mt-2 opacity-90">Durasi istirahat pemicu utama stres & turun imun.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthBranding;
