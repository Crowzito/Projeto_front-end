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

export default function FuncionariosFormPage(props) {
  const router = useRouter();

  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  const id = props.searchParams.id;
  const funcionarioEditado = funcionarios.find((item) => item.id == id);

  function salvar(dados) {
    if (funcionarioEditado) {
      Object.assign(funcionarioEditado, dados);
      localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    } else {
      dados.id = v4();
      funcionarios.push(dados);
      localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    }
    alert("funcionario criado com sucesso!");
    router.push("/funcionarios");
  }

  const initialValues = {
    nome: "",
    cargo: "",
    cpf: "Brasil",
    cep: "",
    telefone: "",
    email: "",
    dataContrato: "",
    salario: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo Obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    cep: Yup.string().required("Campo Obrigatório"),
    telefone: Yup.string().required("Campo Obrigatório"),
    email: Yup.string().email().required("Campo Obrigatório"),
    dataContrato: Yup.string().required("Campo Obrigatório"),
    salario: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo="Cadastro de funcionarios">
      <Formik
        initialValues={funcionarioEditado || initialValues}
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
                <Form.Label>Cargo e Funções:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="cargo"
                  rows={3}
                  value={values.cargo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cargo && !errors.cargo}
                  isInvalid={touched.cargo && errors.cargo}
                  className={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cargo}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>CEP:</Form.Label>
                <InputMask
                  mask="99999-999"
                  value={values.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.input}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="cep"
                      isValid={touched.cep && !errors.cep}
                      isInvalid={touched.cep && errors.cep}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cep}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>CPF:</Form.Label>
                <InputMask
                  mask="999.999.999-99"
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.input}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="cpf"
                      isValid={touched.cpf && !errors.cpf}
                      isInvalid={touched.cpf && errors.cpf}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
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
                <Form.Label>Data do Contrato:</Form.Label>
                <Form.Control
                  type="date"
                  name="dataContrato"
                  value={values.dataContrato}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataContrato && !errors.dataContrato}
                  isInvalid={touched.dataContrato && errors.dataContrato}
                  className={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataContrato}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className={styles.formGroup}>
                <Form.Label>Salário:</Form.Label>
                <InputMask
                  mask="R$ 9999,99"
                  value={values.salario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="salario"
                      isValid={touched.salario && !errors.salario}
                      isInvalid={touched.salario && errors.salario}
                      className={styles.input}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.salario}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={() => router.push("/funcionarios")}
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
