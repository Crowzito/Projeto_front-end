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

export default function PecasFormPage(props) {
  const [fornecedorFiltrado, setFornecedorFiltrado] = useState([]);

  const router = useRouter();
  const [novoModelo, setNovoModelo] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");

  const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
  const pecas = JSON.parse(localStorage.getItem("pecas")) || [];
  const id = props.searchParams.id;
  const pecaEditada = pecas.find((item) => item.id == id);

  function salvar(dados) {
    if (pecaEditada) {
      Object.assign(pecaEditada, dados);
      localStorage.setItem("pecas", JSON.stringify(pecas));
    } else {
      dados.id = v4();
      pecas.push(dados);
      localStorage.setItem("pecas", JSON.stringify(pecas));
    }
    alert("Peça adicionada com sucesso!");
    router.push("/pecas");
  }

  const initialValues = {
    nome: "",
    modelo: [],
    descricao: "",
    categoria: [],
    precoUnico: "",
    estoque: "",
    fornecedor: "",
    dataInclusao: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    modelo: Yup.array().of(Yup.string()),
    descricao: Yup.string().required("Campo obrigatório"),
    categoria: Yup.array().of(Yup.string()),
    precoUnico: Yup.string().required("Campo Obrigatório"),
    estoque: Yup.number().required("Campo Obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório"),
    dataInclusao: Yup.date().required("Campo obrigatório"),
  });

  const handleAddModelo = (e, setFieldValue, values) => {
    e.preventDefault();
    if (novoModelo.trim()) {
      setFieldValue("modelo", [...values.modelo, novoModelo]);
      setNovoModelo("");
    }
  };

  const handleAddCategoria = (e, setFieldValue, values) => {
    e.preventDefault();
    if (novaCategoria.trim()) {
      setFieldValue("categoria", [...values.categoria, novaCategoria]);
      setNovaCategoria("");
    }
  };

  useEffect(() => {
    if (fornecedores.length > 0) setFornecedorFiltrado(fornecedores);
  }, [fornecedores]);

  return (
    <Pagina titulo="Cadastro de Peças">
      <Formik
        initialValues={pecaEditada || initialValues}
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
          console.log(errors); // Adicionando log para ajudar no debugging
          return (
            <Form onSubmit={handleSubmit} className={styles.form}>
              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Nome da Peça:</Form.Label>
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
                  <Form.Label>Modelos Permitidos:</Form.Label>
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Digite um modelo"
                      value={novoModelo}
                      onChange={(e) => setNovoModelo(e.target.value)}
                      onBlur={handleBlur}
                      className={styles.input}
                    />
                    <div className="text-end mt-2">
                      <Button
                        variant="outline-primary"
                        onClick={(e) =>
                          handleAddModelo(e, setFieldValue, values)
                        }
                        disabled={!novoModelo.trim()}
                      >
                        Adicionar Modelo
                      </Button>
                    </div>
                  </div>
                  <ul>
                    {values.modelo.map((modelo, index) => (
                      <li key={index}>{modelo}</li>
                    ))}
                  </ul>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="descricao"
                    rows={3}
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Preço Unitário:</Form.Label>
                  <InputMask
                    mask="R$ 999,99"
                    value={values.precoUnico}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="precoUnico"
                        isValid={touched.precoUnico && !errors.precoUnico}
                        isInvalid={touched.precoUnico && errors.precoUnico}
                        className={styles.input}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.precoUnico}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Estoque</Form.Label>
                  <Form.Control
                    name="estoque"
                    type="number"
                    value={values.estoque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.estoque && !errors.estoque}
                    isInvalid={touched.estoque && errors.estoque}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.estoque}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Fornecedor:</Form.Label>
                  <Form.Select
                    name="fornecedor"
                    value={values.fornecedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.fornecedor && !errors.fornecedor}
                    isInvalid={touched.fornecedor && errors.fornecedor}
                    className={styles.input}
                  >
                    <option value="">Selecione</option>
                    {fornecedorFiltrado.map((fornecedor) => (
                      <option key={fornecedor.nome} value={fornecedor.nome}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.fornecedor}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Data de Inclusão:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataInclusao"
                    value={values.dataInclusao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataInclusao && !errors.dataInclusao}
                    isInvalid={touched.dataInclusao && errors.dataInclusao}
                    className={styles.input}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataInclusao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} className={styles.formGroup}>
                  <Form.Label>Categoria:</Form.Label>
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Informe a categoria da peça:"
                      value={novaCategoria}
                      onChange={(e) => setNovaCategoria(e.target.value)}
                      onBlur={handleBlur}
                      className={styles.input}
                    />
                    <div className="text-end mt-2">
                      <Button
                        variant="outline-primary"
                        onClick={(e) =>
                          handleAddCategoria(e, setFieldValue, values)
                        }
                        disabled={!novaCategoria.trim()}
                      >
                        Adicionar Categoria
                      </Button>
                    </div>
                  </div>
                  <ul>
                    {values.categoria.map((categoria, index) => (
                      <li key={index}>{categoria}</li>
                    ))}
                  </ul>
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  onClick={() => router.push("/pecas")}
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
