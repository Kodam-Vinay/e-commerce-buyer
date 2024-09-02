import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ForgetPassword from "../auth/ForgetPassword";
import OtpVerification from "../auth/OtpVerification";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

import VerificationProtectedRoute from "../protectedRoutes/VerificationProtectedRoute";
import AuthProtectedRoute from "../protectedRoutes/AuthProtectedRoute";
import Profile from "../pages/Profile";
import AuthorizationProtectedRoute from "../protectedRoutes/AuthorizationProtectedRoute";
import AllCategories from "../pages/AllCategories";
import RenderSubCategories from "../components/RenderSubCategories";
import RenderBrands from "../components/RenderBrands";
import Products from "../pages/Products";
import Body from "../components/Body";

const RenderLayout = () => {
  return <Body />;
};

const AppRoutes = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RenderLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ALL_NAVIGATION_LINKS.signin.path,
          element: (
            <AuthProtectedRoute>
              <SignIn />
            </AuthProtectedRoute>
          ),
        },
        {
          path: ALL_NAVIGATION_LINKS.signup.path,
          element: (
            <AuthProtectedRoute>
              <SignUp />
            </AuthProtectedRoute>
          ),
        },
        {
          path: ALL_NAVIGATION_LINKS.otpverfication.path,
          element: (
            <AuthProtectedRoute>
              <VerificationProtectedRoute>
                <OtpVerification />
              </VerificationProtectedRoute>
            </AuthProtectedRoute>
          ),
        },
        {
          path: ALL_NAVIGATION_LINKS.forgetpassword.path,
          element: (
            <AuthProtectedRoute>
              <ForgetPassword />
            </AuthProtectedRoute>
          ),
        },
        {
          path: ALL_NAVIGATION_LINKS.home.path,
          element: <Home />,
        },
        {
          path: ALL_NAVIGATION_LINKS.cart.path,
          element: <Cart />,
        },
        {
          path: ALL_NAVIGATION_LINKS.orders.path,
          element: (
            <AuthorizationProtectedRoute>
              <Orders />
            </AuthorizationProtectedRoute>
          ),
        },
        {
          path: ALL_NAVIGATION_LINKS.all_categories.path,
          element: <AllCategories />,
        },
        {
          path: ALL_NAVIGATION_LINKS.all_brands.path,
          element: <RenderBrands />,
        },
        {
          path: ALL_NAVIGATION_LINKS.products.path,
          element: <Products />,
        },
        {
          path: ALL_NAVIGATION_LINKS.profile.path,
          element: (
            <AuthorizationProtectedRoute>
              <Profile />
            </AuthorizationProtectedRoute>
          ),
        },
        {
          path: ":category",
          element: <RenderSubCategories />,
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouter} />;
};

export default AppRoutes;
