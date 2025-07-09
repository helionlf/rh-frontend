import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [newFirstName, setNewFirstName] = useState("null")
  const [newLastName, setNewLastName] = useState("null")
  const [newEmail, setNewEmail] = useState("null")
  const [newPassword, setNewPassword] = useState("null")

  function cadastrar() {
    const novoUsuario = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        password: newPassword
    }

    fetch("http://localhost:8080/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
    })
    .then(async (res) => {
    if (!res.ok) {
        const erro = await res.text();
        throw new Error(erro || "Erro ao cadastrar novo usuário");
    }
    return res.json();
    })
    .then(() => { navigate("/login");})
    .catch((err) => {
        alert("Erro ao cadastrar: " + err.message);
    });
  }

  return (
    <div>
      <h1>Tela de cadastro</h1>

      <input
          type="text"
          placeholder="Primeiro nome"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Último nome"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={cadastrar}>Cadastrar</button>
    </div>
  );
}
