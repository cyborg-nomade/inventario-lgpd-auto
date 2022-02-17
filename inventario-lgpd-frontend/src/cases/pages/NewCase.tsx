import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CONNSTR } from "./../../App";
import { USERS } from "./AllCasesList";
import {
  emptyFullCaseObject,
  FullCaseObject,
} from "./../../shared/models/cases.model";
import CaseForm from "../components/CaseForm";

let idCounter = 0;

const NewCase = () => {
  const uid = useParams().uid || 101;
  let navigate = useNavigate();

  const submitFormHandler = async (item: FullCaseObject) => {
    console.log(item);

    item.id = (idCounter++).toString();
    item.area = item.extensaoEncarregado.area || "";
    item.criador = USERS[+uid - 1];
    for (const value of Object.values(item.categoriaDadosPessoaisSensiveis)) {
      if (value.descricao !== "Não se aplica") {
        item.dadosPessoaisSensiveis = true;
      }
    }

    console.log(item);

    const response = await fetch(`${CONNSTR}cases.json`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    navigate(`/`);
  };

  const emptyItem = emptyFullCaseObject();

  return (
    <React.Fragment>
      <h1>Registrar Novo Item</h1>
      <CaseForm new={true} onSubmit={submitFormHandler} item={emptyItem} />
    </React.Fragment>
  );
};

export default NewCase;
