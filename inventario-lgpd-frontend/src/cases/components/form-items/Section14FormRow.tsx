import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormikContext, getIn } from "formik";

import { FullCaseObject } from "../../../shared/models/FullCase.model";

const Section14FormRow = (props: {
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FullCaseObject>();

  return (
    <Row className={props.className}>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.numeroContrato`}
          value={getIn(values, `${props.name}.numeroContrato`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.numeroContrato`) &&
            !getIn(errors, `${props.name}.numeroContrato`)
          }
          isInvalid={!!getIn(errors, `${props.name}.numeroContrato`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.numeroProcessoContratacao`}
          value={getIn(values, `${props.name}.numeroProcessoContratacao`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.numeroProcessoContratacao`) &&
            !getIn(errors, `${props.name}.numeroProcessoContratacao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.numeroProcessoContratacao`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.objetoContrato`}
          value={getIn(values, `${props.name}.objetoContrato`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.objetoContrato`) &&
            !getIn(errors, `${props.name}.objetoContrato`)
          }
          isInvalid={!!getIn(errors, `${props.name}.objetoContrato`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="email"
          name={`${props.name}.emailGestorContrato`}
          value={getIn(values, `${props.name}.emailGestorContrato`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.emailGestorContrato`) &&
            !getIn(errors, `${props.name}.emailGestorContrato`)
          }
          isInvalid={!!getIn(errors, `${props.name}.emailGestorContrato`)}
        />
        <Form.Control.Feedback type="invalid">
          Utilize um e-mail válido.
        </Form.Control.Feedback>
      </Col>
    </Row>
  );
};

export default Section14FormRow;
