import { Box } from "@mui/material";
import AuthForm from "../components/forms/AuthForm";
import { useEffect, useState } from "react";
import { postRequest } from "../api/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserInfo } from "../redux/slices/userSlice";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData?.email && formData?.password) {
      setIsError(false);
    }
  }, [formData?.email, formData?.password]);

  const handleAuthForm = async (e) => {
    e.preventDefault();
    if (
      !formData?.email?.toString().trim() ||
      !formData?.password?.toString().trim()
    ) {
      setIsError(true);
      setError("Please fill in all fields");
      return;
    }
    const details = {
      email: formData.email,
      password: formData.password,
    };
    setLoading(true);
    const res = await postRequest({
      apiUrl: "users/login",
      setIsError,
      setError,
      details,
    });
    if (res?.status) {
      if (res?.data?.userDetails?.verified) {
        dispatch(storeUserInfo(res?.data?.userDetails));
        navigate(ALL_NAVIGATION_LINKS.home.path);
      } else {
        dispatch(storeUserInfo(res?.data?.userDetails));
        navigate(ALL_NAVIGATION_LINKS.otpverfication.path);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: {
          vxs: "column",
          md: "row",
        },
        alignItems: {
          md: "center",
        },
      }}
    >
      <AuthForm
        handleAuthForm={handleAuthForm}
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isError={isError}
        error={error}
        loading={loading}
      />
    </Box>
  );
};

export default SignIn;
