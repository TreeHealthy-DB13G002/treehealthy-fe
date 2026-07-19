// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// import AssessmentLayout from "./AssessmentLayout";
// import PersonalProfile from "./steps/PersonalProfile";
// import HealthSurvey from "./steps/HealthSurvey";
// import AssessmentResult from "./steps/AssessmentResult";

// import { assessmentService } from "@/services/assessmentServices";

// const Assessment = () => {
//   const [step, setStep] = useState(1);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     profile: {},
//     answers: {},
//   });

//   // Ambil data pertanyaan dari server sejak komponen dimuat
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await assessmentService.getQuestions();
//         const quizData = response.data || response;
//         setQuestions(quizData);
//       } catch (error) {
//         toast.error("Gagal memuat pertanyaan kuis dari server.");
//         console.error(error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // 🚀 INTEGRASI STEP 1: MENYESUAIKAN PAYLOAD MENJADI SNAKE_CASE
//   const handleContinueSurvey = async (profileData) => {
//     setIsLoading(true);

//     // 🔥 SYNCRONIZED: Format payload diubah menjadi snake_case sesuai permintaan BE teranyar
//     const payload = {
//       age: Number(profileData.age),
//       gender: profileData.gender === "male" ? 1 : 0,
//       height: Number(profileData.height),
//       weight: Number(profileData.weight),
//       activity_level: profileData.activity, // 👈 Diubah dari activityLevel ke activity_level
//       family_history: profileData.familyHistory, // 👈 Diubah dari familyHistory ke family_history
//     };

//     // Eksekusi promise toast untuk penanda loading & respon sukses/gagal
//     toast.promise(assessmentService.saveProfile(payload), {
//       loading: "Menyimpan data profil medis dasar...",
//       success: () => {
//         setIsLoading(false);
//         // Simpan state lokal FE (tetap gunakan camelCase internal agar tidak merusak defaultValues form)
//         setFormData((prev) => ({ ...prev, profile: profileData }));
//         setStep(2);
//         setQuestionIndex(0);
//         return "Profil medis berhasil diverifikasi!";
//       },
//       error: (err) => {
//         setIsLoading(false);
//         return err.response?.data?.message || "Gagal menyimpan data profil medis.";
//       },
//     });
//   };

//   const handleNextQuestion = (questionId, selectedValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       answers: { ...prev.answers, [questionId]: selectedValue },
//     }));

//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex((prev) => prev + 1);
//     } else {
//       setStep(3);
//     }
//   };

//   const handleBackQuestion = () => {
//     if (questionIndex > 0) {
//       setQuestionIndex((prev) => prev - 1);
//     } else {
//       setStep(1);
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <PersonalProfile onContinue={handleContinueSurvey} savedData={formData.profile} />;

//       case 2:
//         return <HealthSurvey questionIndex={questionIndex} totalQuestions={questions.length} currentQuestion={questions[questionIndex]} onNext={handleNextQuestion} onBack={handleBackQuestion} savedAnswers={formData.answers} />;

//       case 3:
//         return <AssessmentResult formData={formData} />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <AssessmentLayout step={step} totalSteps={3}>
//       {renderStep()}
//     </AssessmentLayout>
//   );
// };

// export default Assessment;

import { useState, useEffect } from "react";
import { toast } from "sonner";

import AssessmentLayout from "./AssessmentLayout";
import PersonalProfile from "./steps/PersonalProfile";
import HealthSurvey from "./steps/HealthSurvey";
import AssessmentResult from "./steps/AssessmentResult";

// 🚀 1. Import kembali file dummy lokal yang udah kita sesuaikan nilainya tadi
import { questions as dummyQuestions } from "./data/questions";
import { assessmentService } from "@/services/assessmentServices";

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);

  // 🚀 2. Set default value state langsung ke dummyQuestions, biar ga kosong pas nunggu BE
  const [questions, setQuestions] = useState(dummyQuestions);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    profile: {},
    answers: {},
  });

  // 🚀 3. Modifikasi fetch: Kalau BE belum ready, biarkan pake data dummy tanpa bikin crash
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await assessmentService.getQuestions();
        const quizData = response.data || response;
        if (quizData && quizData.length > 0) {
          setQuestions(quizData); // Cuma nimpa kalau API BE emang udah ngasih data
        }
      } catch (error) {
        // Biarkan silent error / console log aja biar ga ganggu UI lu pas nyoba dummy
        console.log("BE belum ready untuk kuis, menggunakan data dummy lokal.");
      }
    };
    fetchQuestions();
  }, []);

  const handleContinueSurvey = async (profileData) => {
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
        setFormData((prev) => ({ ...prev, profile: profileData }));
        setStep(2);
        setQuestionIndex(0);
        return "Profil medis berhasil diverifikasi!";
      },
      error: (err) => {
        return err.response?.data?.message || "Gagal menyimpan data profil medis.";
      },
    });
  };

  // 🚀 4. Pastikan mapping value skor dari dummy/id opsi bekerja dengan baik di sini
  const handleNextQuestion = (questionId, selectedOptionId) => {
    const currentQuestion = questions.find((q) => q.id === questionId);
    const selectedOption = currentQuestion?.options.find((opt) => opt.id === selectedOptionId);
    const scoreValue = selectedOption ? selectedOption.value : 0;

    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: scoreValue },
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
