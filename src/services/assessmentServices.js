import axiosClient from "../lib/axiosClient";

export const assessmentService = {
  saveProfile: async (profileData) => {
    try {
      const response = await axiosClient.post("/assessment/profile", profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getQuestions: async () => {
    try {
      const response = await axiosClient.get("/assessment/questions");
      return response;
    } catch (error) {
      throw error;
    }
  },

  submitAnswers: async (answersData) => {
    try {
      const response = await axiosClient.post("/assessment/submit", answersData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  generatePlan: async () => {
    try {
      const response = await axiosClient.post("/assessment/generate-plan");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
