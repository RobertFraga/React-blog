import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
import Dashboard from "./pages/dashboard";
import App from "./App";
import ProtectedRoute from "./context/ProtectedRoute";
import CreatePost from "./components/create-post";
import Editpost from "./components/edit-post";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sign-up", element: <Signup /> },
  { path: "/sign-in", element: <Signin /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-post",
    element: (
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit/:postId",
    element: (
      <ProtectedRoute>
        <Editpost />
      </ProtectedRoute>
    ),
  },
]);
