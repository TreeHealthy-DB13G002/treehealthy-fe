import axiosClient from "../lib/axiosClient";

export const assessmentService = {
  /**
   * 1. Kirim Data Fisik & Medis Dasar
   * @param {Object} profileData - { age, gender, height, weight, activityLevel, familyHistory }
   */
  saveProfile: async (profileData) => {
    try {
      const response = await axiosClient.post("/assessment/profile", profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * 2. Ambil 11 Daftar Pertanyaan Kuis dari Database
   */
  getQuestions: async () => {
    try {
      const response = await axiosClient.get("/assessment/questions");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * 3. Kirim Seluruh Jawaban Kuis untuk Kalkulasi Skor 4 Pilar Medis
   * @param {Object} answersData - Paket data jawaban kuis sesuai kontrak BE/AI
   */
  submitAnswers: async (answersData) => {
    try {
      const response = await axiosClient.post("/assessment/submit", answersData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
