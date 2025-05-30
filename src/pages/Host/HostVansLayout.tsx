import HostVansIdComp from "./HostVansSelected";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useListedVansId from "./HostVansHook";

export default function ListedVansId() {
  const { data, loading, error } = useListedVansId();

  const hostVanStyle = {
    fontWeight: "500",
    textDecoration: "inherit",
    color: "#ff8c38",
  };

  return (
    <div className="host-van-container">
      <HostVansIdComp />
      <NavLink
        to="."
        end
        style={({ isActive }) => (isActive ? hostVanStyle : undefined)}
      >
        Details
      </NavLink>
      <NavLink
        to="pricing"
        style={({ isActive }) => (isActive ? hostVanStyle : undefined)}
      >
        Pricing
      </NavLink>
      <NavLink
        to="photos"
        style={({ isActive }) => (isActive ? hostVanStyle : undefined)}
      >
        Photos
      </NavLink>
      <Outlet context={{ data, loading, error }} />
    </div>
  );
}
