import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useFormikContext, getIn } from "formik";
import {
  fontesRetencao,
  FullCaseObject,
} from "../../../shared/models/FullCase.model";

const Section7FormRow = (props: {
  tooltip: JSX.Element;
  label: string;
  disabled: boolean;
  name: string;
  className: string;
}) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FullCaseObject>();

  return (
    <Row className={props.className}>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip className="text-muted">{props.tooltip}</Tooltip>}
      >
        <Form.Label as={Col}>{props.label}</Form.Label>
      </OverlayTrigger>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.descricao`}
          value={getIn(values, `${props.name}.descricao`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.descricao`) &&
            !getIn(errors, `${props.name}.descricao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.descricao`)}
        />
        <Form.Control.Feedback type="invalid">
          Esse campo é obrigatório
        </Form.Control.Feedback>
      </Col>
      <Col>
        <Form.Control
          disabled={
            props.disabled ||
            !(getIn(values, `${props.name}.descricao`) !== "Não se aplica")
          }
          type="text"
          name={`${props.name}.tempoRetencao`}
          value={getIn(values, `${props.name}.tempoRetencao`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tempoRetencao`) &&
            !getIn(errors, `${props.name}.tempoRetencao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tempoRetencao`)}
        />
      </Col>
      <Col>
        <Form.Select
          disabled={
            props.disabled ||
            !(getIn(values, `${props.name}.descricao`) !== "Não se aplica")
          }
          name={`${props.name}.fonteRetencao`}
          value={getIn(values, `${props.name}.fonteRetencao`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.fonteRetencao`) &&
            !getIn(errors, `${props.name}.fonteRetencao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.fonteRetencao`)}
        >
          {Object.values(fontesRetencao).map((fnt) => (
            <option value={fnt} key={fnt}>
              {fnt}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control
          disabled={
            props.disabled ||
            !(getIn(values, `${props.name}.descricao`) !== "Não se aplica")
          }
          type="text"
          name={`${props.name}.caminhoRedeSistema`}
          value={getIn(values, `${props.name}.caminhoRedeSistema`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.caminhoRedeSistema`) &&
            !getIn(errors, `${props.name}.caminhoRedeSistema`)
          }
          isInvalid={!!getIn(errors, `${props.name}.caminhoRedeSistema`)}
        />
      </Col>
    </Row>
  );
};

export default Section7FormRow;
