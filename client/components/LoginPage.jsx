import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

export const LoginPage = ({
  onSubmit,
  onChange,
  errors,
  user,
  type,
  onPwChange
}) => {
  return (
    <div className="loginBox">
      <h1>Login</h1>
      {/* {errors.message && <p style={{ color: "red" }}>{errors.message}</p>} */}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          floatingLabelText="user name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        <TextField
          type={type}
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />
        <br />
        <RaisedButton
          className="loginSubmit"
          primary={true}
          type="submit"
          label="submit"
        />
      </form>
      <p>
        New User Registration<br />
        <a href="/">Sign up here</a>
      </p>
    </div>
  );
};
