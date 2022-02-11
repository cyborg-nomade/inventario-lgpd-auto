import { Link } from "react-router-dom";
import { CaseItemObject } from "../../shared/models/CaseListItem.model";

const CaseItem = (props: { item: CaseItemObject }) => {
  return (
    <tr>
      <td>
        <Link to={`${props.item.id}`}>{props.item.nome}</Link>
      </td>
      <td>{props.item.id}</td>
      <td>{props.item.area}</td>
      {/* <td>{props.item.dataCriacao.toDateString()}</td>
      <td>{props.item.dataAtualizacao.toDateString()}</td> */}
      <td>{props.item.finalidade}</td>
      <td>{props.item.hipoteseTratamento}</td>
      <td>{props.item.dadosPessoaisSensiveis ? "SIM" : "NÃO"}</td>
    </tr>
  );
};

export default CaseItem;
