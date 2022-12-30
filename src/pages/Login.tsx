import { ChangeEvent, FormEvent, useState } from "react";
import login from "../api/user/login";
import { LoginRequestType } from "../types/user";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);

  // input change handler
  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    checkValidation();
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkValidation();
  };

  // submit handler
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request: LoginRequestType = {
      email: id,
      password,
    };

    const response = await login(request);

    if (!response.token) {
      alert("로그인에 실패하였습니다");
      return;
    }

    localStorage.setItem("accessToken", response.token);
  };

  // validation
  const checkValidation = () => {
    // email
    //  blank check
    if (id.length <= 0) {
      setError(true);
      return;
    }
    // includes @. check
    if (!id.includes("@") || !id.includes(".")) {
      setError(true);
      return;
    }
    // password
    // length check
    if (password.length < 8) {
      setError(true);
      return;
    }
    setError(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        <h1>Login</h1>
        <div>
          <label htmlFor="login-id">Email: </label>
          <input id="login-id" value={id} onChange={handleChangeId} />
        </div>
        <div>
          <label htmlFor="login-password">Password: </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            autoComplete="off"
          />
        </div>
        <button type="submit" disabled={error}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
