import React, { useEffect, useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "../../App";
import { CaseItemObject } from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import CasesList from "../../cases/components/CasesList";

const UserCasesList = () => {
  const { userId: uid, token } = useContext(AuthContext);

  const [cases, setCases] = useState<CaseItemObject[]>([]);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getUserCases = async () => {
      console.log(token);

      const responseData = await sendRequest(
        `${CONNSTR}/cases/user/${uid}`,
        undefined,
        undefined,
        {
          Authorization: "Bearer " + token,
        }
      );
      console.log(responseData);

      const loadedCases: CaseItemObject[] = responseData.cases;
      setCases(loadedCases);
    };

    getUserCases().catch((error) => {
      console.log(error);
    });
  }, [uid, sendRequest, token]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <h1>Página Inicial - Todos os seus itens</h1>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <CasesList items={cases} />
    </React.Fragment>
  );
};

export default UserCasesList;
