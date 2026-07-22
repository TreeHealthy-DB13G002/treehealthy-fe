import axiosClient from "../lib/axiosClient";

export const journeyService = {
  /**
   * Mendapatkan rekapitulasi kepatuhan global dan list tabel utama mingguan
   */
  getSummary: async () => {
    try {
      const response = await axiosClient.get("/journey-log/summary");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mendapatkan data sub-tabel detail saat tombol "Lihat Detail" diklik
   * @param {string|number} cycleId
   */
  getDetail: async (cycleId) => {
    try {
      const response = await axiosClient.get(`/journey-log/detail/${cycleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
