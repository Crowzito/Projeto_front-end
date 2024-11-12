"use client";

import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "../page.module.css"; // Arquivo CSS para personalizações

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar className={styles.navbar}>
        <Container>
          <Navbar.Brand className={styles.brand} href="/">
            Amis Auto Peças
          </Navbar.Brand>
          <Nav className="me-end">
            <Nav.Link className={styles.navLink} href="/pecas">
              Peças
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/fornecedores">
              Fornecedores
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/clientes">
              Clientes
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/vendas">
              Vendas
            </Nav.Link>
            <Nav.Link className={styles.navLink} href="/funcionarios">
              Funcionários
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className={styles.titleBar}>
        <h1>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className={styles.content}>{children}</Container>
    </>
  );
}
