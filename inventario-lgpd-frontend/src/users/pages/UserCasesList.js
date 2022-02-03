import React from "react";
import CasesList from "./../../shared/components/CasesList";

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
    },
  ];

  return <CasesList items={CASES} />;
};

export default UserCasesList;
