import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useFormikContext, getIn } from "formik";
import {
  FullCaseObject,
  tipoGarantiaTranferenciaInternacional,
} from "../../../shared/models/FullCase.model";

const Section13FormRow = (props: {
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
          name={`${props.name}.nomeOrganizacao`}
          value={getIn(values, `${props.name}.nomeOrganizacao`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.nomeOrganizacao`) &&
            !getIn(errors, `${props.name}.nomeOrganizacao`)
          }
          isInvalid={!!getIn(errors, `${props.name}.nomeOrganizacao`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.pais`}
          value={getIn(values, `${props.name}.pais`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.pais`) &&
            !getIn(errors, `${props.name}.pais`)
          }
          isInvalid={!!getIn(errors, `${props.name}.pais`)}
        />
      </Col>
      <Col>
        <Form.Control
          disabled={props.disabled}
          type="text"
          name={`${props.name}.dadosTransferidos`}
          value={getIn(values, `${props.name}.dadosTransferidos`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.dadosTransferidos`) &&
            !getIn(errors, `${props.name}.dadosTransferidos`)
          }
          isInvalid={!!getIn(errors, `${props.name}.dadosTransferidos`)}
        />
      </Col>
      <Col>
        <Form.Select
          disabled={props.disabled}
          name={`${props.name}.tipoGarantia`}
          value={getIn(values, `${props.name}.tipoGarantia`)}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={
            getIn(touched, `${props.name}.tipoGarantia`) &&
            !getIn(errors, `${props.name}.tipoGarantia`)
          }
          isInvalid={!!getIn(errors, `${props.name}.tipoGarantia`)}
        >
          {Object.values(tipoGarantiaTranferenciaInternacional).map((tip) => (
            <option value={tip} key={tip}>
              {tip}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Section13FormRow;
