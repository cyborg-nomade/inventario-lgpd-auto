import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Formik, getIn } from "formik";
import * as yup from "yup";

import {
  emptyFullCaseObject,
  fontesRetencao,
  FullCaseObject,
  hipotesesTratamento,
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
    verbos: yup.array(),
  }),
  descricaoFluxoTratamento: yup.string().required(),
  abrangenciaGeografica: yup.string().required(),
  fonteDados: yup.string().required(),
  finalidadeTratamento: yup.object().shape({
    hipoteseTratamento: yup.string().required(),
    descricaoFinalidade: yup.string().required(),
    previsaoLegal: yup.string().required(),
    resultadosTitular: yup.string().required(),
    beneficiosEsperados: yup.string().required(),
  }),
  categoriaDadosPessoais: yup.object().shape({
    identificacao: yup.object().shape({
      idPessoal: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      idGov: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      idEletronica: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      locEletronica: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
    }),
    financeiros: yup.object().shape({
      idFin: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      recursosFin: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      dividasDespesas: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      solvencia: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      emprestimosHipotecaCredito: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      assistenciaFin: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      apoliceSeguro: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      planoPensao: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      transacaoFin: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      compensacao: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      atividadeProfissional: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      acordosAjustes: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      autorizacoesConsentimentos: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
    }),
    caracteristicas: yup.object().shape({
      detalhesPessoais: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      detalhesMilitares: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      situacaoImigracao: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
      descricaoFisica: yup.object().shape({
        descricao: yup.string().required(),
        tempoRetencao: yup.string().optional(),
        fonteRetencao: yup.string().optional(),
        caminhoRedeSistema: yup.string().optional(),
      }),
    }),
  }),
});

const CaseForm = (props: {
  item?: FullCaseObject;
  new?: boolean;
  edit?: boolean;
  approve?: boolean;
  onSubmit: onSubmitFn;
  onDelete?: onDeleteFn;
}) => {
  const isEditing = props.new || false;

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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="controlador.nome"
                      value={values.controlador.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "controlador.nome") &&
                        !getIn(errors, "controlador.nome")
                      }
                      isInvalid={!!getIn(errors, "controlador.nome")}
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
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="encarregado.nome"
                      value={values.encarregado.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "encarregado.nome") &&
                        !getIn(errors, "encarregado.nome")
                      }
                      isInvalid={!!getIn(errors, "encarregado.nome")}
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
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="extensaoEncarregado.nome"
                      value={values.extensaoEncarregado.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "extensaoEncarregado.nome") &&
                        !getIn(errors, "extensaoEncarregado.nome")
                      }
                      isInvalid={!!getIn(errors, "extensaoEncarregado.nome")}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="extensaoEncarregado.area"
                      value={values.extensaoEncarregado.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "extensaoEncarregado.area") &&
                        !getIn(errors, "extensaoEncarregado.area")
                      }
                      isInvalid={!!getIn(errors, "extensaoEncarregado.area")}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="tel"
                      name="extensaoEncarregado.telefone"
                      value={values.extensaoEncarregado.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "extensaoEncarregado.telefone") &&
                        !getIn(errors, "extensaoEncarregado.telefone")
                      }
                      isInvalid={
                        !!getIn(errors, "extensaoEncarregado.telefone")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="email"
                      name="extensaoEncarregado.email"
                      value={values.extensaoEncarregado.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "extensaoEncarregado.email") &&
                        !getIn(errors, "extensaoEncarregado.email")
                      }
                      isInvalid={!!getIn(errors, "extensaoEncarregado.email")}
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
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="areaTratamentoDados.nome"
                      value={values.areaTratamentoDados.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "areaTratamentoDados.nome") &&
                        !getIn(errors, "areaTratamentoDados.nome")
                      }
                      isInvalid={!!getIn(errors, "areaTratamentoDados.nome")}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="areaTratamentoDados.area"
                      value={values.areaTratamentoDados.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "areaTratamentoDados.area") &&
                        !getIn(errors, "areaTratamentoDados.area")
                      }
                      isInvalid={!!getIn(errors, "areaTratamentoDados.area")}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="tel"
                      name="areaTratamentoDados.telefone"
                      value={values.areaTratamentoDados.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "areaTratamentoDados.telefone") &&
                        !getIn(errors, "areaTratamentoDados.telefone")
                      }
                      isInvalid={
                        !!getIn(errors, "areaTratamentoDados.telefone")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="email"
                      name="areaTratamentoDados.email"
                      value={values.areaTratamentoDados.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "areaTratamentoDados.email") &&
                        !getIn(errors, "areaTratamentoDados.email")
                      }
                      isInvalid={!!getIn(errors, "areaTratamentoDados.email")}
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
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="operador.nome"
                      value={values.operador.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "operador.nome") &&
                        !getIn(errors, "operador.nome")
                      }
                      isInvalid={!!getIn(errors, "operador.nome")}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                      disabled={props.edit || props.approve || !isEditing}
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
                    <br />
                    <Form.Text className="text-muted">
                      {Object.values(verbosTratamento).map(
                        (verbo) => `${verbo}, `
                      )}
                    </Form.Text>
                  </Col>
                  <Col lg={8}>
                    <TagPicker
                      disabled={props.edit || props.approve || !isEditing}
                      name="fasesCicloTratamento.verbos"
                      onChange={(tags) =>
                        setFieldValue("fasesCicloTratamento.verbos", tags)
                      }
                      value={values.fasesCicloTratamento.verbos}
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
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      as="textarea"
                      rows={5}
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
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
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
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label as={Col}>
                    Fonte de dados utilizada para obtenção dos dados pessoais
                  </Form.Label>
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="fonteDados"
                      value={values.fonteDados}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.fonteDados && !errors.fonteDados}
                      isInvalid={!!errors.fonteDados}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                Finalidade do Tratamento de Dados Pessoais
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip className="text-muted">
                        As hipóteses de tratamento estão descritas nos arts. 7º
                        e 11 da LGPD.
                        <br />
                        <b>
                          Os órgãos e entidades da administração pública tem a
                          prerrogativa de tratar os dados pessoais para o
                          exercício de suas competências legais ou execução de
                          políticas públicas sem a necessidade de obter
                          consentimento do titular dos dados pessoais.
                        </b>
                      </Tooltip>
                    }
                  >
                    <Form.Label as={Col}>Hipótese de Tratamento</Form.Label>
                  </OverlayTrigger>
                  <Col lg={8}>
                    <Form.Select
                      disabled={props.edit || props.approve || !isEditing}
                      name="finalidadeTratamento.hipoteseTratamento"
                      value={values.finalidadeTratamento.hipoteseTratamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(
                          touched,
                          "finalidadeTratamento.hipoteseTratamento"
                        ) &&
                        !getIn(
                          errors,
                          "finalidadeTratamento.hipoteseTratamento"
                        )
                      }
                      isInvalid={
                        !!getIn(
                          errors,
                          "finalidadeTratamento.hipoteseTratamento"
                        )
                      }
                    >
                      {Object.values(hipotesesTratamento).map((hip) => (
                        <option value={hip} key={hip}>
                          {hip}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip className="text-muted">
                        Razão ou motivo pela qual se deseja tratar os dados
                        pessoais. É importantíssimo estabelecer claramente a
                        finalidade, pois é ela que justifica o tratamento de
                        dados pessoais e fornece os elementos para informar o
                        titular dos dados.
                      </Tooltip>
                    }
                  >
                    <Form.Label as={Col}>Finalidade</Form.Label>
                  </OverlayTrigger>
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="finalidadeTratamento.descricaoFinalidade"
                      value={values.finalidadeTratamento.descricaoFinalidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(
                          touched,
                          "finalidadeTratamento.descricaoFinalidade"
                        ) &&
                        !getIn(
                          errors,
                          "finalidadeTratamento.descricaoFinalidade"
                        )
                      }
                      isInvalid={
                        !!getIn(
                          errors,
                          "finalidadeTratamento.descricaoFinalidade"
                        )
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip className="text-muted">
                        Informar Lei, Decreto, normativo ou regulamento que
                        respalda a finalidade do tratamento de dados pessoais
                        realizado.
                        <br />
                        <br />
                        <b>
                          Exemplo fícitício de previsão legal considerando o
                          Programa de Localização de Desaparecidos:
                        </b>
                        <br />• Decreto nº 8.956, de 25 de janeiro de 2218,
                        institui o Programa de Localização de Desaparecidos.
                      </Tooltip>
                    }
                  >
                    <Form.Label as={Col}>Previsão legal</Form.Label>
                  </OverlayTrigger>
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="finalidadeTratamento.previsaoLegal"
                      value={values.finalidadeTratamento.previsaoLegal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(touched, "finalidadeTratamento.previsaoLegal") &&
                        !getIn(errors, "finalidadeTratamento.previsaoLegal")
                      }
                      isInvalid={
                        !!getIn(errors, "finalidadeTratamento.previsaoLegal")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label as={Col}>
                    Resultados pretendidos para o titular de dados
                  </Form.Label>
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="finalidadeTratamento.resultadosTitular"
                      value={values.finalidadeTratamento.resultadosTitular}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(
                          touched,
                          "finalidadeTratamento.resultadosTitular"
                        ) &&
                        !getIn(errors, "finalidadeTratamento.resultadosTitular")
                      }
                      isInvalid={
                        !!getIn(
                          errors,
                          "finalidadeTratamento.resultadosTitular"
                        )
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label as={Col}>
                    Benefícios esperados para o órgão, entidade ou para a
                    sociedade como um todo
                  </Form.Label>
                  <Col lg={8}>
                    <Form.Control
                      disabled={props.edit || props.approve || !isEditing}
                      type="text"
                      name="finalidadeTratamento.beneficiosEsperados"
                      value={values.finalidadeTratamento.beneficiosEsperados}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        getIn(
                          touched,
                          "finalidadeTratamento.beneficiosEsperados"
                        ) &&
                        !getIn(
                          errors,
                          "finalidadeTratamento.beneficiosEsperados"
                        )
                      }
                      isInvalid={
                        !!getIn(
                          errors,
                          "finalidadeTratamento.beneficiosEsperados"
                        )
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Categoria de Dados Pessoais</Accordion.Header>
              <Accordion.Body>
                <Accordion defaultActiveKey="60" alwaysOpen>
                  <Accordion.Item eventKey="60">
                    <Accordion.Header>
                      Dados de Identificação Pessoal
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <Form.Label as={Col}></Form.Label>
                        <Form.Label as={Col}>Descrição</Form.Label>
                        <Form.Label as={Col}>
                          Tempo Retenção dos Dados
                        </Form.Label>
                        <Form.Label as={Col}>Fonte Retenção</Form.Label>
                        <Form.Label as={Col}>
                          Caminho Rede e/ou Sistema CPTM
                        </Form.Label>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Nome, endereço
                              residencia, histórico de endereços anteriores,
                              número de telefone fixo residencial, número
                              celular pessoal, e-mail pessoal, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Informações de identificação pessoal
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idPessoal.descricao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idPessoal?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idPessoal.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idPessoal.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idPessoal.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idPessoal?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idPessoal.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idPessoal.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.identificacao.idPessoal.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idPessoal?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idPessoal.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idPessoal.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idPessoal.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idPessoal?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idPessoal.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idPessoal.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: CPF, RG, número
                              do passaporte, número da carteira de motorista,
                              número da placa, número de registro em conselho
                              profissional, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Informações de identificação atribuídas por
                            instituições governamentais
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idGov.descricao"
                            value={
                              values.categoriaDadosPessoais.identificacao.idGov
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idGov.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idGov.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idGov.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao.idGov
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idGov.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idGov.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.identificacao.idGov.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao.idGov
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idGov.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idGov.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idGov.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.identificacao.idGov
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idGov.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idGov.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Endereços IP,
                              cookies, momentos de conexão etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Dados de identificação eletrônica
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idEletronica.descricao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idEletronica?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idEletronica.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idEletronica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idEletronica.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idEletronica?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idEletronica.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idEletronica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.identificacao.idEletronica.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idEletronica?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idEletronica.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.idEletronica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.idEletronica.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .idEletronica?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.idEletronica.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.idEletronica.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Informar se são tratados dados: dados de
                              comunicação de torres de celulares (ex: GSM),
                              dados de GPS etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Dados de localização eletrônica
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.identificacao.locEletronica.descricao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .locEletronica?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.locEletronica.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.locEletronica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.locEletronica.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .locEletronica?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.locEletronica.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.locEletronica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.identificacao.locEletronica.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .locEletronica?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.locEletronica.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.identificacao.locEletronica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.identificacao.locEletronica.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.identificacao
                                .locEletronica?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.identificacao.locEletronica.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.identificacao.locEletronica.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="61">
                    <Accordion.Header>Dados Financeiros</Accordion.Header>
                    <Accordion.Body>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <Form.Label as={Col}></Form.Label>
                        <Form.Label as={Col}>Descrição</Form.Label>
                        <Form.Label as={Col}>
                          Tempo Retenção dos Dados
                        </Form.Label>
                        <Form.Label as={Col}>Fonte Retenção</Form.Label>
                        <Form.Label as={Col}>
                          Caminho Rede e/ou Sistema CPTM
                        </Form.Label>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Números de
                              identificação, números de contas bancárias,
                              números de cartões de crédito ou débito, códigos
                              secretos.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Dados de identificação financeira
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.idFin.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros.idFin
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.idFin.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.idFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.idFin.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros.idFin
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.idFin.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.idFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.idFin.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros.idFin
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.idFin.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.idFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.idFin.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros.idFin
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.idFin.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.idFin.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Renda, posses,
                              investimentos, renda total, renda profissional,
                              poupança, datas de início e término dos
                              investimentos, receita de investimento, dívidas
                              sobre ativos.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Recursos financeiros</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.recursosFin.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .recursosFin?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.recursosFin.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.recursosFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.recursosFin.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .recursosFin?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.recursosFin.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.recursosFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.recursosFin.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .recursosFin?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.recursosFin.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.recursosFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.recursosFin.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .recursosFin?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.recursosFin.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.recursosFin.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Total de
                              despesas, aluguel, empréstimos, hipotecas e outras
                              formas de crédito.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Dívidas e despesas</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .dividasDespesas?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.dividasDespesas.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .dividasDespesas?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.dividasDespesas.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .dividasDespesas?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.dividasDespesas.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.dividasDespesas.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .dividasDespesas?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.dividasDespesas.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Avaliação do
                              rendimento e avaliação de capacidade de pagamento.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Situação financeira (Solvência)
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.solvencia.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .solvencia?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.solvencia.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.solvencia.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.solvencia.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .solvencia?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.solvencia.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.solvencia.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.solvencia.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .solvencia?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.solvencia.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.solvencia.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.solvencia.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .solvencia?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.solvencia.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.solvencia.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Natureza do
                              empréstimo, valor emprestado, saldo remanescente,
                              data de início, período do empréstimo, taxa de
                              juros, visão geral do pagamento, detalhes sobre as
                              garantias.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Empréstimos, hipotecas, linhas de crédito
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .emprestimosHipotecaCredito?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .emprestimosHipotecaCredito?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .emprestimosHipotecaCredito?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .emprestimosHipotecaCredito?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Benefícios,
                              assistência, bonificações, subsídios, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Assistência financeira
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .assistenciaFin?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.assistenciaFin.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .assistenciaFin?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.assistenciaFin.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .assistenciaFin?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.assistenciaFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.assistenciaFin.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .assistenciaFin?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.assistenciaFin.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Natureza da
                              apólice de seguro, detalhes sobre os riscos
                              cobertos, valores segurados, período segurado,
                              data de rescisão, pagamentos feitos, recebidos ou
                              perdidos, situação do contrato, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Detalhes da apólice de seguro
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .apoliceSeguro?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.apoliceSeguro.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .apoliceSeguro?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.apoliceSeguro.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .apoliceSeguro?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.apoliceSeguro.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.apoliceSeguro.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .apoliceSeguro?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.apoliceSeguro.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Data efetiva do
                              plano de pensão, natureza do plano, data de
                              término do plano, pagamentos recebidos e
                              efetuados, opções, beneficiários, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Detalhes do plano de pensão
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.planoPensao.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .planoPensao?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.planoPensao.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.planoPensao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.planoPensao.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .planoPensao?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.planoPensao.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.planoPensao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.planoPensao.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .planoPensao?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.planoPensao.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.planoPensao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.planoPensao.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .planoPensao?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.planoPensao.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.planoPensao.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Valores pagos e a
                              pagar pelo titular dos dados, linhas de crédito
                              concedidas, avais, forma de pagamento, visão geral
                              do pagamento, depósitos e outras garantias, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Transações financeiras
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .transacaoFin?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.transacaoFin.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .transacaoFin?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.transacaoFin.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.transacaoFin.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .transacaoFin?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.transacaoFin.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.transacaoFin.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.transacaoFin.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .transacaoFin?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.transacaoFin.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.transacaoFin.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Detalhes sobre
                              compensações reivindicadas, valores pagos ou
                              outros tipos de compensação, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Compensação</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.compensacao.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .compensacao?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.compensacao.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.compensacao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.compensacao.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .compensacao?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.compensacao.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.compensacao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.compensacao.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .compensacao?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.compensacao.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.compensacao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.compensacao.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .compensacao?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.compensacao.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.compensacao.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dado de atividades
                              profissionais executadas pelo titular dos dados:
                              natureza da atividade, natureza dos bens ou
                              serviços utilizados ou entregues pela pessoa no
                              registro, relações comerciais, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Atividades profissionais
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .atividadeProfissional?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.atividadeProfissional.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .atividadeProfissional?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.atividadeProfissional.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .atividadeProfissional?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.atividadeProfissional.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.atividadeProfissional.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .atividadeProfissional?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.atividadeProfissional.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Detalhes sobre
                              acordos ou ajustes comerciais; acordos sobre
                              representação ou acordos legais, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Acordos e ajustes</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .acordosAjustes?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.acordosAjustes.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .acordosAjustes?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.acordosAjustes.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .acordosAjustes?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.acordosAjustes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.acordosAjustes.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .acordosAjustes?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.acordosAjustes.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados de: Autorizações
                              ou consentimentos realizados pelo titular de
                              dados, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Autorizações ou consentimentos
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .autorizacoesConsentimentos?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .autorizacoesConsentimentos?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .autorizacoesConsentimentos?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.financeiros
                                .autorizacoesConsentimentos?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.financeiros.autorizacoesConsentimentos.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="62">
                    <Accordion.Header>
                      Características Pessoais
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <Form.Label as={Col}></Form.Label>
                        <Form.Label as={Col}>Descrição</Form.Label>
                        <Form.Label as={Col}>
                          Tempo Retenção dos Dados
                        </Form.Label>
                        <Form.Label as={Col}>Fonte Retenção</Form.Label>
                        <Form.Label as={Col}>
                          Caminho Rede e/ou Sistema CPTM
                        </Form.Label>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Idade, sexo, data
                              de nascimento, local de nascimento, estado civil,
                              nacionalidade.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Detalhes pessoais</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesPessoais?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.detalhesPessoais.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesPessoais?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.caracteristicas.detalhesPessoais.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesPessoais?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.detalhesPessoais.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.detalhesPessoais.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesPessoais?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesPessoais.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Situação militar,
                              patente militar, distinções militares, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Detalhes militares</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesMilitares?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.detalhesMilitares.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesMilitares?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.caracteristicas.detalhesMilitares.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesMilitares?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.detalhesMilitares.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.detalhesMilitares.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .detalhesMilitares?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.detalhesMilitares.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Detalhes sobre o
                              visto, autorização de trabalho, limitações de
                              residência ou movimentação, condições especiais
                              relacionadas à autorização de residência, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Situação de Imigração
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .situacaoImigracao?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.situacaoImigracao.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .situacaoImigracao?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.caracteristicas.situacaoImigracao.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .situacaoImigracao?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.situacaoImigracao.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.situacaoImigracao.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .situacaoImigracao?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.situacaoImigracao.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Dados de descrição física são informações físicas
                              de uma pessoa com possibilidade de serem
                              visivelmente indetificadas. Descrever se são
                              tratados: Altura, peso, cor do cabelo, cor dos
                              olhos, características distintivas, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Descrição Física</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .descricaoFisica?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.descricaoFisica.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .descricaoFisica?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.caracteristicas.descricaoFisica.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .descricaoFisica?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.caracteristicas.descricaoFisica.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.caracteristicas.descricaoFisica.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.caracteristicas
                                .descricaoFisica?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.caracteristicas.descricaoFisica.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="63">
                    <Accordion.Header>Hábitos Pessoais</Accordion.Header>
                    <Accordion.Body>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <Form.Label as={Col}></Form.Label>
                        <Form.Label as={Col}>Descrição</Form.Label>
                        <Form.Label as={Col}>
                          Tempo Retenção dos Dados
                        </Form.Label>
                        <Form.Label as={Col}>Fonte Retenção</Form.Label>
                        <Form.Label as={Col}>
                          Caminho Rede e/ou Sistema CPTM
                        </Form.Label>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Uso de tabaco,
                              uso de álcool , hábito alimentar, dieta alimentar
                              etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Hábitos</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.habitos.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos.habitos
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.habitos.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.habitos.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.habitos.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.habitos
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.habitos.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.habitos.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.habitos.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.habitos
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.habitos.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.habitos.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.habitos.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos.habitos
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.habitos.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.habitos.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Informações sobre
                              o uso de bens ou serviços, comportamento dos
                              titulares dos dados, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Estilo de vida</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.estiloVida.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos.estiloVida
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.estiloVida.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.estiloVida.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.estiloVida.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.estiloVida
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.estiloVida.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.estiloVida.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.estiloVida.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.estiloVida
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.estiloVida.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.estiloVida.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.estiloVida.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos.estiloVida
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.estiloVida.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.estiloVida.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: sobre antigas
                              residências e deslocamentos, visto de viagem,
                              autorizações de trabalho, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Viagens e deslocamentos
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .viagensDeslocamento?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.viagensDeslocamento.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .viagensDeslocamento?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.viagensDeslocamento.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .viagensDeslocamento?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.viagensDeslocamento.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.viagensDeslocamento.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .viagensDeslocamento?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.viagensDeslocamento.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Amigos, parceiros
                              de negócios, relacionamentos com pessoas que não
                              sejam familiares próximos; etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Contatos sociais</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.contatosSociais.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .contatosSociais?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.contatosSociais.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.contatosSociais.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.contatosSociais.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .contatosSociais?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.contatosSociais.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.contatosSociais.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.contatosSociais.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .contatosSociais?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.contatosSociais.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.contatosSociais.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.contatosSociais.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .contatosSociais?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.contatosSociais.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.contatosSociais.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Terra,
                              propriedade ou outros bens.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Posses</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.posses.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos.posses
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.posses.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.posses.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.posses.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.posses
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.posses.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.posses.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.posses.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.posses
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.posses.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.posses.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.posses.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos.posses
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.posses.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.posses.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Informações sobre
                              um acidente, incidente ou denúncia na qual o
                              titular dos dados está envolvido, a natureza dos
                              danos ou ferimentos, pessoas envolvidas,
                              testemunhas, etc.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>
                            Denúncias, incidentes ou acidentes
                          </Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .denunciasIncidentesAcidentes?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .denunciasIncidentesAcidentes?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .denunciasIncidentesAcidentes?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos
                                .denunciasIncidentesAcidentes
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: Distinções civis,
                              administrativas ou militares.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Distinções</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.distincoes.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos.distincoes
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.distincoes.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.distincoes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.distincoes.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.distincoes
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.distincoes.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.distincoes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.distincoes.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.distincoes
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.distincoes.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.distincoes.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.distincoes.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos.distincoes
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.distincoes.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.distincoes.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="text-muted">
                              Descrever se são tratados dados: que definem o
                              comportamento de uso de mídias e meios de
                              comunicação.
                            </Tooltip>
                          }
                        >
                          <Form.Label as={Col}>Uso de mídia</Form.Label>
                        </OverlayTrigger>
                        <Col>
                          <Form.Control
                            disabled={props.edit || props.approve || !isEditing}
                            type="text"
                            name="categoriaDadosPessoais.habitos.usoMidia.descricao"
                            value={
                              values.categoriaDadosPessoais.habitos.usoMidia
                                ?.descricao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.usoMidia.descricao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.descricao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.descricao"
                              )
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Esse campo é obrigatório
                          </Form.Control.Feedback>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.usoMidia.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.usoMidia.tempoRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.usoMidia
                                ?.tempoRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.usoMidia.tempoRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.tempoRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.tempoRetencao"
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.usoMidia.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            name="categoriaDadosPessoais.habitos.usoMidia.fonteRetencao"
                            value={
                              values.categoriaDadosPessoais.habitos.usoMidia
                                ?.fonteRetencao
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.usoMidia.fonteRetencao"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.fonteRetencao"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.fonteRetencao"
                              )
                            }
                          >
                            {Object.values(fontesRetencao).map((fnt) => (
                              <option value={fnt} key={fnt}>
                                {fnt}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={
                              props.edit ||
                              props.approve ||
                              !isEditing ||
                              !(
                                getIn(
                                  values,
                                  "categoriaDadosPessoais.habitos.usoMidia.descricao"
                                ) !== "Não se aplica"
                              )
                            }
                            type="text"
                            name="categoriaDadosPessoais.habitos.usoMidia.caminhoRedeSistema"
                            value={
                              values.categoriaDadosPessoais.habitos.usoMidia
                                ?.caminhoRedeSistema
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={
                              getIn(
                                touched,
                                "categoriaDadosPessoais.habitos.usoMidia.caminhoRedeSistema"
                              ) &&
                              !getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.caminhoRedeSistema"
                              )
                            }
                            isInvalid={
                              !!getIn(
                                errors,
                                "categoriaDadosPessoais.habitos.usoMidia.caminhoRedeSistema"
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button type="submit" className="float-end mt-3">
            Submit form
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CaseForm;
