import type { AdminGuest, AdminRow } from "@/types/admin";
import { useEffect, useMemo, useState } from "react";

const DIETARY = ["none", "vegetarian", "vegan", "gluten-free", "other"];

export default function EditRsvpModal({ row, onClose, onSave }: any) {
  const [form, setForm] = useState<AdminRow | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (row) setForm(row);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row?.groupId]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const guests = useMemo(() => form?.guests ?? [], [form]);
  const extraGuests = useMemo(() => form?.extraGuests ?? [], [form]);

  const maxGuests = form?.maxGuests ?? form?.invitedCount ?? 0;

  const allGuests = [...guests, ...extraGuests];

  const attendingCount = allGuests.filter((g) => g.attending).length;

  const status =
    attendingCount === 0
      ? "declined"
      : attendingCount === allGuests.length
        ? "confirmed"
        : "pending";

  if (!form) return null;

  function updateGuest(list: "guests" | "extraGuests", i: number, updated: AdminGuest) {
    const target = list === "guests" ? guests : extraGuests;
    const updatedList = [...target];
    updatedList[i] = updated;

    setForm((p) => (p ? { ...p, [list]: updatedList } : p));
  }

  function addExtraGuest() {
    if (allGuests.length >= maxGuests) return;

    setForm((p) =>
      p
        ? {
            ...p,
            extraGuests: [
              ...extraGuests,
              {
                id: `extra-${Date.now()}`,
                name: "Invitat nou",
                attending: true,
                dietary: "none",
              },
            ],
          }
        : p,
    );
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-[600px] bg-[#f4f1ea] p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-2 text-lg">{form.familyLabel}</h2>

        <div className="mb-4 flex justify-between text-sm">
          <span>
            {attendingCount} / {maxGuests}
          </span>
          <span>{status}</span>
        </div>

        {/* MAIN GUESTS */}
        <div className="mb-4">
          <h3 className="text-xs uppercase">Invitați</h3>

          {guests.map((g, i) => (
            <div key={g.id} className="mt-2 flex gap-2">
              <span className="flex-1">{g.name}</span>

              <input
                aria-label="checkbox"
                type="checkbox"
                checked={g.attending}
                onChange={(e) => updateGuest("guests", i, { ...g, attending: e.target.checked })}
              />

              <select
                title="options dietary"
                value={g.dietary || "none"}
                onChange={(e) => updateGuest("guests", i, { ...g, dietary: e.target.value })}
              >
                {DIETARY.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* EXTRA GUESTS */}
        <div>
          <h3 className="text-xs uppercase">Extra</h3>

          {extraGuests.map((g, i) => (
            <div key={g.id} className="mt-2 flex gap-2">
              <input
                aria-label="checkbox extraguest"
                value={g.name}
                onChange={(e) => updateGuest("extraGuests", i, { ...g, name: e.target.value })}
                className="border px-2"
              />

              <input
                aria-label="checkbox"
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
                title="dietary optionss"
                value={g.dietary || "none"}
                onChange={(e) => updateGuest("extraGuests", i, { ...g, dietary: e.target.value })}
              >
                {DIETARY.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <button onClick={() => removeExtraGuest(i)}>✕</button>
            </div>
          ))}

          <button onClick={addExtraGuest} className="mt-2 text-xs underline">
            + Add guest
          </button>
        </div>

        {/* TRANSPORT */}
        <div className="mt-4">
          <select
            title="transport options"
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
          >
            <option value="none">No transport</option>
            <option value="bus">Bus</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

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
            className="border px-3 py-1"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
