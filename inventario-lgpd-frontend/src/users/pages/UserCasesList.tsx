import CasesList from "../../cases/pages/CasesList";
import { useParams } from "react-router-dom";
import { CaseItemObject } from "./../../shared/models/CaseListItem.model";

const CASES: CaseItemObject[] = [
  {
    nome: "0800 - RELACIONAMENTO COM O PASSAGEIRO",
    id: Math.floor(Math.random() * 1000),
    area: "DRMP",
    dataCriacao: new Date("19/04/2021"),
    dataAtualizacao: new Date("19/04/2021"),
    finalidade:
      "Identificação, atendimento de manifestações, histórico de atendimentos, acompanhamento de demandas recorrentes.",
    hipoteseTratamento:
      "Cumprimento de obrigação legal ou regulatória pelo controlador.",
    dadosPessoaisSensiveis: true,
    criador: 1,
    aprovado: false,
  },
  {
    nome: "CREDENCIAMENTO DO TRABALHADOR DESEMPREGADO",
    id: Math.floor(Math.random() * 1000),
    area: "DRMP",
    dataCriacao: new Date("19/04/2021"),
    dataAtualizacao: new Date("26/05/2021"),
    finalidade: "Emissão de credencial do trabalhador desempregado.",
    hipoteseTratamento:
      "Cumprimento de obrigação legal ou regulatória pelo controlador.",
    dadosPessoaisSensiveis: false,
    criador: 1,
    aprovado: true,
  },
  {
    nome: "ACHADOS E PERDIDOS",
    id: Math.floor(Math.random() * 1000),
    area: "DRMP",
    dataCriacao: new Date("19/04/2021"),
    dataAtualizacao: new Date("26/05/2021"),
    finalidade: "Identificação e tratamento de itens perdidos no sistema CPTM.",
    hipoteseTratamento:
      "Cumprimento de obrigação legal ou regulatória pelo controlador.",
    dadosPessoaisSensiveis: false,
    criador: 2,
    aprovado: false,
  },
];

const UserCasesList = () => {
  const uid = useParams().uid || 0;
  const filteredCases = CASES.filter((item) => item.criador === +uid);

  return <CasesList items={filteredCases} />;
};

export default UserCasesList;
