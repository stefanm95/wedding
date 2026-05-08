/* eslint-disable react-hooks/set-state-in-effect */
import type { AdminGuest, AdminRow } from "@/types/admin";
import { useEffect, useMemo, useRef, useState } from "react";

const DIETARY = ["none", "vegetarian", "vegan", "menu-copii", "other"];

export default function EditRsvpModal({ row, onClose, onSave }: any) {
  const [form, setForm] = useState<AdminRow | null>(null);
  const lastExtraRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    if (!row) return;

    setForm({
      ...row,

      // ✅ ensure transport fallback
      transport: row.transport ?? {
        type: row.needsTransport ? "bus" : "none",
      },

      // ✅ ensure guests default checked
      guests: (row.guests || []).map((g: AdminGuest) => ({
        ...g,
        attending: g.attending ?? true,
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row?.groupId]);

  /* ---------------- ESC ---------------- */

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  /* ---------------- DERIVED ---------------- */

  const guests = useMemo(() => form?.guests ?? [], [form]);
  const extraGuests = useMemo(() => form?.extraGuests ?? [], [form]);

  const maxGuests = form?.maxGuests ?? form?.invitedCount ?? 0;

  // ✅ core guests define RSVP status
  const coreAttending = guests.filter((g) => g.attending).length;

  // ✅ total count still includes extras (for display/stats)
  const attendingCount = coreAttending + extraGuests.filter((g) => g.attending).length;
  const totalGuests = guests.length + extraGuests.length;

  const status =
    coreAttending === 0 ? "declined" : coreAttending === guests.length ? "confirmed" : "pending";

  if (!form) return null;

  /* ---------------- HELPERS ---------------- */

  function updateGuest(list: "guests" | "extraGuests", i: number, updated: AdminGuest) {
    const target = list === "guests" ? guests : extraGuests;
    const updatedList = [...target];
    updatedList[i] = updated;

    setForm((p) => (p ? { ...p, [list]: updatedList } : p));
  }

  function addExtraGuest() {
    if (totalGuests >= maxGuests) return;

    const newGuest = {
      id: `extra-${Date.now()}`,
      name: "",
      attending: true,
      dietary: "none",
      transport: {
        type: "none",
      },
    };

    setForm((p) =>
      p
        ? {
            ...p,
            extraGuests: [...extraGuests, newGuest],
          }
        : p,
    );

    // ✅ focus after render
    setTimeout(() => {
      lastExtraRef.current?.focus();
    }, 0);
  }

  function removeExtraGuest(i: number) {
    setForm((p) =>
      p
        ? {
            ...p,
            extraGuests: extraGuests.filter((_, idx) => idx !== i),
          }
        : p,
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-xl rounded-xl bg-[#f4f1ea] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">{form.familyLabel}</h2>

          <span className="text-sm opacity-70">
            {coreAttending} / {maxGuests} • {status}
          </span>
        </div>

        {/* MAIN GUESTS */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs uppercase tracking-wide opacity-60">Invitați</h3>

          <div className="space-y-2">
            {guests.map((g, i) => (
              <div key={g.id} className="flex items-center gap-3">
                <input
                  aria-label="main-checkbox"
                  type="checkbox"
                  checked={g.attending}
                  onChange={(e) => updateGuest("guests", i, { ...g, attending: e.target.checked })}
                />

                <span className="flex-1">{g.name}</span>

                <select
                  aria-label="dietary-options"
                  value={g.dietary || "none"}
                  onChange={(e) => updateGuest("guests", i, { ...g, dietary: e.target.value })}
                  className="border px-2 py-1 text-sm"
                >
                  {DIETARY.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA GUESTS */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs uppercase tracking-wide opacity-60">Extra guests</h3>

          <div className="space-y-2">
            {extraGuests.map((g, i) => (
              <div key={g.id} className="flex items-center gap-2">
                <input
                  ref={i === extraGuests.length - 1 ? lastExtraRef : null}
                  value={g.name}
                  onChange={(e) => updateGuest("extraGuests", i, { ...g, name: e.target.value })}
                  placeholder="Nume invitat"
                  className="flex-1 border px-2 py-1"
                  aria-label="extra-guest-name"
                />

                <input
                  aria-label="extraG-checkbox"
                  type="checkbox"
                  checked={g.attending}
                  onChange={(e) =>
                    updateGuest("extraGuests", i, {
                      ...g,
                      attending: e.target.checked,
                    })
                  }
                />

                <select
                  title="d-options"
                  value={g.dietary || "none"}
                  onChange={(e) => updateGuest("extraGuests", i, { ...g, dietary: e.target.value })}
                  className="border px-2 py-1 text-sm"
                >
                  {DIETARY.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                <button onClick={() => removeExtraGuest(i)} className="px-2 text-red-500">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addExtraGuest}
            className="mt-3 text-xs underline opacity-70 hover:opacity-100"
          >
            + Add guest
          </button>
        </div>

        {/* TRANSPORT */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs uppercase tracking-wide opacity-60">Transport</h3>

          <select
            title="t-options"
            value={form.transport?.type || "none"}
            onChange={(e) =>
              setForm((p) =>
                p
                  ? {
                      ...p,
                      transport: { type: e.target.value as any },
                      needsTransport: e.target.value !== "none",
                    }
                  : p,
              )
            }
            className="border px-3 py-1"
          >
            <option value="none">No transport</option>
            <option value="bus">Bus</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-sm opacity-70">
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                ...form,
                guests,
                extraGuests,
                attendingCount,
                status,
              })
            }
            className="rounded border px-4 py-1 text-sm hover:bg-black/5"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
