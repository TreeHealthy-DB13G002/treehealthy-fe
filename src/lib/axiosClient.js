import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      const errorMessage = error.response.data?.message || "Terjadi kesalahan pada server.";

      if (status === 401) {
        console.warn("Sesi berakhir. Mengalihkan...");
        localStorage.removeItem("token");
      }
      return Promise.reject(new Error(errorMessage));
    }

    if (error.message === "Network Error") {
      return Promise.reject(new Error("Koneksi gagal. Periksa jaringan internet Anda."));
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
