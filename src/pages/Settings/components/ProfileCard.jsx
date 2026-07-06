import React from "react";
import PersonalForm from "./PersonalForm";

const ProfileCard = ({ fullName = "Alexander Ibraheem", lastUpdate = "Baru saja" }) => {
  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-3 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 bg-brand-primary rounded-full flex items-center justify-center font-bold text-brand-white text-base border border-slate-200/60 uppercase">{getInitial(fullName)}</div>
          <div>
            <h2 className="font-semibold text-slate-800 text-lg">{fullName}</h2>
            <p className="text-xs text-slate-400">Lengkapi data fisik dasar Anda sebelum memulai survei penilaian risiko kesehatan.</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">Terakhir diperbarui: {lastUpdate}</span>
        </div>
      </div>

      <PersonalForm />
    </div>
  );
};

export default ProfileCard;
