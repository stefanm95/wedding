import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { cn } from "@utils/cn";
import { stepVariants } from "./stepVariants";

import type { GuestGroup } from "@/types/rsvp";

type Props = {
  value: string;
  onSelectGroup: (group: GuestGroup) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepName({ value, onSelectGroup, onNext, onBack }: Props) {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<GuestGroup[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const snap = await getDocs(collection(db, "guestGroups"));

      const data: GuestGroup[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GuestGroup[];

      setGroups(data);
    };

    fetchGroups();
  }, []);

  const results = groups.filter((group) =>
    group.members.some((m) => m.toLowerCase().includes(query.toLowerCase())),
  );

  const isValid = !!value;

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12"
    >
      <button onClick={onBack} className="text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]">
        ← Înapoi
      </button>

      <div className="space-y-8 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">Cum vă numiți?</h2>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scrie numele tău"
          className="w-full border-b border-[#6b1f2b]/20 bg-transparent py-4 text-center text-[20px] text-[#6b1f2b] outline-none"
        />

        {/* 🔍 RESULTS */}
        <div className="space-y-2">
          {results.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group)}
              className="w-full border border-[#6b1f2b]/20 py-3 hover:bg-[#6b1f2b]/5"
            >
              {group.familyLabel}
            </button>
          ))}
        </div>
      </div>

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
