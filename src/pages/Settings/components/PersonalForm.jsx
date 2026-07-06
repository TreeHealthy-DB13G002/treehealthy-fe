import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  username: z.string().min(3, "Username wajib diisi"),
  age: z.coerce.number().min(18, "Usia minimal harus 18 tahun").max(120, "Usia tidak valid"),
  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),
  activity: z.string().min(1, "Aktivitas harian wajib dipilih"),
  height: z.coerce.number().min(50, "Tinggi badan minimal 50 cm").max(250),
  weight: z.coerce.number().min(20, "Berat badan minimal 20 kg").max(300),
  familyHistory: z.array(z.string()).default([]),
});

const PTM_OPTIONS = [
  { id: "hipertensi", label: "Hipertensi (Darah Tinggi)" },
  { id: "diabetes", label: "Diabetes (Kencing Manis)" },
  { id: "jantung", label: "Penyakit Jantung Kronis" },
];

const PersonalForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "Alexander Ibraheem",
      username: "ibraheem",
      age: 20,
      gender: "male",
      activity: "working",
      height: 167,
      weight: 71,
      familyHistory: [],
    },
  });

  const gender = watch("gender");
  const activity = watch("activity");
  const height = Number(watch("height"));
  const weight = Number(watch("weight"));
  const familyHistory = watch("familyHistory") || [];

  const bmiInfo = useMemo(() => {
    if (!height || !weight || height === 0 || weight === 0) return null;

    const scoreValue = weight / Math.pow(height / 100, 2);
    const score = scoreValue.toFixed(1);

    if (scoreValue < 18.5) {
      return { score, status: "Berat Badan Kurang", color: "text-blue-600", bg: "bg-blue-50/40", border: "border-blue-100" };
    } else if (scoreValue >= 18.5 && scoreValue < 23.0) {
      return { score, status: "Normal", color: "text-green-600", bg: "bg-green-50/40", border: "border-green-100" };
    } else if (scoreValue >= 23.0 && scoreValue < 25.0) {
      return { score, status: "Kelebihan Berat Badan (Overweight)", color: "text-yellow-600", bg: "bg-yellow-50/40", border: "border-yellow-100" };
    } else if (scoreValue >= 25.0 && scoreValue < 30.0) {
      return { score, status: "Obesitas Tingkat I", color: "text-red-600", bg: "bg-red-50/40", border: "border-red-100" };
    } else {
      return { score, status: "Obesitas Tingkat II", color: "text-red-700", bg: "bg-red-100/50", border: "border-red-200" };
    }
  }, [height, weight]);

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setValue("familyHistory", [...familyHistory, id]);
    } else {
      setValue(
        "familyHistory",
        familyHistory.filter((item) => item !== id),
      );
    }
  };

  const onSubmit = (values) => {
    console.log("Payload data siap kirim ke BE Express:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-[#1a5f7a] uppercase tracking-wider">Nama Lengkap</Label>
          <Input {...register("fullName")} className="rounded-xl h-11 border-gray-200" />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-[#1a5f7a] uppercase tracking-wider">Username</Label>
          <Input {...register("username")} className="rounded-xl h-11 border-gray-200" />
          {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-[#1a5f7a] uppercase tracking-wider">Usia (Tahun)</Label>
          <Input type="number" {...register("age")} className="rounded-xl h-11 border-gray-200" />
          {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-[#1a5f7a] uppercase tracking-wider">Tinggi Badan (cm)</Label>
          <Input type="number" {...register("height")} className="rounded-xl h-11 border-gray-200" />
          {errors.height && <p className="text-xs text-red-500">{errors.height.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-[#1a5f7a] uppercase tracking-wider">Berat Badan (kg)</Label>
          <Input type="number" {...register("weight")} className="rounded-xl h-11 border-gray-200" />
          {errors.weight && <p className="text-xs text-red-500">{errors.weight.message}</p>}
        </div>
      </div>

      {bmiInfo && (
        <div className={`p-3 border ${bmiInfo.bg} ${bmiInfo.border} rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all animate-in fade-in-50 duration-200`}>
          <div className="text-xs font-semibold text-gray-700">
            Status Indeks Massa Tubuh (IMT): <strong className={`${bmiInfo.color} font-bold`}>{bmiInfo.status}</strong>
          </div>
          <div className="text-xs text-gray-500 font-semibold">Skor IMT: {bmiInfo.score} kg/m²</div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 w-full">
          <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Jenis Kelamin</Label>
          <Select value={gender} onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}>
            <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:ring-brand-primary w-full bg-white">
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs font-semibold text-red-500 mt-1">{errors.gender.message}</p>}
        </div>

        <div className="space-y-2 w-full">
          <Label className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Aktivitas Harian</Label>
          <Select value={activity} onValueChange={(value) => setValue("activity", value, { shouldValidate: true })}>
            <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:ring-brand-primary w-full bg-white">
              <SelectValue placeholder="Pilih tingkat aktivitas" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="freelance">Bekerja</SelectItem>
              <SelectItem value="not_working">Tidak Bekerja</SelectItem>
              <SelectItem value="working">Pekerja Lepas</SelectItem>
              <SelectItem value="student">Pelajar / Mahasiswa</SelectItem>
              <SelectItem value="household">Ibu Rumah Tangga</SelectItem>
              <SelectItem value="retired">Lansia / Pensiunan</SelectItem>
            </SelectContent>
          </Select>
          {errors.activity && <p className="text-xs font-semibold text-red-500 mt-1">{errors.activity.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs font-bold text-[#1a5f7a] uppercase tracking-wider block">Riwayat Penyakit Tidak Menular (PTM) Keluarga</Label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {PTM_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 space-y-0 rounded-xl border border-gray-100 p-4 bg-white hover:bg-gray-50/50 transition focus-within:ring-2 focus-within:ring-brand-primary/20">
              <Checkbox
                id={option.id}
                checked={familyHistory.includes(option.id)}
                onCheckedChange={(checked) => handleCheckboxChange(option.id, checked)}
                className="w-5 h-5 rounded-md border-gray-300 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary data-[state=checked]:text-brand-white focus-visible:ring-brand-primary"
              />
              <label htmlFor={option.id} className="text-xs text-gray-600 font-semibold cursor-pointer select-none w-full">
                {option.label}
              </label>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 italic block mt-1 tracking-wide leading-relaxed">*Pilih satu atau lebih kondisi kronis yang didiagnosis pada orang tua kandung, kakek, atau nenek Anda.</p>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <Button type="submit" className="w-full sm:w-auto px-6 h-11 bg-brand-primary hover:bg-[#0369a1] text-white font-semibold rounded-xl transition shadow-sm">
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
};

export default PersonalForm;
