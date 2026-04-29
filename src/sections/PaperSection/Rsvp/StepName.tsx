import { db } from "@/lib/firebase";
import { cn } from "@utils/cn";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { stepVariants } from "./stepVariants";

import type { GuestGroup } from "@/types/rsvp";

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
          group.members.some((m) => m.toLowerCase().startsWith(q));

        const includesMatch =
          group.familyLabel.toLowerCase().includes(q) ||
          group.representative?.toLowerCase().includes(q) ||
          group.members.some((m) => m.toLowerCase().includes(q));

        // 🔥 progressive filtering
        return q.length < 4 ? startsMatch : includesMatch;
      })
      .sort((a, b) => {
        const score = (g: GuestGroup) => {
          let s = 0;

          if (g.familyLabel.toLowerCase().startsWith(q)) s += 3;
          if (g.representative?.toLowerCase().startsWith(q)) s += 2;
          if (g.members.some((m) => m.toLowerCase().startsWith(q))) s += 1;

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
      className="space-y-12"
    >
      {/* BACK */}
      <button onClick={onBack} className="text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]">
        ← Înapoi
      </button>

      <div className="space-y-8 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">Cum vă numiți?</h2>

        {/* INPUT */}
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scrie numele tău"
          className="w-full border-b border-[#6b1f2b]/20 bg-transparent py-4 text-center text-[20px] text-[#6b1f2b] outline-none"
        />

        {/* STATES */}
        <div className="space-y-2">
          {loading && <p className="text-sm text-[#6b1f2b]/40">Se încarcă invitații...</p>}

          {!loading && query.length > 0 && query.length < 3 && (
            <p className="text-sm text-[#6b1f2b]/40">
              Mai scrie puțin pentru rezultate mai precise
            </p>
          )}

          {!loading && query.length >= 3 && results.length === 0 && (
            <p className="text-sm text-[#6b1f2b]/40">Nu am găsit nimic 🤍</p>
          )}

          {/* RESULTS */}
          {results.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group)}
              className={cn(
                "w-full border px-4 py-3 text-left transition",
                value === group.id
                  ? "border-[#c9a46c] bg-[#6b1f2b]/5"
                  : "border-[#6b1f2b]/20 hover:bg-[#6b1f2b]/5",
              )}
            >
              <div className="font-medium text-[#6b1f2b]">{group.familyLabel}</div>

              <div className="text-sm text-[#6b1f2b]/60">{group.representative}</div>

              <div className="text-xs text-[#6b1f2b]/40">
                {group.members.slice(0, 2).join(", ")}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            "border px-10 py-4 uppercase tracking-[0.3em]",
            isValid
              ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
              : "cursor-not-allowed border-[#6b1f2b]/20 text-[#6b1f2b]/30",
          )}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
