import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { login } from "../services/auth-service";
import IUser from "../types/user.type";

const Login: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Email must be provided"),
    password: Yup.string().required("Password must be provided"),
  });

  const handleSignIn = async (formValue: IUser) => {
    setMessage("");
    setLoading(true);
    const { username, password } = formValue;
    const response = await login(username, password);
    if (response.success) {
      navigate("/");
      window.location.reload();
    } else {
      setMessage(response.errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="form-signin">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        <Form className="needs-validation" noValidate>
          <div>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="username"> Username </label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"> Password </label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign In</span>
              </button>
            </div>
          </div>

          <div className="mt-2">
            <span>Dont have an account? </span>
            <span className="loginText" onClick={() => navigate("/signup")}>
              Register
            </span>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
