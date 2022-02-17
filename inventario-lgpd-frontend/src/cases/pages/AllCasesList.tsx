import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import CasesList from "../components/CasesList";
import {
  CaseItemObject,
  hipotesesTratamento,
  reduceCaseObject,
} from "../../shared/models/cases.model";
import { User } from "../../shared/models/users.model";
import { CONNSTR } from "./../../App";

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
  const [cases, setCases] = useState<CaseItemObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCases = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${CONNSTR}cases.json`);
      if (!response.ok) {
        throw new Error("Algo deu errado!");
      }

      const responseData = await response.json();

      const loadedCases: CaseItemObject[] = [];

      for (const key in responseData) {
        loadedCases.push({ ...reduceCaseObject(responseData[key]), id: key });
      }

      console.log(loadedCases);

      setCases(loadedCases);
      setIsLoading(false);
    };

    getAllCases().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  if (error) {
    return (
      <Row className="justify-content-center">
        <Alert variant="danger">{error}</Alert>
      </Row>
    );
  }

  const approvedCases = cases.filter((item) => item.aprovado);

  return <CasesList items={approvedCases} />;
};

export default AllCasesList;
