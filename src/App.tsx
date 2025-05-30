import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Vans from "./pages/Vans.tsx";
import VansDetails from "./pages/VanDetail.tsx";
import Layout from "./components/layout.tsx";
import HostLayout from "./components/HostLayout.tsx";
import Dashboard from "./pages/Host/DashBoard.tsx";
import Income from "./pages/Host/Income.tsx";
import Reviews from "./pages/Host/Reviews.tsx";
import HostVans from "./pages/Host/HostVans.tsx";
import HostVansLayout from "./pages/Host/HostVansLayout.tsx";
import Details from "./pages/Host/Details.tsx";
import Pricing from "./pages/Host/Pricing.tsx";
import Photos from "./pages/Host/Photos.tsx";
import AuthRequired from "./components/Authrequired.tsx";
import Login from "./pages/Login.tsx";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "van", element: <Vans /> },
      { path: "van/:id", element: <VansDetails /> },
      {
        element: <AuthRequired />,
        children: [
          {
            path: "host",
            element: <HostLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "income", element: <Income /> },
              { path: "vans", element: <HostVans /> },
              {
                path: "vans/:id",
                element: <HostVansLayout />,
                children: [
                  { index: true, element: <Details /> },
                  { path: "pricing", element: <Pricing /> },
                  { path: "photos", element: <Photos /> },
                ],
              },
              { path: "reviews", element: <Reviews /> },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
