import React, { useState } from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import PasswordStr from "../PasswordStr";
import { LandingPage } from "./NotePage.jsx";

export const SignUpPage = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange
}) => {
  const [isNewUser, setIsNewUser] = useState(false);
  console.log(isNewUser)
  return (
    <div> {(isNewUser) ? <LandingPage /> :
      <div className="loginBox">
        <h1>Sign Up</h1>
        {/* {errors.message && <p style={{ color: "red" }}>{errors.message}</p>} */}

        <form onSubmit={onSubmit}>
          <TextField
            name="firstName"
            floatingLabelText="First Name"
            value={user.firstName}
            onChange={onChange}
            errorText={errors.firstName}
          />

          <TextField
            name="lastName"
            floatingLabelText="Last Name"
            value={user.lastName}
            onChange={onChange}
            errorText={errors.lastName}
          />

          <TextField
            name="username"
            floatingLabelText="username"
            value={user.username}
            onChange={onChange}
            errorText={errors.username}
          />
          <TextField
            name="email"
            floatingLabelText="email"
            value={user.email}
            onChange={onChange}
            errorText={errors.email}
          />
          <TextField
            type={type}
            name="password"
            floatingLabelText="password"
            value={user.password}
            onChange={onPwChange}
            errorText={errors.password}
          />

          <div className="pwStrRow">
            {score >= 1 && (
              <div>
                <PasswordStr score={score} />
                <FlatButton
                  className="pwShowHideBtn"
                  label={btnTxt} onClick={pwMask}
                  style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
                />
              </div>
            )}
          </div>
          <TextField
            type={type}
            name="pwconfirm"
            floatingLabelText="confirm password"
            value={user.pwconfirm}
            onChange={onChange}
            errorText={errors.pwconfirm}
          />
          <br />
          <RaisedButton
            className="signUpSubmit"
            primary={true}
            type="submit"
            label="submit"
          />
        </form>
        <p>
          Aleady have an account? <br />
          <button onClick={() => setIsNewUser(true)}>Log in here</button>
        </p>
      </div>}
    </div>
  );
};
