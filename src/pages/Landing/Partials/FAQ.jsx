const faqs = [
  {
    q: "Apakah platform ini memberikan diagnosis medis resmi dokter?",
    a: "Tidak. TreeHealthy berfungsi sebagai platform bimbingan preventif (pencegahan) awal berbasis AI yang merujuk pada standar CERDIK Kemenkes RI untuk mengelola gaya hidup sehat, bukan pengganti diagnosis klinis dokter spesialis.",
  },
  {
    q: "Bagaimana sistem mengamankan data pribadi saya?",
    a: "Sangat aman. Seluruh data akun dan profil statis Anda disimpan secara terenkripsi di database relasional PostgreSQL kami, dan sesi otentikasi login dikunci menggunakan protokol standar industri JSON Web Token (JWT).",
  },
  {
    q: "Kenapa kuis evaluasi saya terkunci setelah selesai mengisi?",
    a: "Ini merupakan fitur Cooldown Lock (Sistem Kunci Evaluasi). Menu kuis otomatis dikunci ketika Anda memiliki rencana aksi aktif selama 7 hari, demi menjaga konsistensi rekam jejak harian Anda dan menghindari pemanggilan API yang berlebihan.",
  },
  {
    q: "Dari mana AI TreeHealthy mendapatkan basis data referensi?",
    a: "Sistem RAG (Retrieval-Augmented Generation) kami menggunakan pangkalan data vektor ChromaDB lokal yang diisi langsung dari dokumen PDF pedoman resmi pencegahan penyakit dari Direktorat P2PTM Kementerian Kesehatan RI.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gray-50/50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-primary tracking-wider uppercase mb-2">Questions</p>
          <h2 className="text-3xl font-extrabold text-brand-secondary sm:text-4xl tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs">
              <h3 className="text-base font-bold text-brand-secondary flex items-start gap-2">
                <span className="text-brand-primary">Q:</span> {f.q}
              </h3>
              <p className="mt-3 text-sm/6 text-brand-text font-medium pl-6 border-l-2 border-brand-primary/30 opacity-90">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
