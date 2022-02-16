import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { BaseUser } from "./../../shared/models/users.model";
import { AuthContext } from "./../../shared/context/auth-context";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
});

const initialValues: BaseUser = {
  username: "",
  password: "",
};

const Login = () => {
  const authContext = useContext(AuthContext);
  let navigate = useNavigate();

  const submitLoginHandler = (user: BaseUser) => {
    console.log(user);
    if (user.username === "user1") {
      authContext.login("1", false);
      navigate(`/1/cases`);
      return;
    }
    if (user.username === "user2") {
      authContext.login("2", false);
      navigate(`/2/cases`);
      return;
    }
    if (user.username === "comite") {
      authContext.login("100", true);
      navigate(`/comite/cases`);
      return;
    }
    alert("Usuário não encontrado, tente novamente");
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitLoginHandler}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        dirty,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Card className="mx-auto" style={{ width: "28rem" }}>
            <Card.Title className="pt-3 px-3">Login</Card.Title>
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik01">
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    Esse campo é obrigatório
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik01">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    A senha deve ter pelo menos 6 caracteres, um caracter
                    especial, uma letra maiúscula e um número
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button
                type="submit"
                className="float-end mt-3"
                disabled={!(isValid && dirty)}
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
