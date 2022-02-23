import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "../../App";
import { CaseItemObject } from "../../shared/models/cases.model";
import CasesList from "../../cases/components/CasesList";
import { useHttpClient } from "./../../shared/hooks/http-hook";

const UserCasesList = () => {
  const uid = useParams().uid;

  const [cases, setCases] = useState<CaseItemObject[]>([]);

  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const getAllCases = async () => {
      const responseData = await sendRequest(`${CONNSTR}/cases/user/${uid}`);

      const loadedCases: CaseItemObject[] = responseData.cases;

      setCases(loadedCases);
    };

    getAllCases().catch((error) => {
      console.log(error);
    });
  }, [uid, sendRequest]);

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
      <h1>Página Inicial - Todos os seus itens</h1>
      <CasesList items={filteredCases} />
    </React.Fragment>
  );
};

export default UserCasesList;
