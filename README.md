# 🍃 TreeHealthy — AI Health Planner

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-Latest-000000?style=flat&logo=shadcnui)](https://ui.shadcn.com/)

**TreeHealthy** adalah aplikasi _health planning_ berbasis web yang dirancang untuk membantu pengguna mengelola dan memantau gaya hidup sehat. Aplikasi ini mengimplementasikan prinsip kampanye kesehatan nasional **CERDIK** (Cek kesehatan berkala, Enyahkan asap rokok, Rajin aktivitas fisik, Diet seimbang, Istirahat cukup, dan Kelola stres) guna menekan serta menurunkan risiko Penyakit Tidak Menular (PTM) seperti hipertensi, diabetes, dan penyakit jantung.

---

## 🚀 Tech Stack

Aplikasi ini dibangun menggunakan ekosistem modern React:

- **Core & Build Tool:** React.js, Vite
- **Language:** JavaScript (ES6+)
- **Styling & Components:** Tailwind CSS, Shadcn/UI, Lucide / React Icons
- **Routing:** React Router DOM
- **Data Fetching & State Management:** Axios, React Query (TanStack Query)
- **Form & Validation:** React Hook Form, Zod
- **UI Feedback:** Sonner (Toast notifications)

---

## 📋 Prasyarat (Prerequisites)

Sebelum menjalankan proyek ini secara lokal, pastikan Anda telah menginstal:

- **Node.js:** Versi `^18.0.0` atau `^20.0.0` (Sangat disarankan versi LTS).
- **Package Manager:** `npm` (Bawaan Node.js).

Cek versi Node.js yang terinstal melalui terminal:

```bash
node -v
```

---

## 🛠️ Panduan Instalasi & Jalankan Lokal

Ikuti langkah-langkah berikut untuk menginstalasi dan menjalankan aplikasi di lingkungan pengembangan lokal:

### 1. Clone Repositori

```bash
git clone [https://github.com/username/treehealthy-fe.git](https://github.com/username/treehealthy-fe.git)
cd treehealthy-fe
```

### 2. Instal Dependencies

```bash
npm install
```

### 3. Setup Environment Variable

Buat file `.env` di direktori utama (_root_) proyek, lalu sesuaikan dengan konfigurasi API Backend Anda:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 4. Jalankan Server Development

```bash
npm run dev
```

Buka browser Anda di http://localhost:5173 (atau port yang tertera pada terminal).

## 🏗️ Perintah Utama (Scripts)

| Perintah          | Deskripsi                                                        |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Menjalankan server lokal _development_ dengan HMR.               |
| `npm run build`   | Melakukan proses _compilation/build_ produksi ke folder `/dist`. |
| `npm run preview` | Mempratinjau hasil _build_ produksi secara lokal.                |
| `npm run lint`    | Mengecek _code quality_ dan aturan sintaks JavaScript/React.     |

---

## 📌 Fitur Utama Aplikasi

- **Health Assessment (Kuesioner CERDIK):** Penilaian risiko PTM berbasis standar kesehatan masyarakat.
- **Personalized Dashboard:** Ringkasan status fisik dasar (IMT, riwayat PTM keluarga, aktivitas harian).
- **Health Analytics & Journey Log:** Monitoring perkembangan kesehatan dan log harian pengguna.
- **Settings & Profile Management:** Pengaturan data pribadi fisik pengguna dengan integrasi pembaruan _real-time_ (`last_update`).

---

## 📄 Lisensi

Proyek ini dikembangkan untuk kebutuhan internal / publikasi terbatas **TreeHealthy Health Planner**.
