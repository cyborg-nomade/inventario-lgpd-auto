import CasesList from "../../cases/components/CasesList";
import { useParams } from "react-router-dom";
import { CASES } from "../../cases/pages/AllCasesList";

const UserCasesList = () => {
  const uid = useParams().uid || 0;
  const filteredCases = CASES.filter((item) => item.criador === +uid);

  return <CasesList items={filteredCases} />;
};

export default UserCasesList;
