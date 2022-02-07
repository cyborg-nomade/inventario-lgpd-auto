import { FullCaseObject } from "../../shared/models/FullCase.model";

import CaseForm from "./CaseForm";

const NewCase = () => {
  const submitFormHandler = (item: FullCaseObject) => {
    console.log(item);
  };

  return <CaseForm new={true} onSubmit={submitFormHandler} />;
};

export default NewCase;
