import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const isActiveStyle = {
    fontweight: "bold",
    textdecoration: "underline",
    color: "#ff8c38",
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="host"
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          Host
        </NavLink>
        <NavLink
          to="van"
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          Vans
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? isActiveStyle : undefined)}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
