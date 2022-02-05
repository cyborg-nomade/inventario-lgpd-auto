import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

import CaseItem from "./CaseItem";
import { CaseItemObject } from "./../../shared/models/CaseListItem.model";

const CasesList = (props: { items: CaseItemObject[] }) => {
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

  return (
    <Table striped bordered hover variant="light" responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>ID</th>
          <th>Área</th>
          <th>Data de Criação do Inventário</th>
          <th>Data de Atualização do Inventário</th>
          <th>Finalidade</th>
          <th>Hipotese de Tratamento</th>
          <th>Trata Dados Pessoais Sensíveis?</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) => (
          <CaseItem key={item.id} item={item} />
        ))}
      </tbody>
    </Table>
  );
};

export default CasesList;
