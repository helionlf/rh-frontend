import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VagaDetalhes() {
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);
  const [curriculo, setCurriculo] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = usuario?.token || null;

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

  if (!curriculo) {
    alert("Selecione um currículo antes de se candidatar.");
    return;
  }

  const formData = new FormData();
  formData.append("curriculo", curriculo);

  fetch(`http://localhost:8080/public/vagas/${id}/candidatar`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
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

      <label>
          Currículo:
          <input
            type="file"
            accept=".pdf,.doc,.docx,"
            onChange={(e) => setCurriculo(e.target.files[0])}
          />
      </label>

      <div>
        <button onClick={candidatar}>Candidatar-se</button>
      </div>
    </div>
  );
}
