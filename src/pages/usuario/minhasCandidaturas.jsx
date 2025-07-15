import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Candidaturas() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [candidaturas, setCandidaturas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/public/vagas/aplicadas`, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCandidaturas(data))
      .catch(err => console.error("Erro ao buscar vagas:", err));
  }, []);

  if (candidaturas.length === 0) {
    return (
      <p>
        Você ainda não se candidatou em nenhuma vaga...{" "}
        <span>
          <a href="/vagas">Buscar vagas</a>
        </span>
      </p>
    );
  }

  return (
    <div>
      <ul>
        {candidaturas.map(candidatura => (
          <li key={candidatura.id}>
            <Link to={`/vagas/${candidatura.vaga.id}`}>
              <strong>{candidatura.vaga.title}</strong> | {candidatura.vaga.wage}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}