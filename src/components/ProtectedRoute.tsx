import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ wait for firebase auth
  if (loading) return null;

  // ❌ not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ allowed
  return <Outlet />;
}
