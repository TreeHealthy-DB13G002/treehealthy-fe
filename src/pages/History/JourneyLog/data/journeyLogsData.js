export const weeklyMasterLogs = [
  {
    id: "w1",
    cycle: "Minggu ke-1",
    dateRange: "15 Juni - 21 Juni 2026",
    ptmRisk: "Tinggi", // 🔴 Wajib 8 Task per hari
    compliance: "80% (45 dari 56 tugas selesai)",
    status: "Selesai",
  },
  {
    id: "w2",
    cycle: "Minggu ke-2",
    dateRange: "22 Juni - 28 Juni 2026",
    ptmRisk: "Sedang", // 🟡 Wajib 8 Task per hari
    compliance: "50% (28 dari 56 tugas selesai)",
    status: "Butuh Evaluasi",
  },
  {
    id: "w3",
    cycle: "Minggu ke-3",
    dateRange: "29 Juni - 05 Juli 2026",
    ptmRisk: "Rendah", // 🟢 Otomatis 7 Task per hari
    compliance: "93% (46 dari 49 tugas selesai)",
    status: "Selesai",
  },
  {
    id: "w4",
    cycle: "Minggu ke-4",
    dateRange: "06 Juli - 12 Juli 2026",
    ptmRisk: "Tinggi", // 🔴 Wajib 8 Task per hari
    compliance: "57% (32 dari 56 tugas selesai)",
    status: "Butuh Evaluasi",
  },
  {
    id: "w5",
    cycle: "Minggu ke-5",
    dateRange: "13 Juli - 19 Juli 2026",
    ptmRisk: "Sedang", // 🟡 Wajib 8 Task per hari
    compliance: "83% (47 dari 56 tugas selesai)",
    status: "Selesai",
  },
  {
    id: "w6",
    cycle: "Minggu ke-6",
    dateRange: "20 Juli - 26 Juli 2026",
    ptmRisk: "Rendah", // 🟢 Otomatis 7 Task per hari
    compliance: "87% (43 dari 49 tugas selesai)",
    status: "Selesai",
  },
  {
    id: "w7",
    cycle: "Minggu ke-7",
    dateRange: "27 Juli - 02 Agustus 2026",
    ptmRisk: "Rendah",
    compliance: "0% (0 dari 49 tugas selesai)",
    status: "Belum Mulai",
  },
  {
    id: "w8",
    cycle: "Minggu ke-8",
    dateRange: "03 Agustus - 09 Agustus 2026",
    ptmRisk: "Rendah",
    compliance: "0% (0 dari 49 tugas selesai)",
    status: "Belum Mulai",
  },
];

export const dailyDetailLogs = {
  w1: [
    { id: "w1-d1", date: "15 Juni 2026", day: "Senin", tasks: [true, true, true, true, true, false, true, true], status: "Terpenuhi" },
    { id: "w1-d2", date: "16 Juni 2026", day: "Selasa", tasks: [true, true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w1-d3", date: "17 Juni 2026", day: "Rabu", tasks: [true, false, true, true, false, false, true, false], status: "Kurang" },
    { id: "w1-d4", date: "18 Juni 2026", day: "Kamis", tasks: [true, true, true, true, true, true, false, true], status: "Terpenuhi" },
    { id: "w1-d5", date: "19 Juni 2026", day: "Jumat", tasks: [true, true, false, true, true, true, true, true], status: "Terpenuhi" },
    { id: "w1-d6", date: "20 Juni 2026", day: "Sabtu", tasks: [true, true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w1-d7", date: "21 Juni 2026", day: "Minggu", tasks: [true, true, true, false, true, true, true, true], status: "Terpenuhi" },
  ],
  w2: [
    { id: "w2-d1", date: "22 Juni 2026", day: "Senin", tasks: [true, false, true, true, false, true, false, false], status: "Kurang" },
    { id: "w2-d2", date: "23 Juni 2026", day: "Selasa", tasks: [true, true, true, true, true, true, false, true], status: "Terpenuhi" },
    { id: "w2-d3", date: "24 Juni 2026", day: "Rabu", tasks: [false, true, true, false, true, true, true, false], status: "Terpenuhi" },
    { id: "w2-d4", date: "25 Juni 2026", day: "Kamis", tasks: [true, true, false, true, true, false, false, false], status: "Kurang" },
    { id: "w2-d5", date: "26 Juni 2026", day: "Jumat", tasks: [true, true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w2-d6", date: "27 Juni 2026", day: "Sabtu", tasks: [false, false, true, true, true, true, false, false], status: "Kurang" },
    { id: "w2-d7", date: "28 Juni 2026", day: "Minggu", tasks: [true, true, true, false, false, true, true, false], status: "Terpenuhi" },
  ],
  w3: [
    { id: "w3-d1", date: "29 Juni 2026", day: "Senin", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w3-d2", date: "30 Juni 2026", day: "Selasa", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w3-d3", date: "01 Juli 2026", day: "Rabu", tasks: [true, false, true, true, true, true, true], status: "Terpenuhi" },
    { id: "w3-d4", date: "02 Juli 2026", day: "Kamis", tasks: [true, true, true, false, true, true, true], status: "Terpenuhi" },
    { id: "w3-d5", date: "03 Juli 2026", day: "Jumat", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w3-d6", date: "04 Juli 2026", day: "Sabtu", tasks: [true, true, false, true, false, true, true], status: "Terpenuhi" },
    { id: "w3-d7", date: "05 Juli 2026", day: "Minggu", tasks: [true, true, true, true, true, false, true], status: "Terpenuhi" },
  ],
  w4: [
    // Risiko Tinggi (Wajib 8 Task) - Lagi kumat bolosnya ceritanya bro
    { id: "w4-d1", date: "06 Juli 2026", day: "Senin", tasks: [false, false, true, true, false, true, false, false], status: "Kurang" },
    { id: "w4-d2", date: "07 Juli 2026", day: "Selasa", tasks: [true, true, true, true, false, false, true, true], status: "Terpenuhi" },
    { id: "w4-d3", date: "08 Juli 2026", day: "Rabu", tasks: [false, false, false, true, true, true, false, false], status: "Kurang" },
    { id: "w4-d4", date: "09 Juli 2026", day: "Kamis", tasks: [true, true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w4-d5", date: "10 Juli 2026", day: "Jumat", tasks: [false, true, false, true, false, false, true, false], status: "Kurang" },
    { id: "w4-d6", date: "11 Juli 2026", day: "Sabtu", tasks: [true, true, true, true, false, true, true, false], status: "Terpenuhi" },
    { id: "w4-d7", date: "12 Juli 2026", day: "Minggu", tasks: [true, false, true, true, true, false, true, true], status: "Terpenuhi" },
  ],
  w5: [
    // Risiko Sedang (Wajib 8 Task)
    { id: "w5-d1", date: "13 Juli 2026", day: "Senin", tasks: [true, true, true, true, true, true, false, true], status: "Terpenuhi" },
    { id: "w5-d2", date: "14 Juli 2026", day: "Selasa", tasks: [true, true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w5-d3", date: "15 Juli 2026", day: "Rabu", tasks: [true, false, true, true, true, true, false, true], status: "Terpenuhi" },
    { id: "w5-d4", date: "16 Juli 2026", day: "Kamis", tasks: [true, true, false, true, true, true, true, false], status: "Terpenuhi" },
    { id: "w5-d5", date: "17 Juli 2026", day: "Jumat", tasks: [true, true, true, true, true, true, false, true], status: "Terpenuhi" },
    { id: "w5-d6", date: "18 Juli 2026", day: "Sabtu", tasks: [true, true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w5-d7", date: "19 Juli 2026", day: "Minggu", tasks: [false, true, true, true, false, true, true, true], status: "Terpenuhi" },
  ],
  w6: [
    // Risiko Rendah (Otomatis 7 Task)
    { id: "w6-d1", date: "20 Juli 2026", day: "Senin", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w6-d2", date: "21 Juli 2026", day: "Selasa", tasks: [true, true, false, true, true, true, true], status: "Terpenuhi" },
    { id: "w6-d3", date: "22 Juli 2026", day: "Rabu", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w6-d4", date: "23 Juli 2026", day: "Kamis", tasks: [true, false, true, true, false, true, true], status: "Terpenuhi" },
    { id: "w6-d5", date: "24 Juli 2026", day: "Jumat", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
    { id: "w6-d6", date: "25 Juli 2026", day: "Sabtu", tasks: [true, true, true, false, true, true, false], status: "Terpenuhi" },
    { id: "w6-d7", date: "26 Juli 2026", day: "Minggu", tasks: [true, true, true, true, true, true, true], status: "Sempurna" },
  ],
  // w7 & w8 sengaja tidak ada isinya karena status siklusnya masih "Belum Mulai"
};
