import axiosClient from "../lib/axiosClient";

export const journeyService = {
  getSummary: async () => {
    try {
      const response = await axiosClient.get("/journey-log/summary");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getDetail: async (cycleId) => {
    try {
      const response = await axiosClient.get(`/journey-log/detail/${cycleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
