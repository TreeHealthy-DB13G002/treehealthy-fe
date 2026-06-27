import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentCard from "../components/AssessmentCard";

const AssessmentResult = () => {
  const navigate = useNavigate();

  const targetPrediction = 34;
  const riskLevel = "Moderate Risk";

  const circumference = 2 * Math.PI * 54;

  const [prediction, setPrediction] = useState(0);

  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const hasAnimated = useRef(false);

  const factors = [
    {
      label: "Stress Level",
      value: 87,
      color: "bg-red-500",
    },
    {
      label: "Physical Activity",
      value: 58,
      color: "bg-amber-500",
    },
    {
      label: "Nutritional Habits",
      value: 32,
      color: "bg-brand-primary",
    },
  ];

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
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] border border-gray-100 p-6 flex flex-col">
            <h3 className="font-bold text-sm uppercase tracking-wider text-brand-secondary text-center mb-6">Health Assessment Result</h3>

            <div className="flex justify-center mb-6 relative">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
                  <circle cx="72" cy="72" r="54" className="stroke-gray-100" strokeWidth="10" fill="transparent" />

                  <circle
                    cx="72"
                    cy="72"
                    r="54"
                    className="stroke-orange-500 transition-all ease-out"
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

                <span className="text-3xl font-black text-orange-500 tracking-tight select-none z-10">{prediction}%</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-xl border border-orange-100/50">{riskLevel}</span>
            </div>

            <div className="space-y-4">
              {factors.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold text-brand-secondary mb-1.5">
                    <span className="opacity-80">{item.label}</span>
                    <span>{item.value}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] border border-gray-100 p-6 flex flex-col h-[430px]">
            <h3 className="font-bold text-sm uppercase tracking-wider text-brand-secondary mb-4 flex-shrink-0">AI Health Explanation</h3>

            <div className="flex-1 overflow-y-auto pr-2 text-sm leading-relaxed text-brand-text font-medium space-y-4">
              <p>Based on the information you provided, your current health assessment indicates a moderate risk level. The model predicts that several lifestyle factors contribute significantly to your overall health condition.</p>
              <p>
                The strongest contributing factor is your stress level, which appears considerably higher than recommended. Chronic stress may increase the likelihood of various health issues, including cardiovascular disease, poor sleep
                quality, and decreased immune function.
              </p>
              <p>Physical activity is within an acceptable range but could be improved through regular moderate exercise such as brisk walking, cycling, or swimming for at least 150 minutes per week.</p>
              <p>Your nutritional habits indicate room for improvement. Increasing fruit and vegetable intake while reducing processed foods and sugary beverages may positively impact your overall prediction score.</p>
              <p className="pb-2">Overall, adopting healthier daily habits and maintaining consistency can significantly reduce your predicted risk over time. You may now generate a personalized action plan tailored to these findings.</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold h-12 rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center"
          >
            Buatkan Program Sehat
          </button>
        </div>
      </div>
    </AssessmentCard>
  );
};

export default AssessmentResult;
