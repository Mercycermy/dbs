import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, token }) {
  const location = useLocation();

  if (!token) {
    // Redirect to /login and pass the current location as state
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;