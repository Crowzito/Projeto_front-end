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
import apiLocalidades from "@/app/services/apiLocalidades";
import styles from "@/app/ClientesFormPage.module.css"; // Importa o arquivo de estilo

export default function FornecedoresFormPage(props) {
  const router = useRouter();
  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [novoProduto, setNovoProduto] = useState("");

  const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
  const id = props.searchParams.id;
  const fornecedorEditado = fornecedores.find((item) => item.id == id);

  useEffect(() => {
    apiLocalidades.get("/paises").then((response) => setPaises(response.data));
    apiLocalidades
      .get("estados?orderBy=nome")
      .then((response) => setEstados(response.data));
  }, []);

  function salvar(dados) {
    if (fornecedorEditado) {
      Object.assign(fornecedorEditado, dados);
      localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    } else {
      dados.id = v4();
      fornecedores.push(dados);
      localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    }
    alert("Fornecedor criado com sucesso!");
    router.push("/fornecedores");
  }

  const initialValues = {
    nome: "",
    cnpj: "",
    pais: "Brasil",
    estado: "",
    telefone: "",
    email: "",
    produtos: [], // Certifique-se de que 'produtos' seja um array
    observacoes: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo Obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo Obrigatório"),
    telefone: Yup.string().required("Campo Obrigatório"),
    email: Yup.string().email().required("Campo Obrigatório"),
    produtos: Yup.array().of(Yup.string()), // Validação para produtos como array
    observacoes: Yup.string().required("Campo obrigatório"),
  });

  const handleAddProduto = (e, setFieldValue, values) => {
    e.preventDefault();
    if (novoProduto.trim()) {
      setFieldValue("produtos", [...values.produtos, novoProduto]);
      setNovoProduto("");
    }
  };

  return (
    <Pagina titulo="Cadastro de fornecedores">
      <Formik
        initialValues={fornecedorEditado || initialValues}
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
        }) => (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                  className={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>CNPJ:</Form.Label>
                <InputMask
                  mask="99.999.999/9999-99" // Use values.tipoPessoa aqui
                  value={values.cnpj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.input}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="cnpj"
                      isValid={touched.cnpj && !errors.cnpj}
                      isInvalid={touched.cnpj && errors.cnpj}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cnpj}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>Telefone:</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="telefone"
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                      className={styles.input}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                  className={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>País:</Form.Label>
                <Form.Select
                  name="pais"
                  value={values.pais}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.pais && !errors.pais}
                  isInvalid={touched.pais && errors.pais}
                  className={styles.input}
                >
                  <option value="">Selecione</option>
                  {paises.map((pais) => (
                    <option key={pais.nome} value={pais.nome}>
                      {pais.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.pais}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>Estado:</Form.Label>
                <Form.Select
                  name="estado"
                  value={values.estado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={values.pais !== "Brasil"}
                  isValid={touched.estado && !errors.estado}
                  isInvalid={touched.estado && errors.estado}
                  className={styles.input}
                >
                  <option value="">Selecione</option>
                  {estados.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.sigla}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.estado}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>Produtos:</Form.Label>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Digite um produto"
                    value={novoProduto}
                    onChange={(e) => setNovoProduto(e.target.value)}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                  <div className="text-end mt-2">
                    <Button
                      variant="outline-primary"
                      onClick={(e) =>
                        handleAddProduto(e, setFieldValue, values)
                      }
                      disabled={!novoProduto.trim()}
                    >
                      Adicionar Produto
                    </Button>
                  </div>
                </div>
                <ul>
                  {(Array.isArray(values.produtos) ? values.produtos : []).map(
                    (produto, index) => (
                      <li key={index}>{produto}</li>
                    )
                  )}
                </ul>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>Observações</Form.Label>
                <Form.Control
                  as="textarea"
                  name="observacoes"
                  rows={3}
                  value={values.observacoes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.observacoes && !errors.observacoes}
                  isInvalid={touched.observacoes && errors.observacoes}
                  className={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.observacoes}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={() => router.push("/fornecedores")}
              >
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
