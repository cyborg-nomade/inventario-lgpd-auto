import CasesList from "../components/CasesList";
import { CaseItemObject } from "./../../shared/models/CaseListItem.model";

const AllCasesList = () => {
  const CASES: CaseItemObject[] = [];

  return <CasesList items={CASES} />;
};

export default AllCasesList;
