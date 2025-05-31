import { Outlet } from "react-router-dom";

export default function Host() {
  return (
    <>
      <h1 className="dashboard">Hello from DashBoard</h1>
      <Outlet />
    </>
  );
}
