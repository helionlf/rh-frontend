import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import VagasCrud from "../pages/admin/vagasCrud";
import ProtectedRoute from "./protectedRoute";
import VagasList from "../pages/public/vagasList";
import VagaDetalhes from "../pages/public/vagaDetalhes";
import VagaCrudDetalhes from "../pages/admin/vagaCrudDetalhes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/vagas" element={<VagasList />} />
      <Route path="/vagas/:id" element={<VagaDetalhes />} />

      {/* Apenas usuários com role = 'admin' acessam */}
      <Route path="/admin/vagas" element={
        <ProtectedRoute role="admin">
          <VagasCrud />
        </ProtectedRoute>
      } />
      <Route path="/admin/vagas/:id" element={
        <ProtectedRoute role="admin">
          <VagaCrudDetalhes />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
