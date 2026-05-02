import { db } from "@/lib/firebase";
import { cn } from "@utils/cn";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { useEffect, useMemo, useState } from "react";
import { stepVariants } from "./stepVariants";

import type { GuestGroup } from "@/types/rsvp";
import { getMemberName } from "@/utils/rsvpValidation";

/* ---------------- DEBOUNCE HOOK ---------------- */

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

/* ---------------- TYPES ---------------- */

type Props = {
  value: string;
  onSelectGroup: (group: GuestGroup) => Promise<void>;
  onNext: () => void;
  onBack: () => void;
};

/* ---------------- COMPONENT ---------------- */

export default function StepName({ value, onSelectGroup, onNext, onBack }: Props) {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<GuestGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 300);

  /* ---------------- FETCH ---------------- */

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

  /* ---------------- SEARCH ---------------- */

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    if (q.length < 3) return [];

    return groups
      .filter((group) => {
        const startsMatch =
          group.familyLabel.toLowerCase().startsWith(q) ||
          group.representative?.toLowerCase().startsWith(q) ||
          group.members.some((m) => getMemberName(m).toLowerCase().startsWith(q));

        const includesMatch =
          group.familyLabel.toLowerCase().includes(q) ||
          group.representative?.toLowerCase().includes(q) ||
          group.members.some((m) => getMemberName(m).toLowerCase().includes(q));

        // 🔥 progressive filtering
        return q.length < 4 ? startsMatch : includesMatch;
      })
      .sort((a, b) => {
        const score = (g: GuestGroup) => {
          let s = 0;

          if (g.familyLabel.toLowerCase().startsWith(q)) s += 3;
          if (g.representative?.toLowerCase().startsWith(q)) s += 2;
          if (g.members.some((m) => getMemberName(m).toLowerCase().startsWith(q))) s += 1;

          return s;
        };

        return score(b) - score(a);
      })
      .slice(0, 6);
  }, [debouncedQuery, groups]);

  /* ---------------- DISPLAY ---------------- */

  const isValid = !!value;

  /* ---------------- UI ---------------- */

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={rsvpStyles.step}
    >
      <button onClick={onBack} className={rsvpStyles.backButton}>
        Înapoi
      </button>

      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Invitație</p>
        <h2 className={rsvpStyles.title}>Cum vă numiți?</h2>
        <p className={rsvpStyles.body}>Caută numele sau familia trecută pe invitație.</p>
      </div>

      <div className={rsvpStyles.content}>
        {/* INPUT */}
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scrie numele tău"
          className={`${rsvpStyles.input} text-center`}
        />

        {/* STATES */}
        <div className="space-y-3 pt-2">
          {loading && (
            <p className="text-center text-[13px] text-[#6b1f2b]/45">Se încarcă invitații...</p>
          )}

          {!loading && query.length > 0 && query.length < 3 && (
            <p className="text-center text-[13px] text-[#6b1f2b]/45">
              Mai scrie puțin pentru rezultate mai precise
            </p>
          )}

          {!loading && query.length >= 3 && results.length === 0 && (
            <p className="text-center text-[13px] text-[#6b1f2b]/45">Nu am găsit nimic</p>
          )}

          {/* RESULTS */}
          {results.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group)}
              className={cn(
                rsvpStyles.option,
                value === group.id
                  ? "border-[#c9a46c] bg-white/25"
                  : "border-[#6b1f2b]/15 hover:bg-white/20",
              )}
            >
              <div className="text-[16px] text-[#3d2b1f]">{group.familyLabel}</div>

              <div className="mt-1 text-[13px] text-[#6b1f2b]/60">{group.representative}</div>

              <div className="mt-1 text-[12px] text-[#6b1f2b]/45">
                {group.members.slice(0, 2).map(getMemberName).join(", ")}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            rsvpStyles.primaryButton,
            isValid
              ? "border-[#c9a46c]"
              : `${rsvpStyles.disabledButton} hover:bg-transparent hover:text-[#6b1f2b]/30`,
          )}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
