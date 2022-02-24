import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { CONNSTR } from "./../../App";
import {
  emptyBaseFullCaseObject,
  BaseFullCaseObject,
} from "./../../shared/models/cases.model";
import CaseForm from "../components/CaseForm";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const NewCase = () => {
  const uid = useContext(AuthContext).userId;
  let navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitFormHandler = async (item: BaseFullCaseObject) => {
    console.log(item);

    item.area = item.extensaoEncarregado.area || "";
    item.criador = uid;
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.descricao !== "Não se aplica") {
        item.dadosPessoaisSensiveis = true;
      }
    }

    console.log(item);

    try {
      const responseData = await sendRequest(
        `${CONNSTR}/cases/`,
        "POST",
        JSON.stringify(item),
        {
          "Content-Type": "application/json",
        }
      );

      console.log(responseData);
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  const emptyItem = emptyBaseFullCaseObject();

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
      <h1>Registrar Novo Item</h1>
      {error && (
        <Row className="justify-content-center">
          <Alert variant="danger" onClose={clearError} dismissible>
            Ocorreu um erro: {error}
          </Alert>
        </Row>
      )}
      <CaseForm new={true} onSubmit={submitFormHandler} item={emptyItem} />
    </React.Fragment>
  );
};

export default NewCase;
