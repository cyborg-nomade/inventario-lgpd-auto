import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Formik } from "formik";
import * as yup from "yup";

import {
  emptyFullCaseObject,
  FullCaseObject,
  verbosTratamento,
} from "./../../shared/models/FullCase.model";
import TagPicker from "../../shared/components/UI/TagPicker";

type onSubmitFn = (item: FullCaseObject) => void;
type onDeleteFn = (itemId: number) => void;

const schema = yup.object().shape({
  nome: yup.string().required(),
  id: yup.number().required(),
  dataCriacao: yup.date().required(),
  dataAtualizacao: yup.date().required(),
  controlador: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().optional(),
    telefone: yup.string().optional(),
    email: yup.string().email().optional(),
  }),
  encarregado: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().optional(),
    telefone: yup.string().optional(),
    email: yup.string().email().optional(),
  }),
  extensaoEncarregado: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().required(),
    telefone: yup.string().required(),
    email: yup.string().email().required(),
  }),
  areaTratamentoDados: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().required(),
    telefone: yup.string().required(),
    email: yup.string().email().required(),
  }),
  operador: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().optional(),
    telefone: yup.string().optional(),
    email: yup.string().email().optional(),
  }),
  fasesCicloTratamento: yup.object({
    coleta: yup.boolean(),
    retencao: yup.boolean(),
    processamento: yup.boolean(),
    compartilhamento: yup.boolean(),
    eliminacao: yup.boolean(),
    verbos: yup
      .array()
      .of(yup.mixed<verbosTratamento>().oneOf(Object.values(verbosTratamento))),
  }),
  descricaoFluxoTratamento: yup.string().required(),
});

const CaseForm = (props: {
  item?: FullCaseObject;
  new?: boolean;
  edit?: boolean;
  approve?: boolean;
  onSubmit: onSubmitFn;
  onDelete?: onDeleteFn;
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={props.onSubmit!}
      initialValues={emptyFullCaseObject()}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Identificação</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={!!errors.nome}
                    />
                    <Form.Text className="text-muted">
                      Informar nome do serviço ofertado à sociedade ou nome do
                      processo de negócio que realiza tratamento dos dados
                      pessoais. Exemplo: Avaliações de Alimentos; Cancelamento e
                      Renovação de Registros de Alimentos; e etc..
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      value={values.id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.id && !errors.id}
                      isInvalid={!!errors.id}
                    />
                    <Form.Text className="text-muted">
                      Digite o Número ou um ID para identificação da atividade
                      de tratamento de dados pessoais relacionada ao serviço /
                      processo de negócio. Exemplo de Número de Referência:
                      0001. 0002 e etc. Exemplo de ID adotando Sigla do Serviço
                      informado no campo "Nome do serviço/ Processo de Negócio:
                      AVA, CRRA e etc.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label>Data de Criação do Inventário</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataCriacao"
                      value={values.dataCriacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataCriacao && !errors.dataCriacao}
                      isInvalid={!!errors.dataCriacao}
                    />
                    <Form.Text className="text-muted">
                      Informar data de criação do inventário de dados pessoais.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Informe uma data válida
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik04">
                    <Form.Label>Data Atualização do Inventário</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataAtualizacao"
                      value={values.dataAtualizacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.dataAtualizacao && !errors.dataAtualizacao
                      }
                      isInvalid={!!errors.dataAtualizacao}
                    />
                    <Form.Text className="text-muted">
                      Informar data da última atualização do inventário.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Informe uma data válida
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Agentes de Tratamento e Encarregado
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Label as={Col}></Form.Label>
                  <Form.Label as={Col}>Nome</Form.Label>
                  <Form.Label as={Col}>Área</Form.Label>
                  <Form.Label as={Col}>Telefone</Form.Label>
                  <Form.Label as={Col}>E-mail</Form.Label>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Pessoa natural ou jurídica, de direito público ou
                          privado, a quem competem as decisões referentes ao
                          tratamento de dados pessoais (LGPD, art. 5º, IV).
                          Informar o nome do órgão ou entidade.
                        </Tooltip>
                      }
                    >
                      <Form.Label>Controlador</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="controlador.nome"
                      value={values.controlador.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.controlador?.nome && !errors.controlador?.nome
                      }
                      isInvalid={!!errors.controlador?.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Pessoa indicada pelo controlador e operador para atuar
                          como canal de comunicação entre o controlador, os
                          titulares dos dados e a Autoridade Nacional de
                          Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Encarregado</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="encarregado.nome"
                      value={values.encarregado.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.encarregado?.nome && !errors.encarregado?.nome
                      }
                      isInvalid={!!errors.encarregado?.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Pessoa indicada pelo controlador e operador para atuar
                          como canal de comunicação entre o controlador, os
                          titulares dos dados e a Autoridade Nacional de
                          Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Extensão Encarregado</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="extensaoEncarregado.nome"
                      value={values.extensaoEncarregado.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.extensaoEncarregado?.nome &&
                        !errors.extensaoEncarregado?.nome
                      }
                      isInvalid={!!errors.extensaoEncarregado?.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="extensaoEncarregado.area"
                      value={values.extensaoEncarregado.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.extensaoEncarregado?.area &&
                        !errors.extensaoEncarregado?.area
                      }
                      isInvalid={!!errors.extensaoEncarregado?.area}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="tel"
                      name="extensaoEncarregado.telefone"
                      value={values.extensaoEncarregado.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.extensaoEncarregado?.telefone &&
                        !errors.extensaoEncarregado?.telefone
                      }
                      isInvalid={!!errors.extensaoEncarregado?.telefone}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="email"
                      name="extensaoEncarregado.email"
                      value={values.extensaoEncarregado.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.extensaoEncarregado?.email &&
                        !errors.extensaoEncarregado?.email
                      }
                      isInvalid={!!errors.extensaoEncarregado?.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Utilize um e-mail válido.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Pessoa indicada pelo controlador e operador para atuar
                          como canal de comunicação entre o controlador, os
                          titulares dos dados e a Autoridade Nacional de
                          Proteção de Dados - ANPD (LGPD, art. 5º, VIII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Área Tratamento Dados</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="areaTratamentoDados.nome"
                      value={values.areaTratamentoDados.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.areaTratamentoDados?.nome &&
                        !errors.areaTratamentoDados?.nome
                      }
                      isInvalid={!!errors.areaTratamentoDados?.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="areaTratamentoDados.area"
                      value={values.areaTratamentoDados.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.areaTratamentoDados?.area &&
                        !errors.areaTratamentoDados?.area
                      }
                      isInvalid={!!errors.areaTratamentoDados?.area}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="tel"
                      name="areaTratamentoDados.telefone"
                      value={values.areaTratamentoDados.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.areaTratamentoDados?.telefone &&
                        !errors.areaTratamentoDados?.telefone
                      }
                      isInvalid={!!errors.areaTratamentoDados?.telefone}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="email"
                      name="areaTratamentoDados.email"
                      value={values.areaTratamentoDados.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.areaTratamentoDados?.email &&
                        !errors.areaTratamentoDados?.email
                      }
                      isInvalid={!!errors.areaTratamentoDados?.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Utilize um e-mail válido
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Pessoa natural ou jurídica, de direito público ou
                          privado, que realiza o tratamento de dados pessoais em
                          nome do controlador; (LGPD, art. 5º, VII)
                        </Tooltip>
                      }
                    >
                      <Form.Label>Operador</Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="operador.nome"
                      value={values.operador.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.operador?.nome && !errors.operador?.nome}
                      isInvalid={!!errors.operador?.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                  <Col>
                    <Form.Control disabled />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Fases do Ciclo de Vida do Tratamento de Dados Pessoais
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Label as={Col}></Form.Label>
                  <Form.Label as={Col}>Coleta</Form.Label>
                  <Form.Label as={Col}>Retenção</Form.Label>
                  <Form.Label as={Col}>Processamento</Form.Label>
                  <Form.Label as={Col}>Compartilhamento</Form.Label>
                  <Form.Label as={Col}>Eliminação</Form.Label>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Informações sobre o ciclo de vida do tratamento de
                          dados pessoais podem ser observadas no capítulo 3 do
                          Guia de Boas Práticas LGPD, disponível em
                          https://www.gov.br/governodigital/pt-br/governanca-de-dados/guia-de-boas-praticas-lei-geral-de-protecao-de-dados-lgpd
                        </Tooltip>
                      }
                    >
                      <Form.Label>
                        Em qual fase do ciclo de vida o Operador atua?
                      </Form.Label>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="fasesCicloTratamento.coleta"
                      name="fasesCicloTratamento.coleta"
                      checked={values.fasesCicloTratamento.coleta}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="fasesCicloTratamento.retencao"
                      name="fasesCicloTratamento.retencao"
                      checked={values.fasesCicloTratamento.retencao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="fasesCicloTratamento.processamento"
                      name="fasesCicloTratamento.processamento"
                      checked={values.fasesCicloTratamento.processamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="fasesCicloTratamento.compartilhamento"
                      name="fasesCicloTratamento.compartilhamento"
                      checked={values.fasesCicloTratamento.compartilhamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="fasesCicloTratamento.eliminacao"
                      name="fasesCicloTratamento.eliminacao"
                      checked={values.fasesCicloTratamento.eliminacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Verbos de Tratamento</Form.Label>
                  </Col>
                  <Col lg={10}>
                    <TagPicker
                      name="fasesCicloTratamento.verbos"
                      onChange={(tags) =>
                        setFieldValue("fasesCicloTratamento.verbos", tags)
                      }
                    />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Fluxo de Tratamento de Dados Pessoais
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip className="text-muted">
                        Descrever como (de que forma) os dados pessoais são
                        coletados, retidos/armazenados, processados/ usados e
                        eliminados. Nessa seção, pode até ser colocado um
                        desenho com um fluxo de dados. Abaixo, segue exemplo de
                        descrição do fluxo de dados.
                      </Tooltip>
                    }
                  >
                    <Form.Label as={Col}>Descrição do Fluxo</Form.Label>
                  </OverlayTrigger>
                  <Col lg={10}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="descricaoFluxoTratamento"
                      value={values.descricaoFluxoTratamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.descricaoFluxoTratamento &&
                        !errors.descricaoFluxoTratamento
                      }
                      isInvalid={!!errors.descricaoFluxoTratamento}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                Escopo e Natureza dos Dados Pessoais
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Label as={Col}>
                    Abrangência da área geográfica do tratamento
                  </Form.Label>
                  <Col lg={10}>
                    <Form.Control
                      type="text"
                      name="abrangenciaGeografica"
                      value={values.abrangenciaGeografica}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.abrangenciaGeografica &&
                        !errors.abrangenciaGeografica
                      }
                      isInvalid={!!errors.abrangenciaGeografica}
                    />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button type="submit" className="float-end">
            Submit form
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CaseForm;
