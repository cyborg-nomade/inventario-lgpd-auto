import React from "react";
import PropTypes from "prop-types";

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
      <td>{props.item.nome}</td>
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
