import axios from "axios";

/**
 * ─── 1. INISIALISASI INSTANCE AXIOS ───
 * Bagian ini menentukan konfigurasi dasar koneksi ke server BE.
 */
const axiosClient = axios.create({
  // 💡 SESUAIKAN NANTI: Ambil base URL dari file .env proyek lu.
  // Jika pakai Vite, ganti ke: import.meta.env.VITE_API_BASE_URL
  // Fallback ke http://localhost:5000/api untuk development lokal saat ini.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",

  // Batas waktu tunggu server merespon (10 detik). Jika lebih, request dibatalkan otomatis.
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * ─── 2. REQUEST INTERCEPTOR (Pintu Gerbang Keluar) ───
 * Fungsi ini otomatis berjalan "SEBELUM" request terkirim ke server BE.
 * Sangat berguna untuk menyisipkan Token Keamanan (JWT Auth) secara global.
 */
axiosClient.interceptors.request.use(
  (config) => {
    // 💡 SESUAIKAN NANTI: Sesuaikan key nama penyimpanan token lu ('auth_token', 'token', dll)
    // Jika lu pakai state management seperti Zustand/Redux, ambil token dari store tersebut.
    const token = localStorage.getItem("token");

    // Jika token ditemukan di storage, sisipkan ke header Authorization
    if (token) {
      // 💡 SESUAIKAN NANTI: Cek format header dari BE, apakah pakai "Bearer " atau tanpa prefix.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Jalankan logika jika terjadi error sebelum request sempat dikirim
    return Promise.reject(error);
  },
);

/**
 * ─── 3. RESPONSE INTERCEPTOR (Pintu Gerbang Masuk) ───
 * Fungsi ini otomatis berjalan "SETELAH" server memberikan respon,
 * tapi "SEBELUM" datanya masuk ke fungsi .then() atau try/catch di file service lu.
 */
axiosClient.interceptors.response.use(
  (response) => {
    /**
     * 🔥 TIPS SINKRONISASI:
     * Dengan langsung me-return `response.data`, di file Service lu nanti GAK PERLU
     * nulis `res.data.data` lagi. Cukup langsung panggil objeknya.
     *
     * 💡 SESUAIKAN NANTI: Cek struktur bungkus data dari BE lu (misal: response.data.payload)
     */
    return response.data;
  },
  (error) => {
    // Tangkap kode error HTTP global di sini (400, 401, 403, 404, 500, dll)
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data?.message || "Terjadi kesalahan pada server.";

      /**
       * 💡 SESUAIKAN NANTI: Logika Paksa Logout (Error 401 Unauthorized)
       * Biasanya terjadi jika sesi user habis, token kedaluwarsa, atau token palsu.
       */
      if (status === 401) {
        console.warn("Sesi berakhir atau token tidak valid. Mengalihkan...");

        // Hapus token dari storage (Sesuaikan dengan sistem auth lu nanti)
        localStorage.removeItem("auth_token");

        // Paksa tendang user balik ke halaman login jika diperlukan
        // window.location.href = "/login";
      }

      /**
       * 💡 SESUAIKAN NANTI: Logika Akses Ditolak (Error 403 Forbidden)
       * Terjadi jika user nekat mengakses fitur yang bukan hak perannya (Role).
       */
      if (status === 403) {
        console.error("Anda tidak memiliki akses untuk fitur ini.");
      }

      // Lempar pesan error spesifik dari BE agar bisa ditangkap alert/toast di UI
      return Promise.reject(new Error(errorMessage));
    }

    // Handle error jika server mati total / internet user putus (Network Error)
    if (error.message === "Network Error") {
      return Promise.reject(new Error("Koneksi gagal. Periksa jaringan internet Anda atau server sedang maintenance."));
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
