import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "./../../App";

import {
  FullCaseObject,
  emptyFullCaseObject,
} from "../../shared/models/cases.model";
import CaseForm from "../components/CaseForm";
import { USERS } from "./AllCasesList";

const EditCase = () => {
  const cid = useParams().cid || 0;
  const uid = useParams().uid || 101;

  let navigate = useNavigate();

  const [fullCase, setFullCase] = useState<FullCaseObject>(
    emptyFullCaseObject()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCases = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${CONNSTR}cases/${cid}.json`);

      if (!response.ok) {
        throw new Error("Algo deu errado!");
      }

      console.log(response);

      const responseData = await response.json();

      let loadedCase: FullCaseObject = emptyFullCaseObject();

      console.log(loadedCase.fasesCicloTratamento.verbos);
      console.log(responseData.fasesCicloTratamento.verbos);

      loadedCase = {
        ...loadedCase,
        ...responseData,
        fasesCicloTratamento: {
          ...loadedCase.fasesCicloTratamento,
          ...responseData.fasesCicloTratamento,
          verbos:
            responseData.fasesCicloTratamento.verbos ??
            loadedCase.fasesCicloTratamento.verbos,
        },
        categoriaDadosPessoais: {
          ...responseData.categoriaDadosPessoais,
          outros: {
            ...loadedCase.categoriaDadosPessoais.outros,
            ...responseData.categoriaDadosPessoais.outros,
          },
        },
      };

      console.log(loadedCase.fasesCicloTratamento.verbos);

      setFullCase(loadedCase);
      setIsLoading(false);
    };

    getAllCases().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });

    return () => {
      setFullCase(emptyFullCaseObject());
      setIsLoading(false);
      setError(null);
    };
  }, [cid]);

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

  const submitFormHandler = async (item: FullCaseObject) => {
    console.log(item);

    item.area = item.extensaoEncarregado.area || "";
    item.criador = USERS[+uid - 1];
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.descricao !== "Não se aplica") {
        item.dadosPessoaisSensiveis = true;
      }
    }

    console.log(item);
    console.log(`${CONNSTR}cases.json/${cid}.json`);

    const response = await fetch(`${CONNSTR}cases/${cid}.json`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    navigate(`/`);
  };

  return <CaseForm item={fullCase} edit={true} onSubmit={submitFormHandler} />;
};

export default EditCase;
