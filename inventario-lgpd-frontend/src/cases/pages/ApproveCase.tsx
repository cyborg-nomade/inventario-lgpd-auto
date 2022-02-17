import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "../../App";
import {
  emptyFullCaseObject,
  FullCaseObject,
} from "../../shared/models/cases.model";
import CaseForm from "../components/CaseForm";

const ApproveCase = () => {
  const cid = useParams().cid;

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
    item.aprovado = true;

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

    navigate(`/comite/cases`);
  };

  return (
    <React.Fragment>
      <h1>Aprovar Item</h1>
      <CaseForm item={fullCase} approve={true} onSubmit={submitFormHandler} />
    </React.Fragment>
  );
};

export default ApproveCase;
