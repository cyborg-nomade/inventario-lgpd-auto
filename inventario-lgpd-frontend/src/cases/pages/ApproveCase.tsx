import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "../../App";
import {
  emptyFullCaseObject,
  BaseFullCaseObject,
} from "../../shared/models/cases.model";
import CaseForm from "../components/CaseForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const ApproveCase = () => {
  const cid = useParams().cid;
  let navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [fullCase, setFullCase] = useState<BaseFullCaseObject>(
    emptyFullCaseObject()
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getCaseToApprove = async () => {
      console.log(token);

      const responseData = await sendRequest(
        `${CONNSTR}/cases/${cid}`,
        undefined,
        undefined,
        { Authorization: "Bearer " + token }
      );

      let loadedCase = responseData.case;

      setFullCase(loadedCase);
    };

    getCaseToApprove().catch((error) => {
      console.log(error);
    });

    // return () => {
    //   setFullCase(emptyFullCaseObject());

    // };
  }, [cid, sendRequest, token]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  const submitFormHandler = async (item: BaseFullCaseObject) => {
    console.log(item);
    item.aprovado = true;

    console.log(item);

    try {
      const responseData = await sendRequest(
        `${CONNSTR}/cases/${cid}`,
        "PUT",
        JSON.stringify(item),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData);
      navigate(`/comite/cases`);
    } catch (err) {
      console.log(err);
      setFullCase(item);
    }
  };

  return (
    <React.Fragment>
      <h1>Aprovar Item</h1>
      {error && (
        <Row className="justify-content-center">
          <Alert variant="danger" onClose={clearError} dismissible>
            Ocorreu um erro: {error}
          </Alert>
        </Row>
      )}
      <CaseForm item={fullCase} approve={true} onSubmit={submitFormHandler} />
    </React.Fragment>
  );
};

export default ApproveCase;
