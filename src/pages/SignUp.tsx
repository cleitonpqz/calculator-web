import * as Yup from "yup";
import { register } from "../services/auth-service";
import IUser from "../types/user.type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("This is not a valid email")
      .required("Email must be provided"),
    password: Yup.string()
      .test(
        "len",
        "The password must be at least 8 characters.",
        (val: any) => val && val.toString().length >= 8
      )
      .required("Password must be provided"),
  });

  const handleSignUp = async (formValue: IUser) => {
    const { username, password } = formValue;
    const response = await register(username, password);
    if (response.success) {
      setMessage(response.success);
      setSuccessful(true);
    } else {
      setMessage(response.errorMessage);
      setSuccessful(false);
    }
  };

  return (
    <div className="form-signin">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        <Form className="needs-validation" noValidate>
          {!successful && (
            <div>
              <h1 className="h3 mb-3 font-weight-normal">Create account</h1>
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
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </div>

              <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => navigate("/login")}>
                  Login here
                </span>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
                {successful && <Link to={"/login"}>Click here to signin</Link>}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
