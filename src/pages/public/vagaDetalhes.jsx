import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function VagaDetalhes() {
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = usuario?.token || null;
  console.log("Token usado na candidatura:", token);


  useEffect(() => {
    fetch(`http://localhost:8080/public/vagas/${id}`)
      .then(res => res.json())
      .then(data => setVaga(data))
      .catch(err => console.error("Erro ao buscar vaga:", err));
  }, [id]);

function candidatar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = usuario?.token || null;
  console.log("Token usado na candidatura:", token);

  fetch(`http://localhost:8080/public/vagas/${id}/candidatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then(res => {
      console.log("Status da resposta:", res.status);
      if (!res.ok) throw new Error("Erro ao se candidatar");
      return res.json();
    })
    .then(() => alert("Candidatura enviada com sucesso!"))
    .catch(err => {
      console.error("Erro:", err);
      alert("Erro ao se candidatar");
    });
}

  
  if (!vaga) {
    return <p>Carregando vagas...</p>;
  }

  return (
    <div>
      <div>
        <h1>{vaga.title}</h1>
        <p>{vaga.description}</p>
        <p>Vagas: {vaga.vacancies}</p>
        <p>Salário: {vaga.wage}</p>
      </div>
      <div>
        <button onClick={candidatar}>Candidatar-se</button>
      </div>
    </div>
  );
}
