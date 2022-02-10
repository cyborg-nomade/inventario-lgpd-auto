import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormikContext, getIn } from "formik";

import {
  FullCaseObject,
  tipoRiscoPrivacidade,
} from "../../../shared/models/FullCase.model";

const Section16FormRow = (props: {
  label: string;
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FullCaseObject>();

  return (
    <Row className={props.className}>
      <Form.Label as={Col}>{props.label}</Form.Label>
      <Col lg={8}>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.descricaoObs`}
          value={getIn(values, `${props.name}.descricaoObs`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.descricaoObs`) &&
            !getIn(errors, `${props.name}descricaoObs`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricaoObs`)}
        />
      </Col>
    </Row>
  );
};

export default Section16FormRow;
