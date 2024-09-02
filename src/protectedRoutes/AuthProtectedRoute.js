import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";

const AuthProtectedRoute = ({ children }) => {
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  return Object.keys(userDetails)?.length > 0 && userDetails?.jwtToken ? (
    <Navigate to={ALL_NAVIGATION_LINKS.home.path} />
  ) : (
    children
  );
};

export default AuthProtectedRoute;
