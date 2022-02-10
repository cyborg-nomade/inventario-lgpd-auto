import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormikContext, getIn } from "formik";

import {
  FullCaseObject,
  tipoRiscoPrivacidade,
} from "../../../shared/models/FullCase.model";

const Section15FormRow = (props: {
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
      <Col>
        <Form.Select
          disabled={props.disabled}
          name={`${props.name}.tipoRisco`}
          value={getIn(values, `${props.name}.tipoRisco`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoRisco`) &&
            !getIn(errors, `${props.name}.tipoRisco`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoRisco`)}
        >
          {Object.values(tipoRiscoPrivacidade).map((tip) => (
            <option value={tip} key={tip}>
              {tip}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.observacoes`}
          value={getIn(values, `${props.name}.observacoes`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.observacoes`) &&
            !getIn(errors, `${props.name}.observacoes`)
          }
          isInvalid={!!getIn(errors, `${props.name}.observacoes`)}
        />
      </Col>
    </Row>
  );
};

export default Section15FormRow;
