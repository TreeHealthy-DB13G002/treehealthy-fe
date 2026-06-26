import { Button } from "@/components/ui/button";

const NavigationButtons = ({ step, totalSteps, onNext, onBack, isNextDisabled }) => {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={step === 1}
        className="h-11 px-6 rounded-xl border-gray-200 text-brand-secondary font-bold hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Kembali
      </Button>

      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        opsi
        className="h-11 px-6 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-bold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {step === totalSteps ? "Analisis Kesehatan Saya" : "Berikutnya"}
      </Button>
    </div>
  );
};

export default NavigationButtons;
