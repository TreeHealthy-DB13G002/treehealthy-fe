import { useState } from "react";

import AssessmentLayout from "./AssessmentLayout";

import PersonalProfile from "./steps/PersonalProfile";
import HealthSurvey from "./steps/HealthSurvey";
import AssessmentResult from "./steps/AssessmentResult";

import { questions } from "./data/questions";

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [formData, setFormData] = useState({
    profile: {},
    answers: {},
  });

  const handleContinueSurvey = (profileData) => {
    setFormData((prev) => ({ ...prev, profile: profileData }));
    setStep(2);
    setQuestionIndex(0);
  };

  const handleNextQuestion = (questionId, selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: selectedValue },
    }));

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setStep(3);
    }
  };

  const handleBackQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      setStep(1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalProfile onContinue={handleContinueSurvey} savedData={formData.profile} />;

      case 2:
        return <HealthSurvey questionIndex={questionIndex} totalQuestions={questions.length} currentQuestion={questions[questionIndex]} onNext={handleNextQuestion} onBack={handleBackQuestion} savedAnswers={formData.answers} />;

      case 3:
        return <AssessmentResult formData={formData} />;

      default:
        return null;
    }
  };

  return (
    <AssessmentLayout step={step} totalSteps={3}>
      {renderStep()}
    </AssessmentLayout>
  );
};

export default Assessment;
