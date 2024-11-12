"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function FuncionariosInicialPage() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const funcionariosLocalStorage =
      JSON.parse(localStorage.getItem("funcionarios")) || [];
    setFuncionarios(funcionariosLocalStorage);
    console.log(funcionariosLocalStorage);
  }, []);

  function apagar(funcionario) {
    if (
      window.confirm(`Deseja mesmo excluir o funcionario ${funcionario.nome}?`)
    ) {
      const novaLista = funcionarios.filter(
        (item) => item.id !== funcionario.id
      );
      localStorage.setItem("funcionarios", JSON.stringify(novaLista));
      setFuncionarios(novaLista);
      alert("Funcionário excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Funcionários">
      <div className="text-end mb-2">
        <Button href="/funcionarios/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Cargo e Função:</th>
            <th>E-mail:</th>
            <th>Telefone:</th>
            <th>CEP:</th>
            <th>CPF:</th>
            <th>Data do Contrato:</th>
            <th>Salário:</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((cliente) => {
            return (
              <tr key={cliente.id} className="text-center">
                <td>{cliente.nome}</td>
                <td>{cliente.cargo}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.dataContrato}</td>
                <td>{cliente.salario}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/funcionarios/form?id=${cliente.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(cliente)}>
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
