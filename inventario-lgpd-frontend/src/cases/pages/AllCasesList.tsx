import CasesList from "../components/CasesList";
import {
  CaseItemObject,
  hipotesesTratamento,
} from "../../shared/models/cases.model";
import { User } from "../../shared/models/users.model";

export const USERS: User[] = [
  {
    username: "user1",
    password: "Usuario1!",
    isComite: false,
    userCode: "1",
  },
  {
    username: "user2",
    password: "Usuario2!",
    isComite: false,
    userCode: "2",
  },
  {
    username: "comite",
    password: "Comite100!",
    isComite: true,
    userCode: "100",
  },
];

export const CASES: CaseItemObject[] = [
  {
    nome: "0800 - RELACIONAMENTO COM O PASSAGEIRO",
    ref: "",
    id: Math.floor(Math.random() * 1000).toString(),
    area: "DRMP",
    dataCriacao: new Date("2021-04-19").toLocaleDateString("pt-BR"),
    dataAtualizacao: new Date("2021-04-19").toLocaleDateString("pt-BR"),
    finalidadeTratamento: {
      descricaoFinalidade:
        "Identificação, atendimento de manifestações, histórico de atendimentos, acompanhamento de demandas recorrentes.",
      hipoteseTratamento: hipotesesTratamento.obrigacaoLegal,
    },
    dadosPessoaisSensiveis: true,
    criador: USERS[0],
    aprovado: false,
  },
  {
    nome: "CREDENCIAMENTO DO TRABALHADOR DESEMPREGADO",
    id: Math.floor(Math.random() * 1000).toString(),
    ref: "",
    area: "DRMP",
    dataCriacao: new Date("2021-04-21").toLocaleDateString("pt-BR"),
    dataAtualizacao: new Date("2021-05-26").toLocaleDateString("pt-BR"),
    finalidadeTratamento: {
      descricaoFinalidade: "Emissão de credencial do trabalhador desempregado.",
      hipoteseTratamento: hipotesesTratamento.obrigacaoLegal,
    },
    dadosPessoaisSensiveis: false,
    criador: USERS[0],
    aprovado: true,
  },
  {
    nome: "ACHADOS E PERDIDOS",
    id: Math.floor(Math.random() * 1000).toString(),
    ref: "",
    area: "DRMP",
    dataCriacao: new Date("2021-04-21").toLocaleDateString("pt-BR"),
    dataAtualizacao: new Date("2021-05-26").toLocaleDateString("pt-BR"),
    finalidadeTratamento: {
      descricaoFinalidade:
        "Identificação e tratamento de itens perdidos no sistema CPTM.",
      hipoteseTratamento: hipotesesTratamento.obrigacaoLegal,
    },
    dadosPessoaisSensiveis: false,
    criador: USERS[1],
    aprovado: false,
  },
];

const AllCasesList = () => {
  return <CasesList items={CASES} />;
};

export default AllCasesList;
