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

  const totalGroups = sourceRows.length;

  const totalMaxGuests = sourceRows.reduce((sum, r) => sum + (r.maxGuests ?? r.invitedCount), 0);

  const confirmedGroups = sourceRows.filter((r) => r.status === "confirmed").length;

  const declinedGroups = sourceRows.filter((r) => r.status === "declined").length;

  const pendingGroups = sourceRows.filter((r) => r.status === "pending").length;

  const respondedGroups = sourceRows.filter(
    (r) => r.status === "confirmed" || r.status === "declined",
  ).length;

  // 🔥 IMPORTANT: persoane reale
  const totalAttendingPeople = sourceRows.reduce((sum, r) => sum + r.attendingCount, 0);

  const needingTransport = sourceRows.filter((r) => r.needsTransport).length;

  const occupancy = `${totalAttendingPeople} / ${totalMaxGuests}`;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-[#f7f4ef] px-6 py-10 md:px-12">
      {/* HEADER */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-[34px] font-light tracking-tight text-[#2c1e18]">Admin Dashboard</h1>
          <p className="text-sm text-black/40">Overview & RSVP management</p>
        </div>

        <button
          onClick={() => exportCSV(sourceRows)}
          className="rounded-md border border-[#c9a46c] px-5 py-2 text-xs tracking-wide transition hover:bg-[#c9a46c]/10"
        >
          Export CSV
        </button>
      </div>

      {/* FILTER */}
      <div className="mb-8 flex gap-2">
        {["all", "confirmed", "declined", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`rounded-full px-4 py-1.5 text-xs transition ${
              filter === f
                ? "bg-[#c9a46c] text-white"
                : "bg-black/5 text-black/60 hover:bg-black/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <Stat label="Total" value={totalGroups} />
        <Stat label="Confirmate" value={confirmedGroups} />
        <Stat label="Refuzuri" value={declinedGroups} />
        <Stat label="Fără răspuns" value={pendingGroups} />
        <Stat label="Invitați total" value={totalInvitedPeople} />
        <Stat label="Persoane confirmate" value={totalAttendingPeople} />
        <Stat label="Răspunsuri" value={respondedGroups} />
        <Stat label="Transport" value={needingTransport} />
        <Stat label="Prezență" value={occupancy} />
      </div>

      {/* TABLE CONTAINER */}
      <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        {/* HEADER */}
        <div className="grid grid-cols-5 border-b bg-black/[0.02] px-6 py-3 text-[11px] uppercase tracking-wider text-black/40">
          <div>Familie</div>
          <div>Invitați</div>
          <div>Confirmați</div>
          <div>Status</div>
          <div>Transport</div>
        </div>

        {/* ROWS */}
        <div>
          {filteredRows.map((r) => (
            <div
              key={r.groupId}
              onClick={() => setSelectedRow(r)}
              className="grid cursor-pointer grid-cols-5 items-center px-6 py-3 text-sm transition hover:bg-[#f4f1ea]"
            >
              <div className="font-medium text-[#2c1e18]">{r.familyLabel}</div>

              <div className="text-black/70">{r.invitedCount}</div>

              <div className="text-black/70">{r.attendingCount}</div>

              <div>
                <StatusBadge status={r.status} />
              </div>

              <div className="text-lg">{r.needsTransport ? "🚌" : "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
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

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-black/5 bg-white px-4 py-5 text-center shadow-sm transition hover:shadow-md">
      <div className="text-[11px] uppercase tracking-wide text-black/40">{label}</div>
      <div className="mt-1 text-2xl font-light text-[#2c1e18]">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    confirmed: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-600",
    pending: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status as keyof typeof styles]}`}
    >
      {status}
    </span>
  );
}

function exportCSV(rows: AdminRow[]) {
  // ---------------- METRICS ----------------
  const totalGroups = rows.length;

  const totalMaxGuests = rows.reduce((sum, r) => sum + (r.maxGuests ?? r.invitedCount), 0);

  const confirmedGroups = rows.filter((r) => r.status === "confirmed").length;
  const declinedGroups = rows.filter((r) => r.status === "declined").length;
  const pendingGroups = rows.filter((r) => r.status === "pending").length;

  const respondedGroups = rows.filter(
    (r) => r.status === "confirmed" || r.status === "declined",
  ).length;

  const totalAttendingPeople = rows.reduce((sum, r) => sum + r.attendingCount, 0);

  const needingTransport = rows.filter((r) => r.needsTransport).length;

  const occupancy = `${totalAttendingPeople} / ${totalMaxGuests}`;

  // ---------------- SUMMARY ----------------
  const summary = [
    ["=== SUMMARY ==="],
    ["Total Groups", totalGroups],
    ["Confirmed Groups", confirmedGroups],
    ["Declined Groups", declinedGroups],
    ["Pending Groups", pendingGroups],
    ["Responded Groups", respondedGroups],
    ["Total Capacity", totalMaxGuests],
    ["Attending People", totalAttendingPeople],
    ["Occupancy", occupancy],
    ["Transport Needed", needingTransport],
    [], // empty row
  ];

  // ---------------- TABLE HEADER ----------------
  const header = [["Family", "Invited", "Max Guests", "Attending", "Status", "Transport"]];

  // ---------------- ROWS ----------------
  const data = rows.map((r) => [
    r.familyLabel,
    r.invitedCount,
    r.maxGuests ?? r.invitedCount,
    r.attendingCount,
    r.status,
    r.needsTransport ? "yes" : "no",
  ]);

  // ---------------- COMBINE ----------------
  const csvContent = [...summary, ...header, ...data].map((row) => row.join(",")).join("\n");

  // ---------------- DOWNLOAD ----------------
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "rsvp-report.csv";
  a.click();
}
