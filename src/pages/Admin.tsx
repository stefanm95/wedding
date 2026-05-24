import EditRsvpModal from "@/components/EditRsvpModal";
import { exportWorkbook } from "@/domain/rsvp/export";
import { getRsvpMetrics } from "@/domain/rsvp/metrics";
import { getAttendingCount, getStatus, getTransportCount } from "@/domain/rsvp/selectors";
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

  const filteredRows = useMemo(() => {
    return filter === "all" ? sourceRows : sourceRows.filter((row) => getStatus(row) === filter);
  }, [sourceRows, filter]);

  async function handleSave(updated: AdminRow) {
    const previous = sourceRows;

    if (!localRows.length) {
      setLocalRows(rows);
    }

    setLocalRows((prev) =>
      (prev.length ? prev : rows).map((row) => (row.groupId === updated.groupId ? updated : row)),
    );

    setSelectedRow(null);

    try {
      await updateRsvpAdmin(updated);
    } catch (err) {
      console.error("Update failed", err);
      setLocalRows(previous);
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-[#3d2b1f]/60">Se încarcă dashboard...</div>;
  }

  const {
    totalGroups,
    confirmedGroups,
    declinedGroups,
    pendingGroups,
    respondedGroups,
    totalAttendingPeople,
    transportPeople,
    occupancy,
  } = getRsvpMetrics(sourceRows);

  return (
    <div className="min-h-screen bg-[#f7f4ef] px-6 py-10 md:px-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-[34px] font-light tracking-tight text-[#2c1e18]">Admin Dashboard</h1>
          <p className="text-sm text-black/40">Overview & RSVP management</p>
        </div>

        <button
          onClick={() => exportWorkbook(sourceRows)}
          className="rounded-md border border-[#c9a46c] px-5 py-2 text-xs tracking-wide transition hover:bg-[#c9a46c]/10"
        >
          Export Excel
        </button>
      </div>

      <div className="mb-8 flex gap-2">
        {["all", "confirmed", "declined", "pending"].map((filterName) => (
          <button
            key={filterName}
            onClick={() => setFilter(filterName as typeof filter)}
            className={`rounded-full px-4 py-1.5 text-xs transition ${
              filter === filterName
                ? "bg-[#c9a46c] text-white"
                : "bg-black/5 text-black/60 hover:bg-black/10"
            }`}
          >
            {filterName}
          </button>
        ))}
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <Stat label="Total" value={totalGroups} />
        <Stat label="Confirmate" value={confirmedGroups} />
        <Stat label="Refuzuri" value={declinedGroups} />
        <Stat label="Fără răspuns" value={pendingGroups} />
        <Stat label="Invitați total" value={totalInvitedPeople} />
        <Stat label="Persoane confirmate" value={totalAttendingPeople} />
        <Stat label="Răspunsuri" value={respondedGroups} />
        <Stat label="Bus" value={transportPeople} />
        <Stat label="Prezență" value={occupancy} />
      </div>

      <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="grid grid-cols-5 border-b bg-black/[0.02] px-6 py-3 text-[11px] uppercase tracking-wider text-black/40">
          <div>Familie</div>
          <div>Invitați</div>
          <div>Confirmați</div>
          <div>Status</div>
          <div>Transport</div>
        </div>

        <div>
          {filteredRows.map((row) => {
            const busGuests = getTransportCount(row);
            const status = getStatus(row);

            return (
              <div
                key={row.groupId}
                onClick={() => setSelectedRow(row)}
                className="grid cursor-pointer grid-cols-5 items-center px-6 py-3 text-sm transition hover:bg-[#f4f1ea]"
              >
                <div className="font-medium text-[#2c1e18]">{row.familyLabel}</div>
                <div className="text-black/70">{row.invitedCount}</div>
                <div className="text-black/70">{getAttendingCount(row)}</div>
                <div>
                  <StatusBadge status={status} />
                </div>
                <div className="text-sm text-black/70">
                  {busGuests > 0 ? `🚌 ${busGuests}` : "—"}
                </div>
              </div>
            );
          })}
        </div>
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
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}
