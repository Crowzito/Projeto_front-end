"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function FornecedoresInicialPage() {
  const [fornecedores, setfornecedores] = useState([]);

  useEffect(() => {
    const fornecedoresLocalStorage =
      JSON.parse(localStorage.getItem("fornecedores")) || [];
    setfornecedores(fornecedoresLocalStorage);
    console.log(fornecedoresLocalStorage);
  }, []);

  function apagar(fornecedor) {
    if (
      window.confirm(`Deseja mesmo excluir o fornecedor ${fornecedor.nome}?`)
    ) {
      const novaLista = fornecedores.filter(
        (item) => item.id !== fornecedor.id
      );
      localStorage.setItem("fornecedores", JSON.stringify(novaLista));
      setfornecedores(novaLista);
      alert("Fornecedor excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Fornecedores">
      <div className="text-end mb-2">
        <Button href="/fornecedores/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>CNPJ:</th>
            <th>E-mail:</th>
            <th>Telefone:</th>
            <th>País:</th>
            <th>Estado:</th>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => {
            return (
              <tr key={fornecedor.id} className="text-center">
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.pais}</td>
                <td>{fornecedor.estado}</td>
                <td>
                  {/* Verifica se fornecedor.produto é um array e exibe seus itens separados por vírgula */}
                  {Array.isArray(fornecedor.produtos)
                    ? fornecedor.produtos.join(", ")
                    : fornecedor.produtos}
                </td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/fornecedores/form?id=${fornecedor.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(fornecedor)}>
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
