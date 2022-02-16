import CaseForm from "../components/CaseForm";
import {
  emptyFullCaseObject,
  FullCaseObject,
} from "./../../shared/models/cases.model";

const NewCase = () => {
  const submitFormHandler = (item: FullCaseObject) => {
    console.log(item);
  };

  const emptyItem = emptyFullCaseObject();

  return <CaseForm new={true} onSubmit={submitFormHandler} item={emptyItem} />;
};

export default NewCase;
