import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { assessmentService } from "@/services/assessmentServices";

export const useAssessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [formData, setFormData] = useState({
    profile: {},
    answers: {},
  });

  // Fetch daftar pertanyaan kuis saat komponen di-mount
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

  // Step 1: Submit Profile Medis
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

  // Step 2: Next Question & Submit Answers
  const handleNextQuestion = async (questionId, selectedOptionId) => {
    const currentQuestionObj = questions.find((q) => q.id === questionId);
    const selectedOptionObj = currentQuestionObj?.options?.find((opt) => opt.id === selectedOptionId);
    const scoreWeight = selectedOptionObj ? selectedOptionObj.score_weight : 0;

    const updatedAnswers = {
      ...formData.answers,
      [questionId]: {
        question_id: questionId,
        score_weight: scoreWeight,
        option_id: selectedOptionId,
      },
    };

    setFormData((prev) => ({
      ...prev,
      answers: updatedAnswers,
    }));

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsLoading(true);

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
          setAnalysisResult(responseData);
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

  // Step 2: Back Question
  const handleBackQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      setStep(1);
    }
  };

  // Step 3: Generate Health Plan AI
  const handleGeneratePlan = async () => {
    setIsGenerating(true);

    toast.promise(assessmentService.generatePlan(), {
      loading: "Memproses & merancang program sehat 7 hari Anda...",
      success: () => {
        setIsGenerating(false);
        navigate("/dashboard");
        return "Program Sehat 7 Hari Berhasil Diaktifkan! 🎉";
      },
      error: (err) => {
        setIsGenerating(false);
        return err.response?.data?.message || "Gagal mengaktifkan program sehat.";
      },
    });
  };

  return {
    step,
    questionIndex,
    questions,
    isLoading,
    isGenerating,
    formData,
    analysisResult,
    handleContinueSurvey,
    handleNextQuestion,
    handleBackQuestion,
    handleGeneratePlan,
  };
};
