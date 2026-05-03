import { db } from "@/lib/firebase";
import { cn } from "@utils/cn";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { useEffect, useMemo, useState } from "react";
import { stepVariants } from "./stepVariants";

import type { GuestGroup } from "@/types/rsvp";
import { getMemberName } from "@/utils/rsvpValidation";

/* ---------------- DEBOUNCE ---------------- */

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

/* ---------------- COMPONENT ---------------- */

type Props = {
  value: string;
  onSelectGroup: (group: GuestGroup) => Promise<void>;
  onConfirm: (attending: boolean) => void;
  onBack: () => void;
};

export default function StepName({ value, onSelectGroup, onConfirm, onBack }: Props) {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<GuestGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchGroups = async () => {
      const snap = await getDocs(collection(db, "guestGroups"));

      const data: GuestGroup[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GuestGroup[];

      setGroups(data);
      setLoading(false);
    };

    fetchGroups();
  }, []);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    if (q.length < 2) return [];

    return groups
      .filter((group) => {
        return (
          group.familyLabel.toLowerCase().includes(q) ||
          group.representative?.toLowerCase().includes(q) ||
          group.members.some((m) => getMemberName(m).toLowerCase().includes(q))
        );
      })
      .slice(0, 6);
  }, [debouncedQuery, groups]);

  const isValid = !!value;

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${rsvpStyles.step} relative pt-10 text-center`}
    >
      {/* 🔙 BACK */}
      <button
        onClick={onBack}
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 transition hover:text-[#6b1f2b]"
      >
        <span className="text-[14px] leading-none">←</span>
        Înapoi
      </button>

      {/* ✨ HEADER */}
      <div className="space-y-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Invitația ta</p>

        <h2 className="script-cormorant-display text-[34px] leading-tight text-[#3d2b1f]">
          Cum te regăsim pe listă?
        </h2>

        <p className="mx-auto max-w-[420px] text-[15px] leading-relaxed text-[#3d2b1f]/75">
          Scrie numele tău sau al familiei, exact cum apare pe invitație.
        </p>
      </div>

      {/* ✨ DECORATIVE DIVIDER */}
      <div className="flex items-center justify-center gap-3 pt-6">
        <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
        <div className="h-2 w-2 rotate-45 bg-[#c9a46c]/60" />
        <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
      </div>

      {/* ✨ INPUT (fix major aici) */}
      <div className="mx-auto max-w-[320px] pt-8">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ex: Popescu"
          className={cn(
            "w-full border-b border-[#6b1f2b]/25 bg-transparent pb-2 text-center text-[16px] text-[#3d2b1f] outline-none transition",
            "placeholder:text-[#6b1f2b]/35 focus:border-[#c9a46c]",
          )}
        />
      </div>

      {/* ✨ STATES */}
      <div className="space-y-3 pt-6">
        {loading && <p className="text-[13px] text-[#6b1f2b]/45">Pregătim lista de invitați...</p>}

        {!loading && query.length > 0 && query.length < 2 && (
          <p className="text-[13px] text-[#6b1f2b]/45">Mai scrie puțin...</p>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <p className="text-[13px] text-[#6b1f2b]/45">
            Nu am găsit nimic — încearcă altă variantă
          </p>
        )}
      </div>

      {/* ✨ RESULTS (aici e upgrade-ul mare) */}
      <div className="space-y-3 pt-4">
        {results.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group)}
            className={cn(
              rsvpStyles.option,
              "text-center",
              value === group.id
                ? "border-[#c9a46c] bg-white/25"
                : "border-[#6b1f2b]/15 hover:bg-white/20",
            )}
          >
            <div className="text-[17px] text-[#3d2b1f]">{group.familyLabel}</div>

            {group.representative && (
              <div className="mt-1 text-[13px] text-[#6b1f2b]/60">{group.representative}</div>
            )}

            <div className="mt-1 text-[12px] text-[#6b1f2b]/45">
              {group.members.slice(0, 2).map(getMemberName).join(", ")}
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center gap-3 pt-6">
        <button
          onClick={() => onConfirm(true)}
          disabled={!isValid}
          className={cn(
            rsvpStyles.primaryButton,
            isValid ? "border-[#c9a46c]" : rsvpStyles.disabledButton,
          )}
        >
          ✔ Vin
        </button>

        <button
          onClick={() => onConfirm(false)}
          disabled={!isValid}
          className={cn(
            "border px-5 py-2 text-[13px] uppercase tracking-[0.2em]",
            isValid
              ? "border-[#6b1f2b]/40 text-[#6b1f2b] hover:bg-[#6b1f2b]/10"
              : rsvpStyles.disabledButton,
          )}
        >
          ❌ Nu vin
        </button>
      </div>
    </motion.div>
  );
}
