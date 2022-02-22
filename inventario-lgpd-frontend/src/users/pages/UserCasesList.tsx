import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "../../App";
import {
  CaseItemObject,
  reduceCaseObject,
} from "../../shared/models/cases.model";
import CasesList from "../../cases/components/CasesList";

const UserCasesList = () => {
  const uid = useParams().uid;

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

  const filteredCases = cases.filter((item) => item.criador.userCode === uid);

  return (
    <React.Fragment>
      <h1>Página Inicia - Todos os seus itens</h1>
      <CasesList items={filteredCases} />
    </React.Fragment>
  );
};

export default UserCasesList;
