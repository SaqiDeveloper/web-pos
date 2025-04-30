import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//pages
import {
  AddUser,
  Dashboard,
  ForgotPassword,
  Login,
  Page404,
  Profile,
  Register,
  Settings,
  Users,
} from "./pages";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        { path: "users", element: <Users /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
