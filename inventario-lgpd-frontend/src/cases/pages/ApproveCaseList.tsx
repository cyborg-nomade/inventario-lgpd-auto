import CasesList from "./../components/CasesList";
import { CASES } from "./AllCasesList";

const ApproveCaseList = () => {
  const notApprovedCases = CASES.filter((item) => !item.aprovado);

  return <CasesList items={notApprovedCases} />;
};

export default ApproveCaseList;
