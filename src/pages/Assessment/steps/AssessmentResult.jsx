import { useEffect, useState, useRef } from "react";
import { FiLoader } from "react-icons/fi";
import AssessmentCard from "../components/AssessmentCard";

const AssessmentResult = ({ apiData, onGeneratePlan, isGenerating }) => {
  const targetPrediction = apiData?.final_risk_score || 0;
  const circumference = 2 * Math.PI * 54;

  const [prediction, setPrediction] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const hasAnimated = useRef(false);

  const healthCategories = [
    { key: "physical", label: "Physical Health", score: apiData?.physical_health_score || 0 },
    { key: "lifestyle", label: "Lifestyle habits", score: apiData?.lifestyle_score || 0 },
    { key: "mental", label: "Mental Health", score: apiData?.mental_score || 0 },
  ];

  const getRiskDetails = (score) => {
    if (score > 60) {
      return {
        text: "Risiko Tinggi",
        textColor: "text-red-500",
        strokeColor: "stroke-red-500",
        badgeBg: "bg-red-50",
        badgeText: "text-red-600",
        badgeBorder: "border-red-100/50",
      };
    } else if (score >= 30) {
      return {
        text: "Risiko Sedang",
        textColor: "text-orange-500",
        strokeColor: "stroke-orange-500",
        badgeBg: "bg-orange-50",
        badgeText: "text-orange-600",
        badgeBorder: "border-orange-100/50",
      };
    } else {
      return {
        text: "Risiko Rendah",
        textColor: "text-brand-primary",
        strokeColor: "stroke-brand-primary",
        badgeBg: "bg-blue-50",
        badgeText: "text-brand-primary",
        badgeBorder: "border-blue-100/50",
      };
    }
  };

  const risk = getRiskDetails(prediction);

  const getCategoryColor = (score) => {
    if (score > 60) return "bg-red-500";
    if (score >= 30) return "bg-amber-500";
    return "bg-brand-primary";
  };

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let startTimestamp = null;
    const duration = 1500;

    const stepAnimation = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      if (progress < 1) {
        setPrediction(Math.floor(Math.random() * 100));
        requestAnimationFrame(stepAnimation);
      } else {
        setPrediction(targetPrediction);
      }
    };

    requestAnimationFrame(stepAnimation);

    const timer = setTimeout(() => {
      const targetOffset = circumference - (targetPrediction / 100) * circumference;
      setStrokeDashoffset(targetOffset);
    }, 150);

    return () => clearTimeout(timer);
  }, [targetPrediction, circumference]);

  return (
    <AssessmentCard>
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
            <h3 className="font-bold text-sm uppercase tracking-wider text-brand-secondary text-center mb-6">Health Assessment Result</h3>

            <div className="flex justify-center mb-6 relative">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
                  <circle cx="72" cy="72" r="54" className="stroke-gray-100" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="72"
                    cy="72"
                    r="54"
                    className={`${risk.strokeColor} transition-all ease-out`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: strokeDashoffset,
                      transitionDuration: "1500ms",
                    }}
                  />
                </svg>
                <span className={`text-3xl font-black ${risk.textColor} tracking-tight select-none z-10`}>{prediction}%</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <span className={`inline-block ${risk.badgeBg} ${risk.badgeText} text-xs font-bold px-4 py-1.5 rounded-xl border ${risk.badgeBorder}`}>{risk.text}</span>
            </div>

            <div className="space-y-4">
              {healthCategories.map((item) => (
                <div key={item.key}>
                  <div className="flex justify-between text-xs font-bold text-brand-secondary mb-1.5">
                    <span className="opacity-80">{item.label}</span>
                    <span>{item.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`${getCategoryColor(item.score)} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-[430px]">
            <h3 className="font-bold text-sm uppercase tracking-wider text-brand-secondary mb-4 flex-shrink-0">AI Health Explanation</h3>
            <div className="flex-1 overflow-y-auto pr-2 text-sm leading-relaxed text-brand-text font-medium whitespace-pre-line space-y-4">
              <p>{apiData?.ai_explainer_text || "AI sedang menyusun penjelasan medis untuk Anda..."}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onGeneratePlan}
            disabled={isGenerating}
            className="w-full bg-brand-primary text-white font-bold h-12 rounded-xl cursor-pointer hover:bg-brand-secondary transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {isGenerating ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                <span>Menyiapkan Program Sehat...</span>
              </>
            ) : (
              <span>Buatkan Program Sehat</span>
            )}
          </button>
        </div>
      </div>
    </AssessmentCard>
  );
};

export default AssessmentResult;
