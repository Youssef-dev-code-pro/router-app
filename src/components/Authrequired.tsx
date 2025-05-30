import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function Auth() {
  const location = useLocation();
  console.log(location);

  const context = useContext(AuthContext);
  if (!context) {
    return <h3>Loading...</h3>;
  }

  const { auth } = context;

  if (!auth) {
    return (
      <Navigate
        to="login"
        replace
        state={{ message: "You Must Login First!", from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
