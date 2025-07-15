import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Cadastro from "../pages/cadastroUsuario";
import VagasCrud from "../pages/admin/vagasCrud";
import MinhasVagas from "../pages/usuario/minhasCandidaturas";
import ProtectedRoute from "./protectedRoute";
import VagasList from "../pages/public/vagasList";
import VagaDetalhes from "../pages/public/vagaDetalhes";
import VagaCrudDetalhes from "../pages/admin/vagaCrudDetalhes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/vagas" element={<VagasList />} />
      <Route path="/vagas/:id" element={<VagaDetalhes />} />
      <Route path="/vagas/aplicadas" element={<MinhasVagas />} />

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
