import axiosClient from "../lib/axiosClient";

export const authService = {
  register: async (fullname, username, password, confirmPassword) => {
    try {
      // 🚀 PERBAIKAN: Ubah confirm_password menjadi confirmPassword sesuai skema Swagger
      const response = await axiosClient.post("/auth/register", {
        fullname,
        username,
        password,
        confirm_password: confirmPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axiosClient.post("/auth/login", {
        username,
        password,
      });

      // 🚀 PERBAIKAN: Karena dipotong interceptor, response langsung berupa objek utama { status, data: { token, hasProfile } }
      if (response.status === "success" && response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};
