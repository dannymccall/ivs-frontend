import React, { useState, useEffect } from "react";
import "../../App.css";
import Header from "../WidgetComponents/Header";
import MyInput, { MyLabel, MyButton } from "../WidgetComponents/MyInput";
import { makeRequest,url } from "../../utils/make-request";
import { saveCredentials, getCredentials } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState({ error: false, erorrMsg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (credentials.username === "" || credentials.password === "") {
      setShowError({
        ...showError,
        error: true,
        erorrMsg: "Please we need all your credentials",
      });
      setIsSubmitting(false);
      return;
    } else setShowError(false);

    const data = await makeRequest(
      `${url}/login.php`,
      'POST',
      credentials,
      'login'
    );
    console.log(data)
    const { success, message, user } = data;
    if (!success) {
      setIsSubmitting(false);
      setShowError({
        ...showError,
        error: true,
        erorrMsg: message,
      });
    } else {
      console.log(user[0]);
      setIsSubmitting(false);
      await saveCredentials("credentials", user[0]);
      navigate("/auth/dashboard");
    }
  }

  useEffect(() => {
    async function fetchCredentials() {
      const credentials = await getCredentials("credentials");
      console.log(credentials);
      if (credentials !== undefined) navigate("/auth/dashboard");
    }

    fetchCredentials();
  }, []);
  return (
    <>
      <div className="container">
        <Header />
        <div className="body">
          <div className="section">
            <div className="form">
              <form action="">
                <p>Login</p>
                {showError.error && <span>{showError.erorrMsg}</span>}
                <MyLabel labelType="username" labelName="Username" />
                <MyInput
                  type="text"
                  value={credentials.username}
                  className="textInput"
                  name="username"
                  onChange={(e) => {
                    setShowError(false);
                    setCredentials({
                      ...credentials,
                      username: e.target.value,
                    });
                  }}
                />
                <MyLabel labelType="password" labelName="Password" />
                <MyInput
                  type="password"
                  value={credentials.password}
                  className="textInput"
                  name="password"
                  onChange={(e) => {
                    setShowError(false);
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                  }}
                />
                {isSubmitting && (
                  <MyButton
                    type="button"
                    buttonName="Loading..."
                    className="disabled"
                    onClick={handleSubmit}
                    disabled={true}
                  />
                )}
                {!isSubmitting && (
                  <MyButton
                    type="button"
                    buttonName="Submit"
                    className="submitBtn"
                    onClick={handleSubmit}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
