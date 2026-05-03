import { useAdminData } from "@/hooks/useAdminData";

export default function Admin() {
  const { rows, loading, totalInvitedPeople } = useAdminData();

  if (loading) {
    return <div className="p-10 text-center text-[#3d2b1f]/60">Se încarcă dashboard...</div>;
  }

  const total = rows.length;
  const confirmed = rows.filter((r) => r.status === "confirmed").length;
  const declined = rows.filter((r) => r.status === "declined").length;
  const pending = rows.filter((r) => r.status === "pending").length;

  const totalAttending = rows.reduce((sum, r) => sum + r.attendingCount, 0);

  const attendanceRate = Math.round((totalAttending / totalInvitedPeople) * 100);

  return (
    <div className="min-h-screen bg-[#f4f1ea] p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-[32px] text-[#3d2b1f]">Admin Dashboard</h1>
      </div>

      {/* STATS */}
      <div className="mb-10 grid grid-cols-4 gap-4">
        <Stat label="Total" value={total} />
        <Stat label="Confirmate" value={confirmed} />
        <Stat label="Refuzuri" value={declined} />
        <Stat label="Fără răspuns" value={pending} />
        <Stat label="Invitați total" value={totalInvitedPeople} />
        <Stat label="Prezență %" value={attendanceRate} />
      </div>

      {/* TABLE */}
      <div className="border border-black/5 bg-white/60">
        {rows.map((r) => (
          <div
            key={r.groupId}
            className="grid grid-cols-5 border-b border-black/5 px-4 py-3 text-[14px]"
          >
            <div>{r.familyLabel}</div>
            <div>{r.invitedCount}</div>
            <div>{r.attendingCount}</div>
            <div>{r.status}</div>
            <div>{r.needsTransport ? "🚌" : "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  const isPercentage = label.includes("%");
  return (
    <div className="border border-black/5 bg-white/60 p-4 text-center">
      <div className="text-[12px] uppercase tracking-[0.2em] text-[#6b1f2b]/50">{label}</div>
      <div className="text-[24px] text-[#3d2b1f]">
        {value}
        {isPercentage && "%"}
      </div>
    </div>
  );
}
