/* eslint-disable react-hooks/set-state-in-effect */

import { TRANSPORT_LOCATIONS, type TransportLocationId } from "@/data/transportOptions";
import { normalizeGuests } from "@/domain/rsvp/normalizers";
import {
  getAllGuests,
  getAttendingCount,
  getStatus,
  getTransportCount,
  withDerivedAdminFields,
} from "@/domain/rsvp/selectors";

import type { AdminGuest, AdminRow } from "@/types/admin";

import type { GuestTransport, TransportType } from "@/types/rsvp";

import { useEffect, useMemo, useRef, useState } from "react";

const DIETARY = ["none", "vegetarian", "vegan", "menu-copii", "other"] as const;

type Props = {
  row: AdminRow | null;
  onClose: () => void;
  onSave: (data: AdminRow) => void;
};

export default function EditRsvpModal({ row, onClose, onSave }: Props) {
  const [form, setForm] = useState<AdminRow | null>(null);

  const lastExtraRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    if (!row) return;

    setForm({
      ...row,

      guests: normalizeGuests(row.guests) as AdminGuest[],
      extraGuests: normalizeGuests(row.extraGuests) as AdminGuest[],
    });
  }, [row]);

  /* ---------------- ESC ---------------- */

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  /* ---------------- DERIVED ---------------- */

  const guests = useMemo(() => form?.guests ?? [], [form]);

  const extraGuests = useMemo(() => form?.extraGuests ?? [], [form]);

  const maxGuests = form?.maxGuests ?? form?.invitedCount ?? 0;

  const currentRow = { guests, extraGuests };
  const attendingCount = getAttendingCount(currentRow);
  const totalGuests = getAllGuests(currentRow).length;
  const status = getStatus(currentRow);
  const needsTransport = getTransportCount(currentRow) > 0;

  if (!form) return null;

  /* ---------------- HELPERS ---------------- */

  function updateGuest(list: "guests" | "extraGuests", index: number, updated: AdminGuest) {
    const target = list === "guests" ? guests : extraGuests;

    const updatedList = [...target];

    updatedList[index] = updated;

    setForm((prev) =>
      prev
        ? {
            ...prev,
            [list]: updatedList,
          }
        : prev,
    );
  }

  function updateGuestTransport(
    list: "guests" | "extraGuests",
    index: number,
    transport: GuestTransport,
  ) {
    const target = list === "guests" ? guests : extraGuests;

    const updatedList = [...target];

    updatedList[index] = {
      ...updatedList[index],
      transport,
    };

    setForm((prev) =>
      prev
        ? {
            ...prev,
            [list]: updatedList,
          }
        : prev,
    );
  }

  function addExtraGuest() {
    if (totalGuests >= maxGuests) {
      return;
    }

    const newGuest: any = {
      id: `extra-${Date.now()}`,
      name: "",
      attending: true,
      dietary: "none",

      transport: {
        type: "personal",
      },
    };

    setForm((prev) =>
      prev
        ? {
            ...prev,

            extraGuests: [...extraGuests, newGuest],
          }
        : prev,
    );

    setTimeout(() => {
      lastExtraRef.current?.focus();
    }, 0);
  }

  function removeExtraGuest(index: number) {
    setForm((prev) =>
      prev
        ? {
            ...prev,

            extraGuests: extraGuests.filter((_, i) => i !== index),
          }
        : prev,
    );
  }

  /* ---------------- RENDER GUEST ---------------- */

  function renderGuestCard(
    guest: any,
    index: number,
    list: "guests" | "extraGuests",
    isExtra = false,
  ) {
    return (
      <div key={guest.id} className="space-y-3 rounded-lg border border-black/10 bg-white/40 p-3">
        {/* TOP ROW */}
        <div className="flex items-center gap-3">
          <input
            aria-label="checkbox"
            type="checkbox"
            checked={guest.attending}
            onChange={(e) =>
              updateGuest(list, index, {
                ...guest,
                attending: e.target.checked,
              })
            }
          />

          {isExtra ? (
            <input
              ref={index === extraGuests.length - 1 ? lastExtraRef : null}
              value={guest.name}
              onChange={(e) =>
                updateGuest(list, index, {
                  ...guest,
                  name: e.target.value,
                })
              }
              placeholder="Nume invitat"
              className="flex-1 border px-2 py-1"
            />
          ) : (
            <span className="flex-1">{guest.name}</span>
          )}

          <select
            title="dietary select"
            value={guest.dietary || "none"}
            onChange={(e) =>
              updateGuest(list, index, {
                ...guest,
                dietary: e.target.value,
                dietaryNote: e.target.value === "other" ? guest.dietaryNote || "" : "",
              })
            }
            className="border px-2 py-1 text-sm"
          >
            {DIETARY.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {isExtra && (
            <button onClick={() => removeExtraGuest(index)} className="px-2 text-red-500">
              ✕
            </button>
          )}
        </div>

        {guest.dietary === "other" && (
          <input
            value={guest.dietaryNote || ""}
            onChange={(e) =>
              updateGuest(list, index, {
                ...guest,
                dietaryNote: e.target.value,
              })
            }
            placeholder="Restricții alimentare"
            className="w-full border px-2 py-1 text-sm"
          />
        )}

        {/* TRANSPORT */}
        <div className="flex gap-2">
          <select
            title="transport type"
            value={guest.transport?.type || "none"}
            onChange={(e) =>
              updateGuestTransport(list, index, {
                type: e.target.value as TransportType,
              })
            }
            className="flex-1 border px-2 py-1 text-sm"
          >
            <option value="none">No transport</option>

            <option value="personal">Personal</option>

            <option value="bus">Bus</option>
          </select>

          {guest.transport?.type === "bus" && (
            <select
              title="pickup location"
              value={guest.transport.locationId || ""}
              onChange={(e) =>
                updateGuestTransport(list, index, {
                  type: "bus",

                  locationId: e.target.value as TransportLocationId,
                })
              }
              className="flex-1 border px-2 py-1 text-sm"
            >
              <option value="">Pickup</option>

              {TRANSPORT_LOCATIONS.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[#f4f1ea] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">{form.familyLabel}</h2>

            <p className="text-sm opacity-60">
              {attendingCount} / {maxGuests} • {status}
            </p>
          </div>

          <button onClick={onClose} className="text-sm opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>

        {/* MAIN GUESTS */}
        <div className="mb-8">
          <h3 className="mb-3 text-xs uppercase tracking-wide opacity-60">Invitați</h3>

          <div className="space-y-3">{guests.map((g, i) => renderGuestCard(g, i, "guests"))}</div>
        </div>

        {/* EXTRA GUESTS */}
        <div className="mb-8">
          <h3 className="mb-3 text-xs uppercase tracking-wide opacity-60">Extra guests</h3>

          <div className="space-y-3">
            {extraGuests.map((g, i) => renderGuestCard(g, i, "extraGuests", true))}
          </div>

          <button
            onClick={addExtraGuest}
            disabled={totalGuests >= maxGuests}
            className="mt-4 text-xs underline opacity-70 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Add guest
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-black/10 pt-4">
          <div className="text-sm opacity-60">
            Transport needed: {needsTransport ? "Yes" : "No"}
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="text-sm opacity-70">
              Cancel
            </button>

            <button
              onClick={() =>
                onSave(
                  withDerivedAdminFields({
                    ...form,
                    hasResponded: true,
                    guests,
                    extraGuests,
                  }),
                )
              }
              className="rounded border px-4 py-1 text-sm hover:bg-black/5"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
