import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";

export default function JourneyHeader({ title, subtitle, showBackButton, onBack }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 text-left w-full">
      {/* Sisi Kiri: Judul & Subtitle (Posisinya dikunci) */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight truncate">{title}</h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 line-clamp-2 sm:line-clamp-1">{subtitle}</p>
      </div>

      {/* Sisi Kanan: Tombol Back (Hanya muncul jika showBackButton true) */}
      {showBackButton && (
        <Button
          variant="default"
          size="sm"
          onClick={onBack}
          className="self-start sm:self-center flex items-center gap-2 rounded-full shadow-sm bg-brand-primary hover:bg-brand-primary/90 text-brand-white cursor-pointer px-4 h-9 text-xs font-bold shrink-0 transition-colors border-0"
        >
          <FiArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Kembali</span>
        </Button>
      )}
    </div>
  );
}
