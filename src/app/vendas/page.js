"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function VendasInicialPage() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const vendasLocalStorage = JSON.parse(localStorage.getItem("vendas")) || [];
    setVendas(vendasLocalStorage);
    console.log(vendasLocalStorage);
  }, []);

  function apagar(venda) {
    if (window.confirm(`Deseja mesmo excluir a venda ${venda.nome}?`)) {
      const novaLista = vendas.filter((item) => item.id !== venda.id);
      localStorage.setItem("vendas", JSON.stringify(novaLista));
      setVendas(novaLista);
      alert("Venda excluída com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Vendas">
      <div className="text-end mb-2">
        <Button href="/vendas/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente:</th>
            <th>Peça Solicitada:</th>
            <th>Quantidade:</th>
            <th>Data da Venda:</th>
            <th>Forma de Pagamento:</th>
            <th>Funcionário Atribuído</th>
            <th>Desconto:</th>
            <th>Status:</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => {
            return (
              <tr key={venda.id} className="text-center">
                <td>{venda.cliente}</td>
                <td>{venda.pecaAdquirida}</td>
                <td>{venda.quantidade}</td>
                <td>{venda.dataDaVenda}</td>
                <td>{venda.formaPagamento}</td>
                <td>{venda.funcionarioAtribuido}</td>
                <td>{venda.descontoAplicado}</td>
                <td>{venda.status}</td>
                <td className="text-center">
                  <Button className="me-2" href={`/vendas/form?id=${venda.id}`}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(venda)}>
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
