import axiosClient from "../lib/axiosClient";

export const userService = {
  // 🚀 GET PROFILE: Mengambil data profil lengkap untuk initial value form settings / pre-fill kuis
  getProfile: async () => {
    try {
      const response = await axiosClient.get("/settings/profile");
      return response; // Langsung mengembalikan response utama setelah dipotong interceptor
    } catch (error) {
      throw error;
    }
  },

  // 🚀 PUT PROFILE: Mengubah data profil dengan skema snake_case BE teranyar
  updateProfile: async (profileData) => {
    try {
      // Mapping dari internal form state FE (camelCase) ke request body BE (snake_case)
      const payload = {
        fullname: profileData.fullname,
        username: profileData.username,
        age: Number(profileData.age),
        gender: profileData.gender === "male" ? 1 : 0,
        height: Number(profileData.height),
        weight: Number(profileData.weight),
        activity_level: profileData.activity, // 🔥 Sesuai Swagger: activity_level
        family_history: profileData.familyHistory, // 🔥 Sesuai Swagger: family_history
      };

      const response = await axiosClient.put("/settings/profile", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
