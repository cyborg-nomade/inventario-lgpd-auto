import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { CONNSTR } from "../../App";
import {
  CaseItemObject,
  reduceCaseObject,
} from "../../shared/models/cases.model";
import CasesList from "./../components/CasesList";

const ApproveCaseList = () => {
  const [cases, setCases] = useState<CaseItemObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCases = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${CONNSTR}cases.json`);
      if (!response.ok) {
        throw new Error("Algo deu errado!");
      }

      const responseData = await response.json();

      const loadedCases: CaseItemObject[] = [];

      for (const key in responseData) {
        loadedCases.push({ ...reduceCaseObject(responseData[key]), id: key });
      }

      console.log(loadedCases);

      setCases(loadedCases);
      setIsLoading(false);
    };

    getAllCases().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  if (error) {
    return (
      <Row className="justify-content-center">
        <Alert variant="danger">{error}</Alert>
      </Row>
    );
  }

  const notApprovedCases = cases.filter((item) => !item.aprovado);

  return <CasesList items={notApprovedCases} />;
};

export default ApproveCaseList;
