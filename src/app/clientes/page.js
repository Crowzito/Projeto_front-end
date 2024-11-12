"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function ClientesInicialPage() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const clientesLocalStorage =
      JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesLocalStorage);
    console.log(clientesLocalStorage);
  }, []);

  function apagar(cliente) {
    if (
      window.confirm(
        `Deseja mesmo excluir o cliente ${cliente.nome}?`
      )
    ) {
      const novaLista = clientes.filter(
        (item) => item.id !== cliente.id
      );
      localStorage.setItem("clientes", JSON.stringify(novaLista));
      setClientes(novaLista);
      alert("Cliente excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Clientes">
      <div className="text-end mb-2">
        <Button href="/clientes/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Tipo de Cadastro:</th>
            <th>E-mail:</th>
            <th>Telefone:</th>
            <th>País:</th>
            <th>Estado:</th>
            <th>Data do Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={cliente.id} className="text-center">
                <td>{cliente.nome}</td>
                <td>{cliente.tipoPessoa}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.pais}</td>
                <td>{cliente.estado}</td>
                <td>{cliente.data}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/clientes/form?id=${cliente.id}`}
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
