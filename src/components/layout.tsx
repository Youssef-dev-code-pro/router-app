import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import { useState } from "react";
import { AuthContext } from "../AuthContext";

export default function Layout() {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Header />
        <Outlet />
        <Footer />
      </AuthContext.Provider>
    </>
  );
}
