import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const erro = await res.text();
          throw new Error(erro || "Erro no login");
        }
        return res.json();
      })
      .then((data) => {
        const payload = jwtDecode(data.token);

        login({
          email: payload.sub,
          token: data.token,
          role: payload.role || "user",
        });

        navigate("/");
      })
      .catch((err) => {
        alert("Login inválido: " + err.message);
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
