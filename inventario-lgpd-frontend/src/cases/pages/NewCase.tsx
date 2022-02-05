import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { Formik } from "formik";
import * as yup from "yup";
// import { FullCaseObject } from "../../shared/models/FullCase.model";

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
    area: yup.string().optional(),
    telefone: yup.string().optional(),
    email: yup.string().email().optional(),
  }),
  areaTratamentoDados: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().optional(),
    telefone: yup.string().optional(),
    email: yup.string().email().optional(),
  }),
  operador: yup.object().shape({
    nome: yup.string().required(),
    area: yup.string().optional(),
    telefone: yup.string().optional(),
    email: yup.string().email().optional(),
  }),
});

const NewCase = () => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        nome: "",
        id: 0,
        dataCriacao: "",
        dataAtualizacao: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Accordion defaultActiveKey="0">
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
                      isValid={touched.nome && !errors.nome}
                      isInvalid={!!errors.nome}
                    />
                    <Form.Text className="text-muted">
                      Informar nome do serviço ofertado à sociedade ou nome do
                      processo de negócio que realiza tratamento dos dados
                      pessoais. Exemplo: Avaliações de Alimentos; Cancelamento e
                      Renovação de Registros de Alimentos; e etc..
                    </Form.Text>
                    <Form.Control.Feedback>Correto!</Form.Control.Feedback>
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
                    <Form.Control.Feedback>Correto!</Form.Control.Feedback>
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
                      isValid={touched.dataCriacao && !errors.dataCriacao}
                      isInvalid={!!errors.dataCriacao}
                    />
                    <Form.Text className="text-muted">
                      Informar data de criação do inventário de dados pessoais.
                    </Form.Text>
                    <Form.Control.Feedback>Correto!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
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
                      isValid={
                        touched.dataAtualizacao && !errors.dataAtualizacao
                      }
                      isInvalid={!!errors.dataAtualizacao}
                    />
                    <Form.Text className="text-muted">
                      Informar data da última atualização do inventário.
                    </Form.Text>
                    <Form.Control.Feedback>Correto!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
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
                  <Form.Label as={Col}>1</Form.Label>
                  <Form.Label as={Col}>1</Form.Label>
                  <Form.Label as={Col}>3</Form.Label>
                  <Form.Label as={Col}>4</Form.Label>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>1</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control />
                  </Col>
                  <Col>
                    <Form.Control />
                  </Col>
                  <Col>
                    <Form.Control />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewCase;
