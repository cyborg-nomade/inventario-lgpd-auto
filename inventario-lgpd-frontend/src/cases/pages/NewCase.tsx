import { FullCaseObject } from "../../shared/models/FullCase.model";

import CaseForm from "../components/CaseForm";
import { emptyFullCaseObject } from "./../../shared/models/FullCase.model";

const NewCase = () => {
  const submitFormHandler = (item: FullCaseObject) => {
    console.log(item);
  };

  const emptyItem = emptyFullCaseObject();

  return <CaseForm new={true} onSubmit={submitFormHandler} item={emptyItem} />;
};

export default NewCase;
