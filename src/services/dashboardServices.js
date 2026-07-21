import axiosClient from "../lib/axiosClient";

export const dashboardService = {
  // 1. Ambil data dashboard real-time
  getCurrentData: async () => {
    try {
      const response = await axiosClient.get("/dashboard/current");
      return response;
    } catch (error) {
      throw error;
    }
  },

  // 2. Toggle checklist task harian (Trigger status pohon)
  toggleTask: async (taskId) => {
    try {
      const response = await axiosClient.patch(`/dashboard/tasks/${taskId}/toggle`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // 3. Submit evaluasi mingguan & reset ke minggu baru
  completeCycle: async (evalData) => {
    try {
      const response = await axiosClient.post("/dashboard/cycle-complete", evalData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
