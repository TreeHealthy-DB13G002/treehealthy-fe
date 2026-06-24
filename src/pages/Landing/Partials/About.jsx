export default function About() {
  return (
    <section id="about" className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-bold text-brand-primary tracking-wider uppercase mb-2">About TreeHealthy</p>

        <h2 className="text-3xl font-extrabold text-brand-secondary sm:text-4xl tracking-tight">
          Bridging the Gap in <span className="text-brand-primary">Personalized Healthcare</span>
        </h2>

        {/* Paragraf Deskripsi Sesuai Capstone Plan */}
        <p className="mt-6 text-lg leading-8 text-brand-text max-w-3xl mx-auto">
          Program <strong>CERDIK</strong> dari Kementerian Kesehatan RI sangat penting untuk mencegah Penyakit Tidak Menular (PTM). Namun, pendekatan edukasi generik sering membuat masyarakat bingung menerapkannya sesuai kondisi spesifik
          tubuh mereka sendiri.
        </p>

        <p className="mt-4 text-base leading-7 text-brand-text max-w-2xl mx-auto opacity-90">
          <strong>TreeHealthy</strong> hadir sebagai asisten digital berbasis kecerdasan buatan (AI) yang mengubah data klinis dan gaya hidup personal Anda menjadi rencana aksi harian yang konkret melalui dashboard checklist interaktif demi
          membangun kebiasaan hidup sehat yang berkelanjutan.
        </p>
      </div>
    </section>
  );
}
