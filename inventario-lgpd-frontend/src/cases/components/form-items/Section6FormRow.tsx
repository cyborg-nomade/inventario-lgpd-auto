import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useFormikContext, getIn } from "formik";
import {
  FullCaseObject,
  hipotesesTratamento,
} from "../../../shared/models/FullCase.model";

const Section6FormRow = (props: {
  tooltip: JSX.Element;
  label: string;
  disabled: boolean;
  name: string;
  type: string;
  invalid: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FullCaseObject>();

  return (
    <Row className="mb-3">
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip className="text-muted">{props.tooltip}</Tooltip>}
      >
        <Form.Label as={Col}>{props.label}</Form.Label>
      </OverlayTrigger>
      <Col lg={8}>
        {props.type === "select" && (
          <Form.Select
            disabled={props.disabled}
            name={props.name}
            value={getIn(values, props.name)}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={getIn(touched, props.name) && !getIn(errors, props.name)}
            isInvalid={!!getIn(errors, props.name)}
          >
            {Object.values(hipotesesTratamento).map((hip) => (
              <option value={hip} key={hip}>
                {hip}
              </option>
            ))}
          </Form.Select>
        )}
        {props.type === "text" && (
          <Form.Control
            disabled={props.disabled}
            type="text"
            name={props.name}
            value={getIn(values, props.name)}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={getIn(touched, props.name) && !getIn(errors, props.name)}
            isInvalid={!!getIn(errors, props.name)}
          />
        )}
        <Form.Control.Feedback type="invalid">
          {props.invalid}
        </Form.Control.Feedback>
      </Col>
    </Row>
  );
};

export default Section6FormRow;
