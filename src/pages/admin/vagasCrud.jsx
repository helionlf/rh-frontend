import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function VagasCrud() {
  const API_URL = "http://localhost:8080/rh-admin/vagas"

  const { usuario } = useAuth();
  const [vagas, setVagas] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVacancies, setNewVacancies] = useState();
  const [newWage, setNewWage] = useState();
  const [newEmailRecrutador, setNewEmailRecrutador] = useState("null");

  useEffect(() => {
    if (!usuario?.token) return;

    fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setVagas(data.content))
      .catch(err => console.log("erro ao buscar exibir as vagas: ", err));
  }, [usuario]);

  function criarVaga() {
    if (!newTitle.trim() || !newDescription.trim() || newVacancies === '' || newWage === '' || !newEmailRecrutador.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaVaga = {
      title: newTitle,
      description: newDescription,
      vacancies: newVacancies,
      wage: newWage,
      emailRecrutador: newEmailRecrutador
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
      body: JSON.stringify(novaVaga)
    })
    .then(res => {
      console.log("Status da resposta:", res.status);
      if (!res.ok) throw new Error("Erro ao cadastrar vaga");
      return res.json();
    })
    .then(() => alert("Você postou uma nova vaga com sucesso!"))
    .catch(err => {
      console.error("Erro:", err);
      alert("Erro ao cadastrar vaga");
    });

  }

  function excluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) {
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao excluir");
      }
      setVagas(vagas => vagas.filter(vaga => vaga.id !== id));
    })
    .catch(err => console.log("erro ao excluir: ", err));
  }

  return (
    <div>
      <h1>Página de CRUD de Vagas</h1>

      <div>
        <input
          type="text"
          placeholder="Título da vaga"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Número de vagas"
          value={newVacancies}
          onChange={(e) => setNewVacancies(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salário"
          value={newWage}
          onChange={(e) => setNewWage(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email para receber as candidaturas"
          value={newEmailRecrutador}
          onChange={(e) => setNewEmailRecrutador(e.target.value)}
        />

        <button onClick={criarVaga}>Postar</button>
      </div>

      <div>
        <ul>
          {vagas.map(vaga => (
            <li key={vaga.id}>
              <Link to={`/admin/vagas/${vaga.id}`}>
                <strong>{vaga.title}</strong> | {vaga.wage}
              </Link>
              <button onClick={() => excluir(vaga.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
