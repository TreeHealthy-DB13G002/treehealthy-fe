import ProfileCard from "./components/ProfileCard";
import SettingsHeader from "./components/SettingsHeader";

const Settings = () => {
  return (
    <div className="w-full space-y-6 p-1">
      <SettingsHeader />

      <ProfileCard />
    </div>
  );
};

export default Settings;
