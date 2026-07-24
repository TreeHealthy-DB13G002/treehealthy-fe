import axiosClient from "../lib/axiosClient";

export const analyticsService = {
  getCharts: async () => {
    try {
      const response = await axiosClient.get("/analytics/charts");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
