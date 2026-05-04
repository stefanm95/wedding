import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
