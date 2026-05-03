import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import PaperGrain from "@/components/PaperGrain";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🔥 REDIRECT HERE
      navigate("/admin");
    } catch (err) {
      setError("Date invalide");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#f4f1ea] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[420px] border border-black/5 bg-[#f4f1ea]/80 px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
      >
        {/* ✨ HEADER */}
        <div className="space-y-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Admin Access</p>

          <h1 className="script-cormorant-display text-[34px] text-[#3d2b1f]">Bine ai revenit</h1>

          <p className="text-[14px] text-[#3d2b1f]/70">Autentificare pentru dashboard</p>
        </div>

        {/* ✨ FORM */}
        <div className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-[#6b1f2b]/30 bg-transparent pb-2 text-center text-[15px] text-[#3d2b1f] outline-none placeholder:text-[#6b1f2b]/40 focus:border-[#c9a46c]"
          />

          <input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-[#6b1f2b]/30 bg-transparent pb-2 text-center text-[15px] text-[#3d2b1f] outline-none placeholder:text-[#6b1f2b]/40 focus:border-[#c9a46c]"
          />

          {error && <p className="text-center text-[13px] text-red-500">{error}</p>}
        </div>

        {/* ✨ CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="border border-[#c9a46c] px-6 py-2 text-[13px] uppercase tracking-[0.2em] text-[#3d2b1f] transition hover:bg-[#c9a46c]/10 disabled:opacity-40"
          >
            {loading ? "..." : "Login"}
          </button>
        </div>

        <PaperGrain />
      </motion.div>
    </section>
  );
}
