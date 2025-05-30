import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext, useState } from "react";
import { z } from "zod";
import axios from "axios";

type ErrorType = {
  message: string;
};

const AxiosCatch = z.object({
  response: z.object({
    data: z.object({
      message: z.string(),
    }),
  }),
});

export default function Login() {
  const [error, setError] = useState<ErrorType | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/host";

  const context = useContext(AuthContext);
  if (!context) {
    return <h3>Loading...</h3>;
  }
  const { setAuth } = context;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
      setError({ message: "invalid input data" });
      setAuth(false);
      return;
    }
    try {
      await axios.post("/api/login", { email, password });
      navigate(from, { replace: true });
      setAuth(true);
      setError(null);
    } catch (err: unknown) {
      setAuth(false);
      if (typeof err === "object" && err !== null && "response" in err) {
        const parsed = AxiosCatch.safeParse(err);
        if (parsed.success) {
          setError({ message: parsed.data.response.data.message });
          return;
        }
      }
      setError({ message: "Unknown error happened" });
    }
  };
  return (
    <div className="login-container">
      <h3>{location.state.message}</h3>
      <h1>Sign in to your account</h1>
      {error?.message && <h3 className="red">{error.message}</h3>}
      <form onSubmit={handleSubmit} method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
