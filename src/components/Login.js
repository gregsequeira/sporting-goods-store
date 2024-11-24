import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import "../css/Login.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const [warning, setWarning] = useState("");

  const initialValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  // validate credentials
  const handleLogin = (values) => {
    const { username, password } = values;

    if (
      userDetails &&
      userDetails.username === username &&
      userDetails.password === password
    ) {
      dispatch(login(values));
      setWarning("");
      navigate("/products");
    } else {
      setWarning("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {warning && <div className="warningMessage">{warning}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage
              name="username"
              component="div"
              className="errorMessage"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="errorMessage"
            />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
      <div>
        <p>
          Don't have an account?{" "}
          <Link className="regButton" to="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
