"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function PecasInicialPage() {
  const [pecas, setPecas] = useState([]);

  useEffect(() => {
    const pecasLocalStorage = JSON.parse(localStorage.getItem("pecas")) || [];
    setPecas(pecasLocalStorage);
    console.log(pecasLocalStorage);
  }, []);

  function apagar(peca) {
    if (window.confirm(`Deseja mesmo excluir a peca ${peca.nome}?`)) {
      const novaLista = pecas.filter((item) => item.id !== peca.id);
      localStorage.setItem("pecas", JSON.stringify(novaLista));
      setPecas(novaLista);
      alert("Peça excluída com sucesso!!");
    }
  }

  return (
    <Pagina titulo="pecas">
      <div className="text-end mb-2">
        <Button href="/pecas/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Modelos:</th>
            <th>Descrição:</th>
            <th>Categoria:</th>
            <th>Estoque:</th>
            <th>Fornecedor:</th>
            <th>Preço Unitário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pecas.map((peca) => {
            return (
              <tr key={peca.id} className="text-center">
                <td>{peca.nome}</td>
                <td>
                  {Array.isArray(peca.modelo)
                    ? peca.modelo.join(", ")
                    : peca.modelo}
                </td>{" "}
                <td>{peca.descricao}</td>
                <td>
                  {Array.isArray(peca.categoria)
                    ? peca.categoria.join(", ")
                    : peca.categoria}
                </td>
                <td>{peca.estoque}</td>
                <td>{peca.fornecedor}</td>
                <td>{peca.precoUnico}</td>
                <td className="text-center">
                  <Button className="me-2" href={`/pecas/form?id=${peca.id}`}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(peca)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
