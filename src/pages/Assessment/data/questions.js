export const questions = [
  {
    id: "q1",
    title: "Seberapa sering Anda merasa pusing di kepala bagian belakang atau leher terasa tegang/kaku?",
    hint: "Gejala ini sering kali berkaitan dengan tanda awal tekanan darah tinggi (Hipertensi).",
    options: [
      { value: "never", label: "Jarang atau hampir tidak pernah", emoji: "🟢" },
      { value: "sometimes", label: "Kadang-kadang kalau capek", emoji: "🟡" },
      { value: "often", label: "Sering banget terasa kaku", emoji: "🟠" },
      { value: "severe", label: "Sangat sering sampai mengganggu aktivitas", emoji: "🔴" },
    ],
  },
  {
    id: "q2",
    title: "Apakah Anda sering merasa gampang haus, cepat lapar, dan sering bolak-balik kencing di malam hari?",
    hint: "Kombinasi gejala ini merupakan sinyal klasik tubuh saat kadar gula darah melonjak tinggi.",
    options: [
      { value: "no", label: "Tidak, kondisi tubuh terasa biasa saja", emoji: "🟢" },
      { value: "rarely", label: "Kadang-kadang saja kalau sedang lelah", emoji: "🟡" },
      { value: "yes", label: "Ya, akhir-akhir ini sering merasakannya", emoji: "🔴" },
    ],
  },
  {
    id: "q3",
    title: "Apakah ada orang tua atau saudara kandung Anda yang punya riwayat sakit jantung, stroke, diabetes, atau darah tinggi?",
    options: [
      { value: "none", label: "Tidak ada sama sekali", emoji: "❌" },
      { value: "one", label: "Ada, salah satu dari mereka", emoji: "👨‍⚕️" },
      { value: "multiple", label: "Ada, lebih dari satu anggota keluarga", emoji: "👨‍👩‍👧‍👦" },
      { value: "unsure", label: "Saya kurang tahu / tidak tahu", emoji: "❓" },
    ],
  },
  {
    id: "q4",
    title: "Bagaimana lingkungan Anda dengan asap rokok saat ini?",
    options: [
      { value: "free", label: "Saya tidak merokok & lingkungan bebas asap", emoji: "🚭" },
      { value: "passive_rare", label: "Tidak merokok, tapi sesekali terkena asap orang lain", emoji: "🟡" },
      { value: "passive_often", label: "Tidak merokok, tapi tiap hari terpapar asap rokok", emoji: "💨" },
      { value: "active", label: "Saya adalah perokok aktif", emoji: "🚬" },
    ],
  },
  {
    id: "q5",
    title: "Dalam seminggu, seberapa sering Anda menyempatkan diri olahraga sampai berkeringat (minimal 30 menit)?",
    options: [
      { value: "high", label: "Sangat rutin (4 kali atau lebih seminggu)", emoji: "⚡" },
      { value: "often", label: "Cukup (3 kali seminggu)", emoji: "🏃‍♂️" },
      { value: "sometimes", label: "Jarang (cuma 1-2 kali seminggu)", emoji: "🚶" },
      { value: "never", label: "Hampir tidak pernah sama sekali", emoji: "❌" },
    ],
  },
  {
    id: "q6",
    title: "Apakah piring makan Anda biasanya selalu ada sayur atau buahnya?",
    options: [
      { value: "always", label: "Iya, selalu ada di setiap porsi makan", emoji: "🥗" },
      { value: "often", label: "Sering ada, minimal sehari sekali", emoji: "🍲" },
      { value: "sometimes", label: "Kadang-kadang aja kalau sedang kepengen", emoji: "🍍" },
      { value: "rarely", label: "Jarang banget / hampir tidak pernah", emoji: "🥩" },
    ],
  },
  {
    id: "q7",
    title: "Seberapa sering Anda mengonsumsi gorengan, makanan instan, mi, atau minuman manis dalam sehari?",
    options: [
      { value: "rarely", label: "Jarang (cuma 1-2 kali seminggu)", emoji: "🥦" },
      { value: "sometimes", label: "Kadang-kadang (3-4 kali seminggu)", emoji: "🍿" },
      { value: "often", label: "Sering (hampir setiap hari pasti makan)", emoji: "🍳" },
      { value: "very_often", label: "Sangat sering (beberapa kali dalam sehari)", emoji: "🍟" },
    ],
  },
  {
    id: "q8",
    title: "Dalam sehari, biasanya Anda minum air putih sebanyak apa?",
    options: [
      { value: "more_than_enough", label: "Sangat cukup (lebih dari 2 liter / botol besar)", emoji: "💧" },
      { value: "sufficient", label: "Cukup (sekitar 1.5 - 2 liter atau 8 gelas)", emoji: "🥛" },
      { value: "insufficient", label: "Kurang (lebih sering minum kopi/teh/manis)", emoji: "🧋" },
    ],
  },
  {
    id: "q9",
    title: "Berapa jam biasanya Anda tidur di malam hari?",
    options: [
      { value: "normal", label: "Pas (sekitar 7 sampai 8 jam)", emoji: "😴" },
      { value: "less", label: "Kurang (5-6 jam sehari)", emoji: "🕒" },
      { value: "deprived", label: "Sangat kurang (kurang dari 5 jam / begadang)", emoji: "🦉" },
      { value: "excessive", label: "Kebanyakan (lebih dari 9 jam)", emoji: "🛌" },
    ],
  },
  {
    id: "q10",
    title: "Saat bangun pagi, apa yang biasanya tubuh Anda rasakan?",
    options: [
      { value: "refreshed", label: "Segar, bertenaga, dan siap aktivitas", emoji: "☀️" },
      { value: "so_so", label: "Biasa saja, kadang masih mengantuk sedikit", emoji: "🌤️" },
      { value: "exhausted", label: "Masih capek / lemas karena sering kebangun", emoji: "💤" },
    ],
  },
  {
    id: "q11",
    title: "Seberapa sering Anda merasa cemas, banyak pikiran, atau stres belakangan ini?",
    options: [
      { value: "rarely", label: "Jarang, hidup dibawa santai dan tenang aja", emoji: "🧘‍♂️" },
      { value: "sometimes", label: "Kadang-kadang kepikiran tapi masih aman", emoji: "☕" },
      { value: "often", label: "Sering banget sampai kepala terasa pusing", emoji: "💥" },
      { value: "severe", label: "Sangat parah sampai mengganggu tidur", emoji: "🤯" },
    ],
  },
];
