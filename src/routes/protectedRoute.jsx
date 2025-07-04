import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { usuario, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (role && usuario.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
