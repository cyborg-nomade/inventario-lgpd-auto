import CaseForm from "../components/CaseForm";
import { CONNSTR } from "./../../App";
import {
  emptyFullCaseObject,
  FullCaseObject,
} from "./../../shared/models/cases.model";

const NewCase = () => {
  const submitFormHandler = async (item: FullCaseObject) => {
    console.log(item);
    console.log(CONNSTR);

    const response = await fetch(`${CONNSTR}cases.json`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const emptyItem = emptyFullCaseObject();

  return <CaseForm new={true} onSubmit={submitFormHandler} item={emptyItem} />;
};

export default NewCase;
