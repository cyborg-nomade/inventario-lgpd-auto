import React, { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "./../../App";
import { CaseItemObject } from "../../shared/models/cases.model";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import CasesList from "../components/CasesList";
import { AuthContext } from "../../shared/context/auth-context";

const AllCasesList = () => {
  const { token } = useContext(AuthContext);

  const [cases, setCases] = useState<CaseItemObject[]>([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getAllCases = async () => {
      const responseData = await sendRequest(
        `${CONNSTR}/cases/`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );
      const loadedCases: CaseItemObject[] = responseData.cases;
      setCases(loadedCases);
    };

    getAllCases().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  const approvedCases = cases.filter((item) => item.aprovado);

  return (
    <React.Fragment>
      <h1>Página Inicial - Todos os Itens Aprovados</h1>
      {error && (
        <Row className="justify-content-center">
          <Alert variant="danger" onClose={clearError} dismissible>
            {error}
          </Alert>
        </Row>
      )}
      <CasesList items={approvedCases} />
    </React.Fragment>
  );
};

export default AllCasesList;
