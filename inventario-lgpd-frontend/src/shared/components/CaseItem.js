import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 *
 *
 * @param {{item:CaseItemObject}} props
 *
 */
const CaseItem = (props) => {
  console.log(props.item);

  return (
    <tr>
      <td>
        <Link to={`${props.item.id}`}>{props.item.nome}</Link>
      </td>
      <td>{props.item.id}</td>
      <td>{props.item.area}</td>
      <td>{props.item.dataCriacao}</td>
      <td>{props.item.dataAtualizacao}</td>
      <td>{props.item.finalidade}</td>
      <td>{props.item.hipoteseTratamento}</td>
      <td>{props.item.dadosPessoaisSensiveis ? "SIM" : "NÃO"}</td>
    </tr>
  );
};

CaseItem.propTypes = {
  item: PropTypes.shape({
    nome: PropTypes.string,
    id: PropTypes.number,
    area: PropTypes.string,
    dataCriacao: PropTypes.string,
    dataAtualizacao: PropTypes.string,
    finalidade: PropTypes.string,
    hipoteseTratamento: PropTypes.string,
    dadosPessoaisSensiveis: PropTypes.bool,
  }),
};

export default CaseItem;
