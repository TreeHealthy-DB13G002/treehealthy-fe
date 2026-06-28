import JourneyHeader from "../components/JourneyHeader";
import JourneyStats from "../components/JourneyStats";
import StatusBadge from "../components/StatusBadge";
import { dailyDetailLogs } from "../data/journeyLogsData";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function JourneyDetailView({ weekId, weekName, weekRisk, onBack }) {
  const logs = dailyDetailLogs[weekId] || [];

  return (
    <div className="space-y-6 text-left">
      <JourneyHeader title={`Detail Journey Log ${weekName}`} subtitle={`Daftar pemantauan pilar kesehatan - Kategori Risiko: ${weekRisk}`} showBackButton={true} onBack={onBack} />
      <JourneyStats data={logs} isDetailView={true} weekRisk={weekRisk} />

      <div className="card-base border border-border bg-brand-white">
        {/* DESKTOP TABLE WITH ADAPTIVE 7/8 TASK INDICATORS */}
        <div className="hidden md:block rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-brand-bg">
              <TableRow>
                <TableHead className="font-bold text-brand-secondary">Tanggal</TableHead>
                <TableHead className="font-bold text-brand-secondary">Hari</TableHead>
                <TableHead className="font-bold text-brand-secondary">Progress Indikator Pilar ({weekRisk === "Rendah" ? "7" : "8"} Task)</TableHead>
                <TableHead className="font-bold text-brand-secondary text-center">Rasio Kepatuhan</TableHead>
                <TableHead className="font-bold text-brand-secondary">Status Hari</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log) => {
                  const doneCount = log.tasks.filter(Boolean).length;
                  const totalTasks = log.tasks.length;

                  return (
                    <TableRow key={log.id} className="hover:bg-slate-50/60 transition-colors">
                      <TableCell className="font-medium text-brand-text">{log.date}</TableCell>
                      <TableCell className="text-brand-secondary font-bold">{log.day}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 py-1">
                          {log.tasks.map((isDone, idx) => (
                            <span
                              key={idx}
                              className={`h-3 w-3 rounded-full border transition-all ${isDone ? "bg-brand-success border-emerald-300 shadow-3xs" : "bg-slate-100 border-slate-300"}`}
                              title={`Pilar ke-${idx + 1}: ${isDone ? "Terpenuhi" : "Dilewatkan"}`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-extrabold text-brand-text">
                        {doneCount} <span className="text-slate-400 font-medium">/ {totalTasks} task</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={log.status} type="daily" />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-sm text-slate-400 font-bold">
                    Belum ada rekaman data harian untuk minggu ini.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARDS LAYOUT */}
        <div className="block md:hidden space-y-3">
          {logs.length > 0 ? (
            logs.map((log) => {
              const doneCount = log.tasks.filter(Boolean).length;
              return (
                <div key={log.id} className="p-4 rounded-xl border border-border bg-brand-white shadow-3xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">
                      {log.date} ({log.day})
                    </span>
                    <StatusBadge status={log.status} type="daily" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-1">
                      {log.tasks.map((isDone, idx) => (
                        <span key={idx} className={`h-2.5 w-2.5 rounded-full ${isDone ? "bg-brand-success" : "bg-slate-200"}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-brand-secondary">
                      {doneCount} / {log.tasks.length} Done
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-4 text-xs text-slate-400 font-bold">Belum ada rekaman harian.</p>
          )}
        </div>
      </div>
    </div>
  );
}
