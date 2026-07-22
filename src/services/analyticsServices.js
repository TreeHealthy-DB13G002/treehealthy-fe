import axiosClient from "../lib/axiosClient";

export const analyticsService = {
  /**
   * Menyuplai koordinat grafik tren risiko PTM dan tingkat kepatuhan aktivitas sehat
   */
  getCharts: async () => {
    try {
      const response = await axiosClient.get("/analytics/charts");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
