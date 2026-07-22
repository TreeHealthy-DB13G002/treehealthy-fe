import { useState, useEffect, useCallback } from "react";
import { FiMoreVertical, FiEye, FiCheckCircle, FiAlertCircle, FiInbox } from "react-icons/fi";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import JourneyHeader from "../components/JourneyHeader";
import JourneyStats from "../components/JourneyStats";
import StatusBadge from "../components/StatusBadge";
import { journeyService } from "@/services/journeyLogServices";

// 🌟 IMPORT KEDUA MODAL (Hasil & Formulir Pengisian)
import FeedbackModal from "@/pages/Dashboard/components/FeedbackModal";
import FeedbackResultModal from "../components/FeedbackResultModal";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function JourneyListView({ onWeekSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ─── 🌟 STATE DATA DARI BACKEND ───
  const [logs, setLogs] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    avgCompliance: "0%",
    completedWeeks: 0,
    evaluationsNeeded: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // ─── 🌟 STATE KONTROL ALUR MODAL ───
  const [selectedEvalLog, setSelectedEvalLog] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [selectedFillLog, setSelectedFillLog] = useState(null);
  const [isFillModalOpen, setIsFillModalOpen] = useState(false);

  // ─── 🌟 FETCH DATA SUMMARIES DARI API ───
  const fetchSummaryLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await journeyService.getSummary();
      // Mengambil data siklus mingguan dan statistik global dari response backend
      const data = response?.data || response;
      const logsList = data?.logs || data?.weeklyLogs || (Array.isArray(data) ? data : []);

      setLogs(logsList);
      if (data?.stats) {
        setGlobalStats(data.stats);
      }
    } catch (error) {
      console.error("Gagal mengambil data journey log summary:", error);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummaryLogs();
  }, [fetchSummaryLogs]);

  const safeLogs = logs || [];
  const hasData = safeLogs.length > 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = safeLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(safeLogs.length / itemsPerPage) || 1;

  // Callback sukses mengisi evaluasi dari modal
  const handleFillSubmitSuccess = (userData) => {
    console.log("Evaluasi mingguan berhasil disubmit dari Journey Log:", userData);
    setIsFillModalOpen(false);
    setSelectedFillLog(null);
    fetchSummaryLogs(); // Refresh data setelah submit
  };

  return (
    <div className="space-y-6 text-left">
      <JourneyHeader title="Log Riwayat Program" subtitle="Catatan harian dari pelaksanaan aktivitas dan misi kesehatan Anda" />
      <JourneyStats data={safeLogs} isDetailView={false} globalStats={globalStats} />

      <div className="card-base border border-border bg-brand-white">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-brand-bg">
              <TableRow>
                <TableHead className="font-bold text-brand-secondary">Siklus Mingguan</TableHead>
                <TableHead className="font-bold text-brand-secondary">Rentang Tanggal</TableHead>
                <TableHead className="font-bold text-brand-secondary">Kategori Risiko</TableHead>
                <TableHead className="font-bold text-brand-secondary">Tingkat Kepatuhan</TableHead>
                <TableHead className="font-bold text-brand-secondary">Status Siklus</TableHead>
                <TableHead className="font-bold text-brand-secondary">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-14 text-slate-400 font-medium">
                    Memuat catatan rekam jejak...
                  </TableCell>
                </TableRow>
              ) : hasData ? (
                currentItems.map((log) => (
                  <TableRow key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell className="font-bold text-brand-secondary">{log.cycle}</TableCell>
                    <TableCell className="text-brand-text font-medium">{log.dateRange}</TableCell>
                    <TableCell>
                      <StatusBadge status={log.ptmRisk} type="risk" />
                    </TableCell>
                    <TableCell className="font-semibold text-brand-text">{log.compliance}</TableCell>
                    <TableCell>
                      <StatusBadge status={log.status} type="weekly" />
                    </TableCell>
                    <TableCell>
                      <ActionDropdown
                        status={log.status}
                        onDetail={() => onWeekSelect({ id: log.id, cycle: log.cycle, risk: log.ptmRisk })}
                        onOpenResult={() => {
                          setSelectedEvalLog(log);
                          setIsResultModalOpen(true);
                        }}
                        onOpenFill={() => {
                          setSelectedFillLog(log);
                          setIsFillModalOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                /* 🌟 EMPTY STATE MENGGUNAKAN WRAPPER TABEL SHADCN UI */
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-14">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-3 bg-slate-50 rounded-full border border-slate-100 text-slate-400">
                        <FiInbox size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-500">Belum ada rekaman siklus mingguan.</p>
                      <p className="text-xs text-slate-400 max-w-sm">Data riwayat pelaksanaan aktivitas dan evaluasi kesehatan Anda akan tampil di sini.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARDS LAYOUT */}
        <div className="block md:hidden space-y-3">
          {isLoading ? (
            <div className="text-center py-10 px-4 text-xs font-semibold text-slate-400">Memuat data...</div>
          ) : hasData ? (
            currentItems.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-border bg-brand-white shadow-3xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-brand-secondary">{log.cycle}</span>
                  <ActionDropdown
                    status={log.status}
                    onDetail={() => onWeekSelect({ id: log.id, cycle: log.cycle, risk: log.ptmRisk })}
                    onOpenResult={() => {
                      setSelectedEvalLog(log);
                      setIsResultModalOpen(true);
                    }}
                    onOpenFill={() => {
                      setSelectedFillLog(log);
                      setIsFillModalOpen(true);
                    }}
                  />
                </div>
                <p className="text-xs font-semibold text-slate-400">{log.dateRange}</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      Risiko: <StatusBadge status={log.ptmRisk} type="risk" />
                    </div>
                    <p className="text-xs font-semibold text-slate-400">{log.compliance}</p>
                  </div>
                  <StatusBadge status={log.status} type="weekly" />
                </div>
              </div>
            ))
          ) : (
            /* 🌟 EMPTY STATE MOBILE */
            <Empty className="py-8 my-auto flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-brand-secondary flex items-center justify-center mb-2">
                <FiInbox size={24} />
              </div>
              <EmptyTitle className="text-sm font-bold text-slate-700">Belum ada rekaman siklus mingguan.</EmptyTitle>
              <EmptyDescription className="text-xs text-slate-400 max-w-xs">Data riwayat pelaksanaan aktivitas dan evaluasi kesehatan Anda akan tampil di sini.</EmptyDescription>
            </Empty>
          )}
        </div>

        {/* PAGINATION PANEL */}
        {hasData && (
          <div className="flex items-center justify-between pt-4 border-t border-border mt-5">
            <p className="text-xs font-semibold text-slate-400">
              Menampilkan <span>{indexOfFirstItem + 1}</span> sampai <span>{Math.min(indexOfLastItem, safeLogs.length)}</span> dari <span>{safeLogs.length}</span> catatan
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-bold border-slate-200 text-brand-secondary cursor-pointer disabled:opacity-40"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-bold border-slate-200 text-brand-secondary cursor-pointer disabled:opacity-40"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ─── MODAL JALUR 1: LIHAT HASIL EVALUASI ─── */}
      <FeedbackResultModal
        isOpen={isResultModalOpen}
        onClose={() => {
          setIsResultModalOpen(false);
          setSelectedEvalLog(null);
        }}
        logData={selectedEvalLog}
      />

      {/* ─── MODAL JALUR 2: ISI FORM EVALUASI BARU ─── */}
      {isFillModalOpen && selectedFillLog && (
        <FeedbackModal
          isOpen={isFillModalOpen}
          onClose={() => {
            setIsFillModalOpen(false);
            setSelectedFillLog(null);
          }}
          isDay8CutOff={true}
          onSubmitSuccess={handleFillSubmitSuccess}
          currentWeek={parseInt(selectedFillLog.cycle.replace(/\D/g, "")) || 1}
          startDate={selectedFillLog.dateRange?.split(" - ")[0] || ""}
          endDate={selectedFillLog.dateRange?.split(" - ")[1] || ""}
          stats={{
            avgCompliance: parseInt(selectedFillLog.compliance) || 0,
            perfectDays: 0,
            riskDrop: 0,
          }}
        />
      )}
    </div>
  );
}

function ActionDropdown({ status, onDetail, onOpenResult, onOpenFill }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 focus:ring-0 focus:outline-hidden rounded-full cursor-pointer">
          <FiMoreVertical className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" position="popper" sideOffset={4} className="w-[155px] rounded-xl border border-slate-200 bg-brand-white shadow-md p-1">
        <DropdownMenuItem onClick={onDetail} className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer rounded-lg px-3 py-2 focus:bg-brand-bg focus:text-brand-primary">
          <FiEye size={14} /> Lihat Detail
        </DropdownMenuItem>

        {status === "Selesai" && (
          <DropdownMenuItem onClick={onOpenResult} className="flex items-center gap-2 text-xs font-bold text-brand-success cursor-pointer rounded-lg px-3 py-2 focus:bg-emerald-50 focus:text-brand-success">
            <FiCheckCircle size={14} /> Hasil Evaluasi
          </DropdownMenuItem>
        )}

        {status === "Butuh Evaluasi" && (
          <DropdownMenuItem onClick={onOpenFill} className="flex items-center gap-2 text-xs font-bold text-[#d97706] cursor-pointer rounded-lg px-3 py-2 focus:bg-amber-50 focus:text-[#d97706]">
            <FiAlertCircle size={14} /> Isi Evaluasi
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
