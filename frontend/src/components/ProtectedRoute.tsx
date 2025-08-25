import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { token, role } = getAuth();

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role || "")) return <Navigate to="/login" />;

  return children;
}
