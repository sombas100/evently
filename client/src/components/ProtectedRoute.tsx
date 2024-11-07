import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface ProtectedRouteProps {}

const ProtectedRoute = () => {
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
