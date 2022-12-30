import { LoginRequestType, LoginResponseType } from "../../types/user";

const login = async (request: LoginRequestType): Promise<LoginResponseType> => {
  const res = await fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const result = await res.json();

  return result;
};

export default login;
