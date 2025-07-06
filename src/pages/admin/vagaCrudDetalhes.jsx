import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VagaDetalhes() {
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);
  const [newTitle, setNewTitle] = useState("null");
  const [newDescription, setNewDescription] = useState("null");
  const [newVacancies, setNewVacancies] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = usuario?.token || null;

  useEffect(() => {
    fetch(`http://localhost:8080/rh-admin/vagas/${id}`, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setVaga(data)
        setNewTitle(data.title)
        setNewDescription(data.description)
        setNewVacancies(data.vacancies)
        setNewWage(data.wage)
      })
      .catch(err => console.error("Erro ao buscar vaga:", err));
  }, [id]);

  function salvar() {
    if (!newTitle.trim() || !newDescription.trim() || !newDescription.trim() || !newWage.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaVaga = {
      title: newTitle,
      description: newDescription,
      vacancies: newVacancies,
      wage: newWage
    }

    fetch(`http://localhost:8080/rh-admin/vagas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify(novaVaga)
    })
      .then(res => res.json())
      .then(() => alert("Candidatura salva com sucesso!"))
      .catch(err => console.error("Erro ao salvar vaga:", err));
    };

  if (!vaga) {
    return <p>Carregando vagas...</p>;
  }

  return(
    <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <input
          type="number"
          value={newVacancies}
          onChange={(e) => setNewVacancies(e.target.value)}
        />

        <input
          type="number"
          value={newWage}
          onChange={(e) => setNewWage(e.target.value)}
        />

        <button onClick={salvar}>Salvar</button>
    </div>
  )
}