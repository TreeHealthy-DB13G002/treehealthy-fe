import axiosClient from "../lib/axiosClient";

export const authService = {
  register: async (fullname, username, password, confirmPassword) => {
    try {
      const response = await axiosClient.post("/auth/register", {
        fullname,
        username,
        password,
        confirm_password: confirmPassword,
      });

      return response;
    } catch (error) {
      throw error.response?.data || new Error("Gagal melakukan registrasi.");
    }
  },

  login: async (username, password) => {
    try {
      const response = await axiosClient.post("/auth/login", {
        username,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      return response;
    } catch (error) {
      throw error.response?.data || new Error("Gagal login, periksa kredensial Anda.");
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosClient.get("/users/profile");
      return response;
    } catch (error) {
      throw error.response?.data || new Error("Gagal mengambil data profil.");
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axiosClient.put("/users/profile", profileData);
      return response;
    } catch (error) {
      throw error.response?.data || new Error("Gagal memperbarui profil.");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};
