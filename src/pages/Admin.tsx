import EditRsvpModal from "@/components/EditRsvpModal";
import { useAdminData } from "@/hooks/useAdminData";
import { updateRsvpAdmin } from "@/services/updateRsvpAdmin";

import type { AdminRow } from "@/types/admin";
import { useMemo, useState } from "react";

export default function Admin() {
  const { rows, loading, totalInvitedPeople } = useAdminData();

  const [filter, setFilter] = useState<"all" | "confirmed" | "declined" | "pending">("all");
  const [selectedRow, setSelectedRow] = useState<AdminRow | null>(null);
  const [localRows, setLocalRows] = useState<AdminRow[]>([]);

  const sourceRows = localRows.length ? localRows : rows;

  /* ---------------- FILTER ---------------- */

  const filteredRows = useMemo(() => {
    return filter === "all" ? sourceRows : sourceRows.filter((r) => r.status === filter);
  }, [sourceRows, filter]);

  /* ---------------- SAVE ---------------- */

  async function handleSave(updated: AdminRow) {
    const previous = sourceRows;

    if (!localRows.length) setLocalRows(rows);

    setLocalRows((prev) =>
      (prev.length ? prev : rows).map((r) => (r.groupId === updated.groupId ? updated : r)),
    );

    setSelectedRow(null);

    try {
      await updateRsvpAdmin(updated); // ✅ FULL OBJECT
    } catch (err) {
      console.error("Update failed", err);
      setLocalRows(previous);
    }
  }

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return <div className="p-10 text-center text-[#3d2b1f]/60">Se încarcă dashboard...</div>;
  }

  /* ---------------- METRICS ---------------- */

  const total = sourceRows.length;
  const confirmed = sourceRows.filter((r) => r.status === "confirmed").length;
  const declined = sourceRows.filter((r) => r.status === "declined").length;
  const pending = sourceRows.filter((r) => r.status === "pending").length;

  const needingTransport = sourceRows.filter((r) => r.needsTransport).length;

  const totalAttending = sourceRows.reduce((sum, r) => sum + r.attendingCount, 0);

  const attendanceRate = totalInvitedPeople
    ? Math.round((totalAttending / totalInvitedPeople) * 100)
    : 0;

  const responseRate = total ? Math.round(((confirmed + declined) / total) * 100) : 0;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-[#f4f1ea] p-10">
      <div className="mb-10 flex justify-between">
        <h1 className="text-[32px] text-[#3d2b1f]">Admin Dashboard</h1>

        <button
          onClick={() => exportCSV(sourceRows)}
          className="border border-[#c9a46c] px-4 py-2 text-[12px]"
        >
          Export CSV
        </button>
      </div>

      {/* FILTER */}
      <div className="mb-6 flex gap-2">
        {["all", "confirmed", "declined", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`border px-3 py-1 text-xs ${
              filter === f ? "border-[#c9a46c] bg-[#c9a46c]/20" : "border-black/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        <Stat label="Total" value={total} />
        <Stat label="Confirmate" value={confirmed} />
        <Stat label="Refuzuri" value={declined} />
        <Stat label="Fără răspuns" value={pending} />
        <Stat label="Invitați" value={totalInvitedPeople} />
        <Stat label="Prezență %" value={attendanceRate} />
        <Stat label="Răspuns %" value={responseRate} />
        <Stat label="Transport" value={needingTransport} />
      </div>

      {/* TABLE */}
      <div className="border bg-white/60">
        <div className="grid grid-cols-5 px-4 py-3 text-xs uppercase text-[#6b1f2b]/60">
          <div>Familie</div>
          <div>Invitați</div>
          <div>Confirmati</div>
          <div>Status</div>
          <div>Transport</div>
        </div>

        {filteredRows.map((r) => (
          <div
            key={r.groupId}
            onClick={() => setSelectedRow(r)}
            className="grid cursor-pointer grid-cols-5 px-4 py-3 hover:bg-black/5"
          >
            <div>{r.familyLabel}</div>
            <div>{r.invitedCount}</div>
            <div>{r.attendingCount}</div>
            <div>
              <StatusBadge status={r.status} />
            </div>
            <div>{r.needsTransport ? "🚌" : "-"}</div>
          </div>
        ))}
      </div>

      <EditRsvpModal
        key={selectedRow?.groupId}
        row={selectedRow}
        onClose={() => setSelectedRow(null)}
        onSave={handleSave}
      />
    </div>
  );
}

/* ---------------- UI ---------------- */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border p-4 text-center">
      <div className="text-xs">{label}</div>
      <div className="text-xl">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    confirmed: "text-green-700",
    declined: "text-red-600",
    pending: "text-gray-500",
  };

  return <span className={styles[status as keyof typeof styles]}>{status}</span>;
}

function exportCSV(rows: AdminRow[]) {
  const csv = rows.map((r) =>
    [r.familyLabel, r.invitedCount, r.attendingCount, r.status].join(","),
  );

  const blob = new Blob([csv.join("\n")]);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "rsvp.csv";
  a.click();
}
