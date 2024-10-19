import React, { useState, useEffect } from "react";
import "../../App.css";
import Header from "../WidgetComponents/Header";
import MyInput, { MyLabel, MyButton } from "../WidgetComponents/MyInput";
import { makeRequest, url } from "../../utils/make-request";
import { saveCredentials, getCredentials } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showError, setShowError] = useState({ error: false, errorMsg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (credentials.username === "" || credentials.password === "") {
      setShowError({
        error: true,
        errorMsg: "Please provide all your credentials.",
      });
      setIsSubmitting(false);
      return;
    } else {
      setShowError({ error: false, errorMsg: "" });
    }

    const data = await makeRequest(
      `${url}/login.php`,
      'POST',
      credentials,
      'login'
    );
    
    const { success, message, user } = data;
    if (!success) {
      setIsSubmitting(false);
      setShowError({
        error: true,
        errorMsg: message,
      });
    } else {
      await saveCredentials("credentials", user[0]);
      setIsSubmitting(false);
      navigate(user[0].userType === 'repairer' ? "/auth/repairersDashboard" : "/auth/dashboard");
    }
  };

  useEffect(() => {
    async function fetchCredentials() {
      const credentials = await getCredentials("credentials");
      if (credentials && credentials.userType) {
        navigate(credentials.userType === 'admin' ? "/auth/dashboard" : "/auth/repairersDashboard");
      }
    }

    fetchCredentials();
  }, [navigate]);

  return (
    <div className="container">
      <Header />
      <div className="body">
        <div className="section">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <p>Login</p>
              {showError.error && <span>{showError.errorMsg}</span>}
              <MyLabel labelType="username" labelName="Username" />
              <MyInput
                type="text"
                value={credentials.username}
                className="textInput"
                name="username"
                onChange={(e) => {
                  setShowError({ error: false, errorMsg: "" });
                  setCredentials((prev) => ({ ...prev, username: e.target.value }));
                }}
              />
              <MyLabel labelType="password" labelName="Password" />
              <MyInput
                type="password"
                value={credentials.password}
                className="textInput"
                name="password"
                onChange={(e) => {
                  setShowError({ error: false, errorMsg: "" });
                  setCredentials((prev) => ({ ...prev, password: e.target.value }));
                }}
              />
              <MyButton
                type="submit"
                buttonName={isSubmitting ? "Loading..." : "Submit"}
                className={isSubmitting ? "disabled" : "submitBtn"}
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
