import axiosClient from "../lib/axiosClient";

export const userService = {
  getProfile: async () => {
    try {
      const response = await axiosClient.get("/settings/profile");
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const payload = {
        fullname: profileData.fullname,
        username: profileData.username,
        age: Number(profileData.age),
        gender: profileData.gender === "male" ? 1 : 0,
        height: Number(profileData.height),
        weight: Number(profileData.weight),
        activity_level: profileData.activity,
        family_history: profileData.familyHistory,
      };

      const response = await axiosClient.put("/settings/profile", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
