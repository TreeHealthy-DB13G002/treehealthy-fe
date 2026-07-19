import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProfileCard from "./components/ProfileCard";
import SettingsHeader from "./components/SettingsHeader";
import { userService } from "@/services/userServices";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getProfile();
      // Mengambil objek utama data dari response interceptor
      const userData = response.data || response;
      setProfileData(userData);
    } catch (error) {
      toast.error("Gagal memuat profil pengguna.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-full space-y-6 p-1">
      <SettingsHeader />

      {isLoading ? (
        <div className="w-full h-48 bg-white rounded-2xl border border-slate-100 animate-pulse flex items-center justify-center text-xs font-semibold text-slate-400">Memuat data profil medis...</div>
      ) : (
        <ProfileCard initialData={profileData} onRefresh={fetchProfile} />
      )}
    </div>
  );
};

export default Settings;
