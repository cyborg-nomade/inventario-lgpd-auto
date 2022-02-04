import React from "react";
import CasesList from "../../cases/pages/CasesList";
import { useParams } from "react-router-dom";

const UserCasesList = () => {
  const CASES = [
    {
      nome: "0800 - RELACIONAMENTO COM O PASSAGEIRO",
      id: Math.floor(Math.random() * 1000),
      area: "DRMP",
      dataCriacao: "19/04/2021",
      dataAtualizacao: "19/04/2021",
      finalidade:
        "Identificação, atendimento de manifestações, histórico de atendimentos, acompanhamento de demandas recorrentes.",
      hipoteseTratamento:
        "Cumprimento de obrigação legal ou regulatória pelo controlador.",
      dadosPessoaisSensiveis: true,
      criador: "1",
    },
    {
      nome: "CREDENCIAMENTO DO TRABALHADOR DESEMPREGADO",
      id: Math.floor(Math.random() * 1000),
      area: "DRMP",
      dataCriacao: "19/04/2021",
      dataAtualizacao: "26/05/2021",
      finalidade: "Emissão de credencial do trabalhador desempregado.",
      hipoteseTratamento:
        "Cumprimento de obrigação legal ou regulatória pelo controlador.",
      dadosPessoaisSensiveis: false,
      criador: "1",
    },
    {
      nome: "ACHADOS E PERDIDOS",
      id: Math.floor(Math.random() * 1000),
      area: "DRMP",
      dataCriacao: "19/04/2021",
      dataAtualizacao: "26/05/2021",
      finalidade:
        "Identificação e tratamento de itens perdidos no sistema CPTM.",
      hipoteseTratamento:
        "Cumprimento de obrigação legal ou regulatória pelo controlador.",
      dadosPessoaisSensiveis: false,
      criador: "2",
    },
  ];

  const uid = useParams().uid;
  const filteredCases = CASES.filter((item) => item.criador === uid);

  return <CasesList items={filteredCases} />;
};

export default UserCasesList;
