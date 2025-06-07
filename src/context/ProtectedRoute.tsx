import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useContext(AuthContext);

  if (loading) {
    return <div>loading</div>;
  }

  if (!session) {
    // Not logged in, redirect to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  // Logged in, render the protected component
  return children;
};

export default ProtectedRoute;
