import axios from "axios";

const AUTH_URL = 'http://localhost:8080/auth'

type loginParam = {
  username: string;
  password: string;
}
export async function loginRequest({ username, password }: loginParam) {
  const res = await axios.post(`${AUTH_URL}/signIn`, { username, password },
    {
      headers: {
        "Content-Type": "application/json"
      }
    });

  return res.data;
}