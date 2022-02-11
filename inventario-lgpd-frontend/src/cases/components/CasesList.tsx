import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader,
} from "react-bs-datatable";

import CaseItem from "./CaseItem";
import {
  CaseItemObject,
  headersCaseItemObject,
} from "../../shared/models/CaseListItem.model";
import { useNavigate } from "react-router-dom";

const headers: {
  title: string;
  isFilterable: boolean;
  isSortable: boolean;
  prop: headersCaseItemObject;
}[] = [
  { title: "Nome", prop: "nome", isFilterable: true, isSortable: true },
  { title: "ID", prop: "id", isFilterable: true, isSortable: true },
  { title: "Área", prop: "area", isFilterable: true, isSortable: true },
  {
    title: "Data de Criação do Inventário",
    prop: "dataCriacao",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Data de Atualização do Inventário",
    prop: "dataAtualizacao",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Finalidade",
    prop: "finalidade",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Hipotese de Tratamento",
    prop: "hipoteseTratamento",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Trata Dados Pessoais Sensíveis?",
    prop: "dadosPessoaisSensiveis",
    isSortable: true,
    isFilterable: false,
  },
  {
    title: "Usuário Criador",
    prop: "criador",
    isSortable: true,
    isFilterable: false,
  },
  {
    title: "Aprovado",
    prop: "aprovado",
    isSortable: true,
    isFilterable: false,
  },
];

const CasesList = (props: { items: CaseItemObject[] }) => {
  let navigate = useNavigate();

  if (props.items.length === 0) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Nada foi encontrado</Alert.Heading>
        <p>
          Não foi encontrado nenhum item do inventário de casos de uso de dados
          pessoais com o filtro determinado.
        </p>
      </Alert>
    );
  }

  const handleRowClick = (row: CaseItemObject) => {
    navigate(`${row.id}`);
  };

  return (
    <DatatableWrapper
      body={props.items}
      headers={headers}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20],
        },
      }}
    >
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter placeholder="Entre sua busca" />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOpts labels={{ beforeSelect: "Linhas por página" }} />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination
            labels={{
              firstPage: "Primeira",
              lastPage: "Última",
              nextPage: "Próxima",
              prevPage: "Anterior",
            }}
          />
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={headers} />
        <TableBody onRowClick={handleRowClick} />
      </Table>
    </DatatableWrapper>
  );
};

export default CasesList;
