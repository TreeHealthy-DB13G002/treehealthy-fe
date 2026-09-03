import AssessmentLayout from "./AssessmentLayout";
import PersonalProfile from "./steps/PersonalProfile";
import HealthSurvey from "./steps/HealthSurvey";
import AssessmentResult from "./steps/AssessmentResult";
import { useAssessment } from "@/hooks/useAssessment";

const Assessment = () => {
  const { step, questionIndex, questions, formData, analysisResult, isGenerating, handleContinueSurvey, handleNextQuestion, handleBackQuestion, handleGeneratePlan } = useAssessment();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalProfile onContinue={handleContinueSurvey} savedData={formData.profile} />;
      case 2:
        const currentQ = questions[questionIndex];
        const savedOptionId = formData.answers[currentQ?.id]?.option_id || "";
        return <HealthSurvey questionIndex={questionIndex} totalQuestions={questions.length} currentQuestion={currentQ} onNext={handleNextQuestion} onBack={handleBackQuestion} savedAnswers={{ [currentQ?.id]: savedOptionId }} />;
      case 3:
        return <AssessmentResult apiData={analysisResult} onGeneratePlan={handleGeneratePlan} isGenerating={isGenerating} />;
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
