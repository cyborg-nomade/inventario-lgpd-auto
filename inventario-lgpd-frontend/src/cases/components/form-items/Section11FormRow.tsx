import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useFormikContext, getIn } from "formik";
import { FullCaseObject } from "../../../shared/models/FullCase.model";

const Section11FormRow = (props: {
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
          name={`${props.name}.nomeInstituicao`}
          value={getIn(values, `${props.name}.nomeInstituicao`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.nomeInstituicao`) &&
            !getIn(errors, `${props.name}.nomeInstituicao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.nomeInstituicao`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.dadosCompartilhados`}
          value={getIn(values, `${props.name}.dadosCompartilhados`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.dadosCompartilhados`) &&
            !getIn(errors, `${props.name}.dadosCompartilhados`)
          }
          isInvalid={!!getIn(errors, `${props.name}.dadosCompartilhados`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.finalidadeCompartilhamento`}
          value={getIn(values, `${props.name}.finalidadeCompartilhamento`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.finalidadeCompartilhamento`) &&
            !getIn(errors, `${props.name}.finalidadeCompartilhamento`)
          }
          isInvalid={
            !!getIn(errors, `${props.name}.finalidadeCompartilhamento`)
          }
        />
      </Col>
    </Row>
  );
};

export default Section11FormRow;
