import { useState, useEffect } from "react";
import { toast } from "sonner";

import AssessmentLayout from "./AssessmentLayout";
import PersonalProfile from "./steps/PersonalProfile";
import HealthSurvey from "./steps/HealthSurvey";
import AssessmentResult from "./steps/AssessmentResult";

import { assessmentService } from "@/services/assessmentServices";

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 State baru untuk menampung hasil analisis real dari BE
  const [analysisResult, setAnalysisResult] = useState(null);

  const [formData, setFormData] = useState({
    profile: {},
    answers: {}, // Menyimpan { [questionId]: optionId }
  });

  // Ambil data pertanyaan dari server sejak komponen dimuat
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await assessmentService.getQuestions();
        const quizData = response.data?.data || response.data || [];
        if (Array.isArray(quizData)) {
          setQuestions(quizData);
        } else {
          toast.error("Format data kuis dari server tidak valid.");
        }
      } catch (error) {
        toast.error("Gagal memuat pertanyaan kuis dari server.");
      }
    };
    fetchQuestions();
  }, []);

  const handleContinueSurvey = async (profileData) => {
    setIsLoading(true);
    const payload = {
      age: Number(profileData.age),
      gender: profileData.gender === "male" ? 1 : 0,
      height: Number(profileData.height),
      weight: Number(profileData.weight),
      activity_level: profileData.activity,
      family_history: profileData.familyHistory,
    };

    toast.promise(assessmentService.saveProfile(payload), {
      loading: "Menyimpan data profil medis dasar...",
      success: () => {
        setIsLoading(false);
        setFormData((prev) => ({ ...prev, profile: profileData }));
        setStep(2);
        setQuestionIndex(0);
        return "Profil medis berhasil diverifikasi!";
      },
      error: (err) => {
        setIsLoading(false);
        return err.response?.data?.message || "Gagal menyimpan data profil medis.";
      },
    });
  };

  // 🚀 LOGIC KETIKA USER MEMILIH OPSI & KLIK BERIKUTNYA / SUBMIT
  const handleNextQuestion = async (questionId, selectedOptionId) => {
    // Cari data bobot (score_weight) dari opsi yang dipilih user
    const currentQuestionObj = questions.find((q) => q.id === questionId);
    const selectedOptionObj = currentQuestionObj?.options?.find((opt) => opt.id === selectedOptionId);
    const scoreWeight = selectedOptionObj ? selectedOptionObj.score_weight : 0;

    // Simpan ke state lokal dengan format objek detail
    const updatedAnswers = {
      ...formData.answers,
      [questionId]: { question_id: questionId, score_weight: scoreWeight, option_id: selectedOptionId },
    };

    setFormData((prev) => ({
      ...prev,
      answers: updatedAnswers,
    }));

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // 🚨 MINGGU KUIS TERAKHIR SELESAI -> SAATNYA SUBMIT KE BE!
      setIsLoading(true);

      // 🔥 FORMAT REQ BODY (Sesuai Gambar 1 Swagger): { answers: [ { question_id, score_weight }, ... ] }
      const submitPayload = {
        answers: Object.values(updatedAnswers).map((item) => ({
          question_id: Number(item.question_id),
          score_weight: Number(item.score_weight),
        })),
      };

      toast.promise(assessmentService.submitAnswers(submitPayload), {
        loading: "Menganalisis indikator kesehatan Anda dengan AI...",
        success: (res) => {
          setIsLoading(false);
          const responseData = res.data?.data || res.data;

          // Simpan hasil kalkulasi dari BE ke state
          setAnalysisResult(responseData);

          // Pindah ke step 3 (Halaman hasil)
          setStep(3);
          return "Analisis kesehatan berhasil dibuat!";
        },
        error: (err) => {
          setIsLoading(false);
          return err.response?.data?.message || "Gagal memproses analisis kuesioner.";
        },
      });
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
        // Ambil ID Opsi tersimpan untuk di-passing ke komponen survey agar UI tetap terpilih jika back-next
        const savedOptionId = formData.answers[questions[questionIndex]?.id]?.option_id || "";
        return (
          <HealthSurvey
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            currentQuestion={questions[questionIndex]}
            onNext={handleNextQuestion}
            onBack={handleBackQuestion}
            savedAnswers={{ [questions[questionIndex]?.id]: savedOptionId }}
          />
        );
      case 3:
        // 🚀 PASSING DATA REAL BE KE STEP RESULT
        return <AssessmentResult apiData={analysisResult} />;
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
