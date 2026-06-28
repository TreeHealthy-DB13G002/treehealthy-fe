import { useState } from "react";
import { FiMoreVertical, FiEye, FiCheckCircle, FiAlertCircle, FiInbox } from "react-icons/fi";
import JourneyHeader from "../components/JourneyHeader";
import JourneyStats from "../components/JourneyStats";
import StatusBadge from "../components/StatusBadge";
import { weeklyMasterLogs } from "../data/journeyLogsData";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function JourneyListView({ onWeekSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const safeLogs = weeklyMasterLogs || [];
  const hasData = safeLogs.length > 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = safeLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(safeLogs.length / itemsPerPage);

  return (
    <div className="space-y-6 text-left">
      <JourneyHeader title="Journey Log" subtitle="Day-by-day record of your health task execution" />
      <JourneyStats data={safeLogs} isDetailView={false} />

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
              {hasData ? (
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
                      <ActionDropdown status={log.status} onDetail={() => onWeekSelect({ id: log.id, cycle: log.cycle, risk: log.ptmRisk })} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                /* 🟢 DESKTOP EMPTY STATE CONDITION */
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-14 text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiInbox className="h-8 w-8 text-slate-300" />
                      <p className="text-sm font-bold text-slate-400">Belum ada rekaman siklus mingguan.</p>
                      <p className="text-2xs text-slate-400/80 font-medium">Data evaluasi kesehatan berkala Anda akan muncul di sini.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARDS LAYOUT */}
        <div className="block md:hidden space-y-3">
          {hasData ? (
            currentItems.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-border bg-brand-white shadow-3xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-brand-secondary">{log.cycle}</span>
                  <ActionDropdown status={log.status} onDetail={() => onWeekSelect({ id: log.id, cycle: log.cycle, risk: log.ptmRisk })} />
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
            /* 🟢 MOBILE EMPTY STATE CONDITION */
            <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-200 text-slate-400 bg-slate-50/40">
              <FiInbox className="h-7 w-7 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-400">Belum ada rekaman mingguan.</p>
            </div>
          )}
        </div>

        {/* PAGINATION PANEL (Hanya muncul jika datanya ada, bro!) */}
        {hasData && (
          <div className="flex items-center justify-between pt-4 border-t border-border mt-5">
            <p className="text-xs font-semibold text-slate-400">
              Showing <span>{indexOfFirstItem + 1}</span> to <span>{Math.min(indexOfLastItem, safeLogs.length)}</span> of <span>{safeLogs.length}</span> logs
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
    </div>
  );
}

function ActionDropdown({ status, onDetail }) {
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
          <DropdownMenuItem className="flex items-center gap-2 text-xs font-bold text-brand-success cursor-pointer rounded-lg px-3 py-2 focus:bg-emerald-50 focus:text-brand-success">
            <FiCheckCircle size={14} /> Hasil Eval
          </DropdownMenuItem>
        )}
        {status === "Butuh Evaluasi" && (
          <DropdownMenuItem className="flex items-center gap-2 text-xs font-bold text-[#d97706] cursor-pointer rounded-lg px-3 py-2 focus:bg-amber-50 focus:text-[#d97706]">
            <FiAlertCircle size={14} /> Isi Eval
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
