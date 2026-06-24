import { Brain, Sparkles, Trees, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Compliance Scoring",
    desc: "Kalkulasi instan skor risiko Penyakit Tidak Menular (PTM) menggunakan model Machine Learning kustom (Random Forest Classifier) berdasarkan data kualitatif gaya hidup Anda.",
  },
  {
    icon: Sparkles,
    title: "AI Explainer & 7-Day Plan",
    desc: "Integrasi teknologi Retrieval-Augmented Generation (RAG) berbasis dokumen resmi Kemenkes RI dan Google Gemini API untuk menghasilkan penjelasan medis yang suportif serta jadwal harian.",
  },
  {
    icon: Trees,
    title: "Tree-Growth Center",
    desc: "Gamifikasi kesehatan interaktif! Pantau kepatuhan harian Anda melalui visualisasi pohon digital yang akan tumbuh subur jika tugas diselesaikan, atau layu jika diabaikan.",
  },
  {
    icon: BarChart3,
    title: "History & Analytics",
    desc: "Pantau rekam jejak perkembangan kesehatan berkala Anda lewat visualisasi Grafik Garis (Line Chart) dan Grafik Batang interaktif yang didukung penuh oleh Recharts.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50/50 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-primary tracking-wider uppercase mb-2">Our Features</p>
          <h2 className="text-3xl font-extrabold text-brand-secondary sm:text-4xl tracking-tight">Designed to Protect & Empower Your Life</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl mb-5">
                <f.icon className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-secondary mb-2">{f.title}</h3>
              <p className="text-sm/6 text-brand-text font-medium opacity-90">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
