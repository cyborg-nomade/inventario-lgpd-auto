import React from "react";
import { CaseItemObject } from "../../shared/models/CaseListItem.model";
import CasesList from "./../components/CasesList";
import { CASES } from "./AllCasesList";

const ApproveCaseList = () => {
  return <CasesList items={CASES} />;
};

export default ApproveCaseList;
