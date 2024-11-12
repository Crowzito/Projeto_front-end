"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import Pagina from "@/app/components/Pagina";
import styles from "@/app/ClientesFormPage.module.css"; // Importa o arquivo de estilo

export default function VendasFormPage(props) {
  const router = useRouter();

  const [descontoAplicadoFiltrado, setdescontoAplicadoFiltrado] = useState([]);
  const [pecaFiltrada, setPecaFitrada] = useState({});
  const [clienteFiltrado, setClienteFiltrado] = useState([]);

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const pecas = JSON.parse(localStorage.getItem("pecas")) || [];
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

  const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
  const id = props.searchParams.id;
  const vendaEditada = vendas.find((item) => item.id == id);

  function salvar(dados) {
    if (vendaEditada) {
      Object.assign(vendaEditada, dados);
      localStorage.setItem("vendas", JSON.stringify(vendas));
    } else {
      dados.id = v4();
      vendas.push(dados);
      localStorage.setItem("vendas", JSON.stringify(vendas));
    }
    alert("Venda cadastrada com sucesso!");
    router.push("/vendas");
  }

  const initialValues = {
    cliente: "",
    pecaAdquirida: "",
    quantidade: "",
    funcionarioAtribuido: "",
    dataDaVenda: "",
    formaPagamento: "",
    descontoAplicado: "",
    status: "",
  };

  const validationSchema = Yup.object().shape({
    cliente: Yup.string().required("Campo obrigatório"),
    pecaAdquirida: Yup.string().required("Campo Obrigatório"),
    quantidade: Yup.number().required("Campo obrigatório"),
    funcionarioAtribuido: Yup.string().required("Campo Obrigatório"),
    dataDaVenda: Yup.date().required("Campo Obrigatório"),
    formaPagamento: Yup.string().required("Campo Obrigatório"),
    descontoAplicado: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo="Cadastro de Vendas">
      <Formik
        initialValues={vendaEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <Form onSubmit={handleSubmit} className={styles.form}>
              {/* Cliente */}
              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Select
                    name="cliente"
                    value={values.cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cliente && !errors.cliente}
                    isInvalid={touched.cliente && errors.cliente}
                    className={styles.input}
                  >
                    <option value="">Selecione</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.nome}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.cliente}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Peca e Quantidade */}
              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Peça Adquirida:</Form.Label>
                  <Form.Select
                    name="pecaAdquirida"
                    value={values.pecaAdquirida}
                    onChange={(e) => {
                      setFieldValue("pecaAdquirida", e.target.value);
                      const pecaSelecionada = pecas.find(
                        (peca) => peca.nome === e.target.value
                      );
                      setPecaFitrada(pecaSelecionada || {});
                    }}
                    onBlur={handleBlur}
                    isValid={touched.pecaAdquirida && !errors.pecaAdquirida}
                    isInvalid={touched.pecaAdquirida && errors.pecaAdquirida}
                    className={styles.input}
                  >
                    <option value="">Selecione</option>
                    {pecas.map((peca) => (
                      <option key={peca.id} value={peca.nome}>
                        {peca.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.pecaAdquirida}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Preço Unitário:</Form.Label>
                  <Form.Control
                    type="text"
                    value={pecaFiltrada?.precoUnico || ""}
                    readOnly
                    className="bg-light"
                  />
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Quantidade:</Form.Label>
                  <Form.Control
                    name="quantidade"
                    type="number"
                    value={values.quantidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.quantidade && !errors.quantidade}
                    isInvalid={touched.quantidade && errors.quantidade}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantidade}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Funcionario e Data */}
              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Funcionário Atribuído:</Form.Label>
                  <Form.Select
                    name="funcionarioAtribuido"
                    value={values.funcionarioAtribuido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={
                      touched.funcionarioAtribuido &&
                      !errors.funcionarioAtribuido
                    }
                    isInvalid={
                      touched.funcionarioAtribuido &&
                      errors.funcionarioAtribuido
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione</option>
                    {funcionarios.map((funcionario) => (
                      <option key={funcionario.id} value={funcionario.nome}>
                        {funcionario.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.funcionarioAtribuido}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Data da Venda:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataDaVenda"
                    value={values.dataDaVenda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataDaVenda && !errors.dataDaVenda}
                    isInvalid={touched.dataDaVenda && errors.dataDaVenda}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataDaVenda}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Forma de Pagamento, Desconto e Status */}
              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Forma de Pagamento:</Form.Label>
                  <Form.Select
                    name="formaPagamento"
                    value={values.formaPagamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.formaPagamento && !errors.formaPagamento}
                    isInvalid={touched.formaPagamento && errors.formaPagamento}
                    className={styles.input}
                  >
                    <option value="">Selecione</option>
                    <option value="PIX">PIX</option>
                    <option value="Débito">Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Crédito">Crédito</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.formaPagamento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Desconto Aplicado:</Form.Label>
                  <InputMask
                    mask="99%"
                    value={values.descontoAplicado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="descontoAplicado"
                        isValid={
                          touched.descontoAplicado && !errors.descontoAplicado
                        }
                        isInvalid={
                          touched.descontoAplicado && errors.descontoAplicado
                        }
                        className={styles.input}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.descontoAplicado}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.status && !errors.status}
                    isInvalid={touched.status && errors.status}
                    className={styles.input}
                  >
                    <option value="">Selecione</option>
                    <option value="Em Processo">Em Processo</option>
                    <option value="Aceito">Aceito</option>
                    <option value="Negado">Negado</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  onClick={() => router.push("/vendas")}
                >
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
