import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListarVagas() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/public/vagas")
      .then(res => res.json())
      .then(data => setVagas(data.content))
      .catch(err => console.error("Erro ao buscar vagas:", err));
  }, []);

  return (
    <div>
      <h1>Vagas Abertas</h1>
      {vagas.length === 0 ? (
        <p>Nenhuma vaga encontrada.</p>
      ) : (
        <ul>
          {vagas.map(vaga => (
            <li key={vaga.id}>
                <Link to={`/vagas/${vaga.id}`}>
                    <strong>{vaga.title}</strong> | {vaga.wage}
                </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
