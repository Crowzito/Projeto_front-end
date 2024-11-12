"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Pagina from "./components/Pagina";
import styles from "./HomePage.module.css"; // Arquivo CSS para estilização

export default function HomePage() {
  const [pecas, setPecas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    // Acessando localStorage apenas no lado do cliente
    const pecasData = JSON.parse(localStorage.getItem("pecas")) || [];
    const fornecedoresData =
      JSON.parse(localStorage.getItem("fornecedores")) || [];
    const clientesData = JSON.parse(localStorage.getItem("clientes")) || [];
    const vendasData = JSON.parse(localStorage.getItem("vendas")) || [];
    const funcionariosData =
      JSON.parse(localStorage.getItem("funcionarios")) || [];

    setPecas(pecasData);
    setFornecedores(fornecedoresData);
    setClientes(clientesData);
    setVendas(vendasData);
    setFuncionarios(funcionariosData);
  }, []);

  const objeto = [
    {
      caminho: "/pecas",
      quantidade: pecas.length,
      nome: "Peças",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeYXwKChBs534s06O-A6KBF2BAsawiEJ-Rw&s.png",
    },
    {
      caminho: "/fornecedores",
      quantidade: fornecedores.length,
      nome: "Fornecedores",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmi_oX3S5ZYrHXXlF9zY0nOVyQqNAlKoiywg&s.png",
    },
    {
      caminho: "/clientes",
      quantidade: clientes.length,
      nome: "Clientes",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuOEwu8MN8GbrORKVdH8J1RgRCPakFgbuq6w&s.png",
    },
    {
      caminho: "/vendas",
      quantidade: vendas.length,
      nome: "Vendas",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZ__4bcQBjMSeSMy1y67MbgGdmgUAG7keRg&s.png",
    },
    {
      caminho: "/funcionarios",
      quantidade: funcionarios.length,
      nome: "Funcionários",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW8886J-6b2G_8tbdHvxHMdSSQp1U8G_p8sQ&s.png",
    },
  ];

  return (
    <Pagina titulo="Amis Auto Peças">
      <Row md={3} className="g-4">
        {objeto.map((item, index) => (
          <Col key={index} className="py-2">
            <Card className={styles.card}>
              <Card.Img src={item.imagem} className={styles.cardImage} />
              <Card.Body className="text-center">
                <Card.Title className={styles.cardTitle}>
                  <b>{item.nome}</b>
                </Card.Title>
                <p className={styles.cardText}>
                  Cadastrados: {item.quantidade}
                </p>
              </Card.Body>
              <Card.Footer className={styles.cardFooter}>
                <Button href={item.caminho} className={styles.button}>
                  Mais
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
