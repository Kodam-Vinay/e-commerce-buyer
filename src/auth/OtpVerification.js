import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_NAVIGATION_LINKS,
  DARK_MODE_COLOR,
  LIGHT_MODE_COLOR,
  storeToastError,
  storeToastSuccess,
} from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.avif";
import { postRequest } from "../api/apiCalls";
import { storeUserInfo } from "../redux/slices/userSlice";

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitOtpClicked, setSubmitOtpClicked] = useState(false);
  const [isResendOtpClicked, setResendOtpClicked] = useState(false);
  const inputRefs = useRef([null, null, null, null]);
  const joinOtp = otp.join("");
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );

  useEffect(() => {
    if (joinOtp.length === 4) {
      setIsError(false);
    }
  }, [joinOtp]);

  useEffect(() => {
    if (inputRefs?.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    setSubmitOtpClicked(false);
    setResendOtpClicked(false);
  }, []);

  const handleOtp = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
  };

  const handleBackSpace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    setResendOtpClicked(true);
    setOtp(["", "", "", ""]);
    const details = {
      user_id: userDetails?.id,
    };
    setLoading(true);
    const res = await postRequest({
      apiUrl: "users/send-otp",
      setIsError,
      setError,
      details,
    });
    if (res?.status) {
      storeToastSuccess({ successMessage: res?.message });
    } else {
      storeToastError({ errorMessage: res?.message });
    }
    inputRefs.current[0].focus();
    setLoading(false);
  };

  const handleAuthForm = async (e) => {
    e.preventDefault();
    if (joinOtp.length < 4) {
      setError("Please enter a valid OTP");
      setIsError(true);
      return;
    }
    setLoading(true);
    setSubmitOtpClicked(true);
    setResendOtpClicked(false);
    const details = {
      user_id: userDetails?.id,
      otp: joinOtp,
    };
    const res = await postRequest({
      apiUrl: "users/verify-otp",
      setError,
      setIsError,
      details,
    });
    if (res?.status) {
      dispatch(storeUserInfo(res?.data?.userDetails));
      navigate("/");
    } else {
      storeToastError({ errorMessage: res?.message });
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
      <Box
        sx={{
          alignSelf: "center",
          backgroundSize: "cover",
          position: {
            vxs: "absolute",
            md: "relative",
          },
          maxWidth: "50%",
        }}
      >
        <img src={bgImage} alt="auth_image" className="animate-pulse" />
      </Box>
      <Box
        sx={{
          maxWidth: "324px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: {
            vxs: "auto",
            md: 1,
          },
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          marginBottom={4}
          fontWeight="bold"
        >
          {ALL_NAVIGATION_LINKS.otpverfication.name}
        </Typography>
        <form onSubmit={handleAuthForm} className="max-w-[324px]">
          <Box
            sx={{
              width: "100%",
              height: 40,
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            {otp?.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                  "& .MuiInputBase-input": {
                    height: 40,
                    padding: 0,
                    textAlign: "center",
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? DARK_MODE_COLOR : "",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isDarkMode ? DARK_MODE_COLOR : "",
                    },
                    "&:hover fieldset": {
                      borderColor: isDarkMode ? DARK_MODE_COLOR : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isDarkMode ? DARK_MODE_COLOR : "",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: isDarkMode ? DARK_MODE_COLOR : "",
                    },
                  },
                  width: 40,
                  marginRight: 1,
                  padding: 0,
                }}
                value={digit}
                onChange={(e) => handleOtp(e, index)}
                onKeyDown={(e) => handleBackSpace(e, index)}
              />
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              "&:hover": {
                bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              },
              width: "100%",
              maxWidth: "324px",
              marginTop: 1,
              height: 50,
            }}
            disabled={loading}
          >
            {loading && isSubmitOtpClicked ? (
              <CircularProgress
                sx={{
                  color: isDarkMode ? LIGHT_MODE_COLOR : DARK_MODE_COLOR,
                }}
              />
            ) : (
              "Submit"
            )}
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              "&:hover": {
                bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              },
              width: "100%",
              maxWidth: "324px",
              marginTop: 1,
              height: 50,
            }}
            disabled={loading}
            onClick={() => handleResendOtp()}
          >
            {loading && isResendOtpClicked ? (
              <CircularProgress
                sx={{
                  color: isDarkMode ? LIGHT_MODE_COLOR : DARK_MODE_COLOR,
                }}
              />
            ) : (
              "Resend otp"
            )}
          </Button>
          {isError && (
            <Typography
              variant="p"
              component="p"
              marginBottom={4}
              sx={{
                color: "red",
              }}
            >
              {error}*
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default OtpVerification;
