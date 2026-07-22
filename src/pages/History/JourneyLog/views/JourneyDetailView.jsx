import { useState, useEffect } from "react";
import { FiInbox } from "react-icons/fi";
import JourneyHeader from "../components/JourneyHeader";
import JourneyStats from "../components/JourneyStats";
import StatusBadge from "../components/StatusBadge";
import { journeyService } from "@/services/journeyLogServices";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function JourneyDetailView({ weekId, weekName, weekRisk, onBack }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ─── 🌟 FETCH DETAIL DAILY LOGS DARI API ───
  useEffect(() => {
    async function fetchDetailLogs() {
      setIsLoading(true);
      try {
        const response = await journeyService.getDetail(weekId);
        const data = response?.data || response;
        const dailyList = Array.isArray(data) ? data : data?.dailyLogs || data?.logs || [];
        setLogs(dailyList);
      } catch (error) {
        console.error("Gagal mengambil detail journey log:", error);
        setLogs([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (weekId) {
      fetchDetailLogs();
    }
  }, [weekId]);

  return (
    <div className="space-y-6 text-left">
      <JourneyHeader title={`Detail Log ${weekName}`} subtitle={`Daftar pemantauan pilar kesehatan - Kategori Risiko: ${weekRisk}`} showBackButton={true} onBack={onBack} />
      <JourneyStats data={logs} isDetailView={true} weekRisk={weekRisk} />

      <div className="card-base border border-border bg-brand-white">
        {/* DESKTOP TABLE WITH ADAPTIVE 7/8 TASK INDICATORS */}
        <div className="hidden md:block rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-brand-bg">
              <TableRow>
                <TableHead className="font-bold text-brand-secondary">Tanggal</TableHead>
                <TableHead className="font-bold text-brand-secondary">Hari</TableHead>
                <TableHead className="font-bold text-brand-secondary">Progres Indikator Pilar ({weekRisk === "Rendah" ? "7" : "8"} Tugas)</TableHead>
                <TableHead className="font-bold text-brand-secondary text-center">Rasio Kepatuhan</TableHead>
                <TableHead className="font-bold text-brand-secondary">Status Hari</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-xs font-semibold text-slate-400">
                    Memuat data detail harian...
                  </TableCell>
                </TableRow>
              ) : logs.length > 0 ? (
                logs.map((log) => {
                  const tasksList = log.tasks || [];
                  const doneCount = tasksList.filter(Boolean).length;
                  const totalTasks = tasksList.length;

                  return (
                    <TableRow key={log.id || log.date} className="hover:bg-slate-50/60 transition-colors">
                      <TableCell className="font-medium text-brand-text">{log.date}</TableCell>
                      <TableCell className="text-brand-secondary font-bold">{log.day}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 py-1">
                          {tasksList.map((isDone, idx) => (
                            <span
                              key={idx}
                              className={`h-3 w-3 rounded-full border transition-all ${isDone ? "bg-brand-success border-emerald-300 shadow-3xs" : "bg-slate-100 border-slate-300"}`}
                              title={`Pilar ke-${idx + 1}: ${isDone ? "Terpenuhi" : "Dilewatkan"}`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-extrabold text-brand-text">
                        {doneCount} <span className="text-slate-400 font-medium">/ {totalTasks} tugas</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={log.status} type="daily" />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                /* 🌟 EMPTY STATE DENGAN TABLE CELL WRAPPER SHADCN UI */
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-2.5 bg-slate-50 rounded-full border border-slate-100 text-slate-400">
                        <FiInbox size={20} />
                      </div>
                      <p className="text-sm font-bold text-slate-400">Belum ada rekaman data harian untuk minggu ini.</p>
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
            <p className="text-center py-4 text-xs font-semibold text-slate-400">Memuat rincian...</p>
          ) : logs.length > 0 ? (
            logs.map((log) => {
              const tasksList = log.tasks || [];
              const doneCount = tasksList.filter(Boolean).length;
              return (
                <div key={log.id || log.date} className="p-4 rounded-xl border border-border bg-brand-white shadow-3xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">
                      {log.date} ({log.day})
                    </span>
                    <StatusBadge status={log.status} type="daily" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-1">
                      {tasksList.map((isDone, idx) => (
                        <span key={idx} className={`h-2.5 w-2.5 rounded-full ${isDone ? "bg-brand-success" : "bg-slate-200"}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-brand-secondary">
                      {doneCount} / {tasksList.length} Selesai
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            /* 🌟 EMPTY STATE MOBILE */
            <div className="text-center py-8 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-1">
              <FiInbox className="mx-auto h-5 w-5 text-slate-300" />
              <p className="text-xs font-bold text-slate-400">Belum ada rekaman harian.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
