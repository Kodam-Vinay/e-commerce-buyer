import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";

const AuthorizationProtectedRoute = ({ children }) => {
  const prevPath = useSelector(
    (store) => store?.persistSliceReducer?.path?.prevPath
  );
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  return Object.keys(userDetails)?.length > 0 && userDetails?.jwtToken ? (
    children
  ) : (
    <Navigate
      to={
        prevPath === ALL_NAVIGATION_LINKS.signin.path ||
        prevPath === ALL_NAVIGATION_LINKS.signup.path
          ? prevPath
          : ALL_NAVIGATION_LINKS.signin.path
      }
    />
  );
};

export default AuthorizationProtectedRoute;
