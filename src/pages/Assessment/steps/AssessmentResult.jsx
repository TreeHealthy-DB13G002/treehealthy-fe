import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentCard from "../components/AssessmentCard";
import { result } from "../data/result";

const AssessmentResult = () => {
  const navigate = useNavigate();
  const data = result;

  const targetPrediction = data.predictionScore;

  const circumference = 2 * Math.PI * 54;
  const [prediction, setPrediction] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const hasAnimated = useRef(false);

  const getRiskDetails = (score) => {
    if (score >= 70) {
      return {
        text: "Risiko Tinggi",
        textColor: "text-red-500",
        strokeColor: "stroke-red-500",
        badgeBg: "bg-red-50",
        badgeText: "text-red-600",
        badgeBorder: "border-red-100/50",
      };
    } else if (score >= 40) {
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
    if (score >= 70) return "bg-red-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-brand-primary";
  };

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let startTimestamp = null;
    const duration = 1500;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      if (progress < 1) {
        setPrediction(Math.floor(Math.random() * 100));
        requestAnimationFrame(step);
      } else {
        setPrediction(targetPrediction);
      }
    };

    requestAnimationFrame(step);

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
          {/* Sisi Kiri: Skor Utama & Bar */}
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
              {data.healthCategories.map((item) => (
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
            <div className="flex-1 overflow-y-auto pr-2 text-sm leading-relaxed text-brand-text font-medium space-y-4">
              {data.explanations.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={() => navigate("/dashboard")} className="w-full bg-brand-primary text-white font-bold h-12 rounded-xl">
            Buatkan Program Sehat
          </button>
        </div>
      </div>
    </AssessmentCard>
  );
};

export default AssessmentResult;
