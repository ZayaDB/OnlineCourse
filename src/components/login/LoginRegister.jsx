import React, { useState } from "react";
import axios from "axios";
import "../../styles/loginregister.css";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

const UserOptions = () => {
  const [isTeacherSignup, setIsTeacherSignup] = useState(false);
  const [isStudentSignup, setIsStudentSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleTeacherSignupClick = () => {
    setIsTeacherSignup(true);
    setIsStudentSignup(false);
  };

  const handleStudentSignupClick = () => {
    setIsStudentSignup(true);
    setIsTeacherSignup(false);
  };

  const handleLoginClick = () => {
    setIsTeacherSignup(false);
    setIsStudentSignup(false);
  };

  // Example improvement: Enhance error handling in handleTeacherSignupSubmit and handleStudentSignupSubmit
  const handleTeacherSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/register/teacher",
        {
          fullName,
          email,
          password,
        }
      );
      setUser({ fullName: result.data.fullName, role: "teacher" });
    } catch (err) {
      alert(`Error registering teacher: ${err.response.data.message}`);
    }
  };

  const handleStudentSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/register/student",
        {
          fullName,
          email,
          password,
        }
      );
      setUser({ fullName: result.data.fullName, role: "student" });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error registering student: ${err.response.data.message}`);
      } else {
        alert(`Error registering student: ${err.message}`);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = isTeacherSignup ? "teacher" : "student";
      const result = await axios.post(`http://localhost:5000/login/${role}`, {
        email,
        password,
      });
      if (result.data.token) {
        setUser({ fullName: result.data.fullName, role });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header user={user} onLogout={() => setUser(null)} />

      <section className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-unregistered">
              <h2 className="user_unregistered-title">
                Don't have an account?
              </h2>
              <p className="user_unregistered-text">
                Banjo tote bag bicycle rights, High Life sartorial cray craft
                beer whatever street art fap.
              </p>
              <button
                className="user_unregistered-signup"
                id="teacher-signup-button"
                onClick={handleTeacherSignupClick}
              >
                Student Sign up
              </button>
              <button
                className="user_unregistered-signup"
                id="student-signup-button"
                onClick={handleStudentSignupClick}
              >
                Teacher Sign up
              </button>
            </div>

            <div className="user_options-registered">
              <h2 className="user_registered-title">Have an account?</h2>
              <p className="user_registered-text">
                Banjo tote bag bicycle rights, High Life sartorial cray craft
                beer whatever street art fap.
              </p>
              <button
                className="user_registered-login"
                id="login-button"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </div>

          <div
            className={`user_options-forms ${
              isTeacherSignup || isStudentSignup ? "bounceLeft" : "bounceRight"
            }`}
            id="user_options-forms"
          >
            <div
              className={`user_forms-login ${
                isTeacherSignup || isStudentSignup ? "" : "visible"
              }`}
            >
              <h2 className="forms_title">Login</h2>
              <form onSubmit={handleLoginSubmit} className="forms_form">
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <label htmlFor="">
                      <input
                        type="email"
                        value={email}
                        className="forms_field-input"
                        required
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>Email</span>
                    </label>
                  </div>
                  <div className="forms_field">
                    <label htmlFor="">
                      <input
                        type="password"
                        className="forms_field-input"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span>Password</span>
                    </label>
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <button type="button" className="forms_buttons-forgot">
                    Forgot password?
                  </button>
                  <button className="forms_buttons-action" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div
              className={`user_forms-signup ${
                isTeacherSignup ? "visible" : ""
              }`}
            >
              <h2 className="forms_title">Teacher Sign Up</h2>
              <form onSubmit={handleTeacherSignupSubmit} className="forms_form">
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <label>
                      <input
                        type="text"
                        className="forms_field-input"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <span>FullName</span>
                    </label>
                  </div>
                  <div className="forms_field">
                    <label>
                      <input
                        type="email"
                        placeholder=""
                        className="forms_field-input"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>Email</span>
                    </label>
                  </div>

                  <div className="forms_field">
                    <label htmlFor="">
                      <input
                        type="password"
                        placeholder=""
                        className="forms_field-input"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span>Password</span>
                    </label>
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <input
                    type="submit"
                    value="Sign up"
                    className="forms_buttons-action"
                  />
                </div>
              </form>
            </div>

            <div
              className={`user_forms-signup ${
                isStudentSignup ? "visible" : ""
              }`}
            >
              <h2 className="forms_title">Student Sign Up</h2>
              <form onSubmit={handleStudentSignupSubmit} className="forms_form">
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <label>
                      <input
                        type="text"
                        className="forms_field-input"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <span>FullName</span>
                    </label>
                  </div>
                  <div className="forms_field">
                    <label>
                      <input
                        type="email"
                        placeholder=""
                        className="forms_field-input"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>Email</span>
                    </label>
                  </div>

                  <div className="forms_field">
                    <label htmlFor="">
                      <input
                        type="password"
                        placeholder=""
                        className="forms_field-input"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span>Password</span>
                    </label>
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <input
                    type="submit"
                    value="Sign up"
                    className="forms_buttons-action"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserOptions;
