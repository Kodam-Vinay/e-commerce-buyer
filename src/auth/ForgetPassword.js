import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_NAVIGATION_LINKS,
  DARK_MODE_COLOR,
  FORGET_FORM_CONSTANTS,
  LIGHT_MODE_COLOR,
  storeToastError,
  storeToastSuccess,
} from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.avif";
import { postRequest } from "../api/apiCalls";
import { storeUserInfo } from "../redux/slices/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { togglePasswordState } from "../redux/slices/forgetPasswordSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordRef = useRef();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const joinOtp = otp.join("");
  const inputRefs = useRef([null, null, null, null]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitOtpClicked, setSubmitOtpClicked] = useState(false);
  const [isResendOtpClicked, setResendOtpClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );

  const passwordState = useSelector(
    (store) => store?.forgetPassword?.passwordState
  );

  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const handleAuthForm = async (e) => {
    e.preventDefault();
    if (!formData?.email?.toString().trim()) {
      setIsError(true);
      setError("Please enter your email");
      return;
    }
    const details = {
      email: formData?.email?.trim(),
    };
    setLoading(true);
    const res = await postRequest({
      apiUrl: "users/forget-password",
      setIsError,
      setError,
      details,
    });
    if (res?.status) {
      dispatch(storeUserInfo(res?.data?.userDetails));
      dispatch(togglePasswordState(FORGET_FORM_CONSTANTS.otpSend));
      storeToastSuccess({ successMessage: res?.message });
    } else {
      storeToastError({ errorMessage: res?.message });
    }
    setLoading(false);
  };

  const handleOtpAuthForm = async (e) => {
    e.preventDefault();
    setSubmitOtpClicked(true);
    setResendOtpClicked(false);
    if (joinOtp.length < 4) {
      setError("Please enter a valid OTP");
      setIsError(true);
      return;
    }
    setLoading(true);
    const details = {
      user_id: userDetails?.id,
      otp: joinOtp,
    };
    const res = await postRequest({
      apiUrl: "users/verify-forget-password-otp",
      setError,
      setIsError,
      details,
    });
    if (res?.status) {
      dispatch(storeUserInfo(res?.data?.userDetails));
      dispatch(togglePasswordState(FORGET_FORM_CONSTANTS.otpVerified));
    } else {
      storeToastError({ errorMessage: res?.message });
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setResendOtpClicked(true);
    setSubmitOtpClicked(false);
    setOtp(["", "", "", ""]);
    const details = {
      user_id: userDetails?.id,
    };
    setLoading(true);
    const res = await postRequest({
      apiUrl: "users/forget-resend-otp",
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

  const handleOnUpdatePassword = async (e) => {
    e.preventDefault();
    if (!formData?.password || !formData?.confirm_password) {
      setIsError(true);
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    const details = {
      user_id: userDetails?.id,
      password: formData?.password,
      confirm_password: formData?.confirm_password,
    };
    const res = await postRequest({
      apiUrl: "users/update-password",
      setIsError,
      setError,
      details,
    });
    if (res?.status) {
      storeToastSuccess({ successMessage: res?.message });
      dispatch(togglePasswordState(FORGET_FORM_CONSTANTS.success));
      dispatch(storeUserInfo({}));
    } else {
      storeToastError({ errorMessage: res?.message ? res?.message : error });
    }
    setLoading(false);
  };

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setIsError(false);
  };

  const handleOtp = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
    setIsError(false);
  };

  const handleBackSpace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
    setIsError(false);
  };

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
    if (inputRefs?.current[0]) {
      inputRefs.current[0].focus();
    }
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [passwordState]);

  // ui
  const renderEmailForm = () => (
    <form onSubmit={handleAuthForm} className="max-w-[324px]">
      <TextField
        inputRef={emailInputRef}
        type={"email"}
        id="email"
        label="Email Address"
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "324px",
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
        }}
        value={formData?.email}
        onChange={handleChangeInput}
        autoComplete="email"
      />
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
        {loading ? (
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
        onClick={() => navigate(ALL_NAVIGATION_LINKS.signin.path)}
        disabled={loading}
      >
        Go Back
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
  );

  const renderOtpForm = () => (
    <form onSubmit={handleOtpAuthForm} className="max-w-[324px]">
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
  );

  const renderUpdatePasswordForm = () => {
    return (
      <form className="w-full self-center" onSubmit={handleOnUpdatePassword}>
        <Box>
          <FormControl
            sx={{
              marginTop: 1,
              width: "100%",
              maxWidth: "324px",
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
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: isDarkMode ? DARK_MODE_COLOR : "",
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              inputRef={passwordRef}
              onChange={handleChangeInput}
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={formData?.password}
              label="Password"
              autoComplete="current-password"
            />
          </FormControl>

          <FormControl
            sx={{
              marginTop: 1,
              width: "100%",
              maxWidth: "324px",
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
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: isDarkMode ? DARK_MODE_COLOR : "",
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              onChange={handleChangeInput}
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={formData?.confirm_password}
              label="Confirm Password"
              autoComplete="current-password"
            />
          </FormControl>

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
            {loading && isResendOtpClicked ? (
              <CircularProgress
                sx={{
                  color: isDarkMode ? LIGHT_MODE_COLOR : DARK_MODE_COLOR,
                }}
              />
            ) : (
              "Submit"
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
        </Box>
      </form>
    );
  };

  const renderSuccessForm = () => {
    return (
      <Box className="w-full">
        <Typography
          sx={{
            fontSize: 18,
            color: isDarkMode ? LIGHT_MODE_COLOR : DARK_MODE_COLOR,
            textAlign: "center",
          }}
        >
          Password updated successfully, Now You Can Login
        </Typography>

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
          onClick={() => navigate(ALL_NAVIGATION_LINKS.signin.path)}
        >
          Go Back
        </Button>
      </Box>
    );
  };

  const renderUi = () => {
    switch (passwordState) {
      case FORGET_FORM_CONSTANTS.otpSend:
        return renderOtpForm();
      case FORGET_FORM_CONSTANTS.otpVerified:
        return renderUpdatePasswordForm();
      case FORGET_FORM_CONSTANTS.success:
        return renderSuccessForm();
      default:
        return renderEmailForm();
    }
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
          {ALL_NAVIGATION_LINKS.forgetpassword.name}
        </Typography>
        {renderUi()}
      </Box>
    </Box>
  );
};

export default ForgetPassword;
