import { Box } from "@mui/material";
import AuthForm from "../components/forms/AuthForm";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { postRequest } from "../api/apiCalls";
import { storeUserInfo } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_id: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      formData?.email &&
      formData?.name &&
      formData?.password &&
      formData?.confirm_password &&
      formData?.user_id
    ) {
      setIsError(false);
    }
  }, [
    formData?.email,
    formData?.name,
    formData?.password,
    formData?.confirm_password,
    formData?.user_id,
  ]);

  const handleAuthForm = async (e) => {
    e.preventDefault();
    if (
      !formData?.email?.toString().trim() ||
      !formData?.name?.toString().trim() ||
      !formData?.password?.toString().trim() ||
      !formData?.confirm_password?.toString().trim() ||
      !formData?.user_id?.toString().trim()
    ) {
      setIsError(true);
      setError("Please fill all the fields");
      return;
    }
    const userDetails = {
      name: formData?.name,
      email: formData?.email,
      password: formData?.password,
      confirm_password: formData?.confirm_password,
      user_id: formData?.user_id,
    };
    setLoading(true);
    const res = await postRequest({
      apiUrl: "users/register",
      details: userDetails,
      setError,
      setIsError,
    });
    if (res?.status) {
      dispatch(storeUserInfo(res?.data?.userDetails));
      navigate(ALL_NAVIGATION_LINKS.otpverfication.path);
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
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        isError={isError}
        error={error}
        loading={loading}
      />
    </Box>
  );
};

export default SignUp;
