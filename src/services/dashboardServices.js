import axiosClient from "../lib/axiosClient";

export const dashboardService = {
  getCurrentData: async () => {
    try {
      const response = await axiosClient.get("/dashboard/current");
      return response;
    } catch (error) {
      throw error;
    }
  },

  toggleTask: async (taskId) => {
    try {
      const response = await axiosClient.patch(`/dashboard/tasks/${taskId}/toggle`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  completeCycle: async (evalData) => {
    try {
      const response = await axiosClient.post("/dashboard/cycle-complete", evalData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
