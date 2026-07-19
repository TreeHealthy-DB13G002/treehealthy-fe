import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AssessmentCard from "../components/AssessmentCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  age: z.coerce.number().min(1, "Usia wajib diisi").max(120, "Usia tidak valid"),
  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),
  activity: z.string().min(1, "Aktivitas harian wajib dipilih"),
  height: z.coerce.number().min(50, "Minimal 50 cm").max(250, "Maksimal 250 cm"),
  weight: z.coerce.number().min(20, "Minimal 20 kg").max(300, "Maksimal 300 kg"),
  familyHistory: z.array(z.string()).default([]),
});

const PersonalProfile = ({ onContinue, savedData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      age: savedData?.age || "",
      gender: savedData?.gender || "",
      activity: savedData?.activity || "",
      height: savedData?.height || "",
      weight: savedData?.weight || "",
      familyHistory: savedData?.familyHistory || [],
    },
  });

  const gender = watch("gender");
  const activity = watch("activity");
  const height = watch("height");
  const weight = watch("weight");

  const [bmiResult, setBmiResult] = useState({ score: 0, status: "", color: "", bgColor: "", border: "" });

  useEffect(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const heightInMeter = h / 100;
      const bmi = w / (heightInMeter * heightInMeter);
      const score = parseFloat(bmi.toFixed(1));

      let status = "";
      let color = "";
      let bgColor = "";
      let border = "";

      if (score < 18.5) {
        status = "Kurang Berat Badan (Kurus)";
        color = "text-amber-600";
        bgColor = "bg-amber-50/50";
        border = "border-amber-100";
      } else if (score >= 18.5 && score <= 22.9) {
        status = "Berat Badan Ideal (Normal)";
        color = "text-emerald-600";
        bgColor = "bg-emerald-50/50";
        border = "border-emerald-100";
      } else if (score >= 23.0 && score <= 24.9) {
        status = "Kelebihan Berat Badan (Overweight)";
        color = "text-orange-600";
        bgColor = "bg-orange-50/50";
        border = "border-orange-100";
      } else {
        status = "Berat Badan Berlebih (Obesitas)";
        color = "text-red-600";
        bgColor = "bg-red-50/50";
        border = "border-red-100";
      }

      setBmiResult({ score, status, color, bgColor, border });
    } else {
      setBmiResult({ score: 0, status: "", color: "", bgColor: "", border: "" });
    }
  }, [height, weight]);

  const onSubmit = (values) => {
    onContinue({ ...values, bmiScore: bmiResult.score, bmiStatus: bmiResult.status });
  };

  return (
    <AssessmentCard>
      <div className="flex flex-col h-full justify-between space-y-6">
        <div className="space-y-1.5 text-left">
          <h2 className="text-xl font-black text-brand-secondary tracking-tight md:text-2xl">Isi Profil Anda</h2>
          <p className="text-sm font-medium text-brand-text opacity-80 leading-relaxed">Masukkan data fisik dasar Anda dengan jujur untuk membantu kami mengukur skor risiko kesehatan dengan akurat.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Berapa Usia Anda? (Tahun)</Label>
              <Input type="number" placeholder="Contoh: 25" {...register("age")} className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary w-full" />
              {errors.age && <p className="text-xs font-semibold text-red-500 mt-1">{errors.age.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Tinggi Badan (cm)</Label>
              <Input type="number" placeholder="Contoh: 165" {...register("height")} className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary w-full" />
              {errors.height && <p className="text-xs font-semibold text-red-500 mt-1">{errors.height.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Berat Badan (kg)</Label>
              <Input type="number" placeholder="Contoh: 60" {...register("weight")} className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary w-full" />
              {errors.weight && <p className="text-xs font-semibold text-red-500 mt-1">{errors.weight.message}</p>}
            </div>

            {bmiResult.score > 0 && (
              <div className={`md:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border ${bmiResult.bgColor} ${bmiResult.border} transition-all duration-300 gap-2`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold tracking-wider text-brand-secondary">Kondisi Tubuh Saat Ini:</span>
                  <span className={`text-xs font-bold ${bmiResult.color}`}>{bmiResult.status}</span>
                </div>
                <div className="text-xs font-semibold text-brand-secondary">
                  Skor Indeks Tubuh (IMT): <span className="text-xs font-bold">{bmiResult.score}</span>
                </div>
              </div>
            )}

            <div className="space-y-2 md:col-span-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Jenis Kelamin</Label>
              <Select value={gender} onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}>
                <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:ring-brand-primary w-full">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="male">Laki-laki</SelectItem>
                  <SelectItem value="female">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-xs font-semibold text-red-500 mt-1">{errors.gender.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Aktivitas Utama Harian</Label>
              <Select value={activity} onValueChange={(value) => setValue("activity", value, { shouldValidate: true })}>
                <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:ring-brand-primary w-full">
                  <SelectValue placeholder="Pilih aktivitas utama" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="working">Bekerja</SelectItem>
                  <SelectItem value="freelance">Pekerja Lepas</SelectItem>
                  <SelectItem value="not_working">Tidak Bekerja / Mencari Kerja</SelectItem>
                  <SelectItem value="student">Pelajar / Mahasiswa</SelectItem>
                  <SelectItem value="household">Mengurus Rumah Tangga</SelectItem>
                  <SelectItem value="retired">Sudah Pensiun / Lansia</SelectItem>
                </SelectContent>
              </Select>
              {errors.activity && <p className="text-xs font-semibold text-red-500 mt-1">{errors.activity.message}</p>}
            </div>
          </div>

          <div className="space-y-2 md:col-span-6">
            <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Apakah keluarga kandung Anda punya riwayat penyakit di bawah ini?</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-3 rounded-2xl border border-gray-100 bg-slate-50/50">
              {[
                { id: "hypertension", label: "Hipertensi (Darah Tinggi)" },
                { id: "diabetes", label: "Diabetes (Gula Darah Tinggi)" },
                { id: "heart_disease", label: "Penyakit Jantung" },
              ].map((item) => {
                const currentHistories = watch("familyHistory") || [];
                const isChecked = currentHistories.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer select-none transition-all duration-200
                      ${isChecked ? "border-brand-primary bg-white text-brand-secondary shadow-xs" : "border-gray-200/60 bg-white text-brand-text hover:border-gray-300"}
                    `}
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      checked={isChecked}
                      className="accent-brand-primary h-4 w-4 rounded-sm"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const updatedValue = checked ? [...currentHistories, item.id] : currentHistories.filter((val) => val !== item.id);
                        setValue("familyHistory", updatedValue, { shouldValidate: true });
                      }}
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-100 pt-5 mt-auto">
            <p className="text-xs italic font-medium text-brand-text/70 max-w-md leading-relaxed">*Catatan: Anda boleh mencentang lebih dari satu jika orang tua kandung atau kakek-nenek Anda memilikinya. Jika tidak ada, biarkan kosong.</p>

            <Button
              type="submit"
              className="h-11 px-6 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-bold shadow-xs transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap w-full sm:w-auto flex-shrink-0 flex items-center justify-center"
            >
              Lanjutkan ke Kuesioner
            </Button>
          </div>
        </form>
      </div>
    </AssessmentCard>
  );
};

export default PersonalProfile;
