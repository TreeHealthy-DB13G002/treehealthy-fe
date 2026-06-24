const steps = [
  {
    step: "01",
    title: "Health Assessment",
    desc: "Isi 11 kuesioner kualitatif mingguan ramah awam mengenai parameter gaya hidup Anda (pola makan, tidur, aktivitas, dll).",
  },
  {
    step: "02",
    title: "AI Risk Prediction",
    desc: "Machine Learning model memproses jawaban dan mengonversinya menjadi persentase skor risiko PTM secara lokal dan instan.",
  },
  {
    step: "03",
    title: "RAG Medical Explainer",
    desc: "Gemini AI mencocokkan hasil skor dengan dokumen Kemenkes RI untuk meracik narasi penjelasan medis yang menenangkan.",
  },
  {
    step: "04",
    title: "Grow Your Digital Tree",
    desc: "Selesaikan checklist rencana aksi sehat selama 7 hari untuk mempertahankan konsistensi dan merawat pohon digital Anda.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-primary tracking-wider uppercase mb-2">The Process</p>
          <h2 className="text-3xl font-extrabold text-brand-secondary sm:text-4xl tracking-tight">How TreeHealthy Guides You</h2>
        </div>

        {/* Layout Alur Kartu Step Horizontal */}
        <div className="grid md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={i} className="relative p-6 rounded-2xl bg-gray-50/50 border border-gray-100 flex flex-col justify-between h-full">
              <div>
                <span className="text-4xl font-black text-brand-primary/20 block mb-2">{s.step}</span>
                <h3 className="text-lg font-bold text-brand-secondary mb-2">{s.title}</h3>
                <p className="text-xs/5 text-brand-text font-medium opacity-90">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
