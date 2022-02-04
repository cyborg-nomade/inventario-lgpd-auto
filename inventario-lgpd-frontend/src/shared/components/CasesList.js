import React from "react";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

import CaseItem from "./CaseItem";

/**
 *
 *
 * @param {{items:CaseItemObject[]}} props
 *
 */
const CasesList = (props) => {
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
    <Table striped bordered hover variant="dark">
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

CasesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      id: PropTypes.number,
      area: PropTypes.string,
      dataCriacao: PropTypes.string,
      dataAtualizacao: PropTypes.string,
      finalidade: PropTypes.string,
      hipoteseTratamento: PropTypes.string,
      dadosPessoaisSensiveis: PropTypes.bool,
    })
  ),
};

export default CasesList;