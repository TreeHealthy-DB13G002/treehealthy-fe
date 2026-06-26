import { useEffect, useState } from "react";

import ProgressText from "../components/ProgressText";
import QuestionCard from "../components/QuestionCard";
import QuestionOptions from "../components/QuestionsOptions";
import NavigationButtons from "../components/NavigationButtons";

const HealthSurvey = ({ questionIndex, totalQuestions, currentQuestion, onNext, onBack, savedAnswers }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (currentQuestion) {
      setSelected(savedAnswers?.[currentQuestion.id] || "");
    }
  }, [questionIndex, currentQuestion, savedAnswers]);

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;

    onNext(currentQuestion.id, selected);
  };

  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      <ProgressText current={questionIndex + 1} total={totalQuestions} />

      <QuestionCard title={currentQuestion.title} description={currentQuestion.description}>
        <div className="flex flex-col h-full justify-between space-y-6">
          <div className="flex-1">
            <QuestionOptions options={currentQuestion.options} value={selected} onChange={handleSelect} />
          </div>

          <NavigationButtons step={questionIndex === totalQuestions - 1 ? 3 : 2} totalSteps={3} onNext={handleNext} onBack={onBack} isNextDisabled={!selected} />
        </div>
      </QuestionCard>
    </div>
  );
};

export default HealthSurvey;
