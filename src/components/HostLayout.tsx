import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const isActiveStyle = {
    fontweight: "bold",
    textdecoration: "underline",
    color: "#ff8c38",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          Income
        </NavLink>

        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          Vans
        </NavLink>

        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
