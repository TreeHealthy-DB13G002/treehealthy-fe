import { useEffect, useState } from "react";

import ProgressText from "../components/ProgressText";
import QuestionCard from "../components/QuestionCard";
import QuestionOptions from "../components/QuestionsOptions";
import NavigationButtons from "../components/NavigationButtons";

const HealthSurvey = ({ questionIndex, totalQuestions, currentQuestion, onNext, onBack, savedAnswers }) => {
  // 🚀 Ubah default state awal menjadi null (karena ID dari Swagger bernilai Number)
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (currentQuestion) {
      // 🚀 Ambil jawaban lama jika ada, jika tidak ada set ke null
      const previousAnswer = savedAnswers?.[currentQuestion.id];
      setSelected(previousAnswer !== undefined ? previousAnswer : null);
    }
  }, [questionIndex, currentQuestion, savedAnswers]);

  const handleSelect = (value) => {
    // 🚀 Simpan nilai apa adanya (Number/String) tergantung apa yang dilempar oleh QuestionOptions
    setSelected(value);
  };

  const handleNext = () => {
    // 🚀 Cek validasi: pastikan selected tidak kosong (null/undefined/"")
    if (selected === null || selected === undefined || selected === "") return;

    // Kirim ID Pertanyaan dan ID Pilihan yang dipilih ke parent element
    onNext(currentQuestion.id, selected);
  };

  if (!currentQuestion) {
    return <div className="w-full h-48 bg-white rounded-2xl border border-slate-100 animate-pulse flex items-center justify-center text-xs font-semibold text-slate-400">Tunggu sebentar, kuisioner sedang disiapkan...</div>;
  }

  return (
    <div className="space-y-6">
      <ProgressText current={questionIndex + 1} total={totalQuestions} />

      <QuestionCard title={currentQuestion.question_text} hint={currentQuestion.category}>
        <div className="flex flex-col h-full justify-between space-y-6">
          <div className="flex-1">
            {/* 🚀 Properti options & value dipastikan mengalir lancar ke sub-komponen UI */}
            <QuestionOptions options={currentQuestion.options || []} value={selected} onChange={handleSelect} />
          </div>

          <NavigationButtons step={questionIndex === totalQuestions - 1 ? 3 : 2} totalSteps={3} onNext={handleNext} onBack={onBack} isNextDisabled={selected === null || selected === undefined || selected === ""} />
        </div>
      </QuestionCard>
    </div>
  );
};

export default HealthSurvey;
