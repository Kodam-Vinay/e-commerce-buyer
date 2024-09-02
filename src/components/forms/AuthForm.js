import {
  Avatar,
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
import { useSelector } from "react-redux";
import {
  ALL_NAVIGATION_LINKS,
  CLOUDINARY_IMAGE_ACCESS_URL,
  DARK_MODE_COLOR,
  DARK_SHADE_COLOR,
  LIGHT_MODE_COLOR,
  LIGHT_SHADE_COLOR,
} from "../../utils/constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgImage from "../../assets/bgImage.avif";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ThreeCircles } from "react-loader-spinner";
import AddIcon from "@mui/icons-material/Add";

const AuthForm = ({
  loading,
  handleAuthForm,
  formData,
  setFormData,
  error,
  isError,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isImageUploadClicked,
  isSubmitClicked,
  handleImageUpload,
  checkAnyChangesMade,
}) => {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const activePath = useSelector(
    (store) => store?.persistSliceReducer?.path?.activePath
  );
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  const uploadedImageDetails = useSelector(
    (store) => store?.persistSliceReducer?.image?.imageDetails
  );

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (e.target.id === "mobile_number") {
      if (!/^\d*$/.test(value) || value?.length === 11) return;
      setFormData({ ...formData, [e.target.id]: value });
    }
    setFormData({ ...formData, [e.target.id]: value });
  };

  const handleClickPlus = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  useEffect(() => {
    if (
      activePath === ALL_NAVIGATION_LINKS.signin.path &&
      emailInputRef.current
    ) {
      emailInputRef.current.focus();
    } else if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [activePath]);

  return (
    <>
      {activePath !== ALL_NAVIGATION_LINKS.profile.path && (
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
      )}

      <Box
        sx={{
          width: "100%",
          maxWidth:
            activePath === ALL_NAVIGATION_LINKS.profile.path ? "100%" : "324px",
          overflowY: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: {
            vxs: "auto",
            md: 1,
          },
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: isDarkMode ? LIGHT_SHADE_COLOR : "",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          marginBottom={4}
          fontWeight="bold"
          sx={{
            color: isDarkMode ? LIGHT_SHADE_COLOR : "",
          }}
        >
          {activePath === ALL_NAVIGATION_LINKS.signup.path
            ? ALL_NAVIGATION_LINKS.signup.name
            : activePath === ALL_NAVIGATION_LINKS.signin.name
            ? ALL_NAVIGATION_LINKS.signin.name
            : ALL_NAVIGATION_LINKS.profile.name}
        </Typography>

        <form onSubmit={handleAuthForm}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* image */}
            {activePath === ALL_NAVIGATION_LINKS.profile.path && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  rowGap: 2,
                  marginBottom: 2,
                  position: "relative",
                  color: isDarkMode ? LIGHT_SHADE_COLOR : "",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    color: isDarkMode ? LIGHT_SHADE_COLOR : "",
                  }}
                >
                  {loading && isImageUploadClicked ? (
                    <ThreeCircles
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="three-circles-loading"
                      color="#5046e5"
                    />
                  ) : uploadedImageDetails?.imageId || userDetails?.image ? (
                    <Avatar
                      alt="profile_logo"
                      src={
                        uploadedImageDetails?.imageId
                          ? `${CLOUDINARY_IMAGE_ACCESS_URL}${process.env.REACT_APP_CLOUDINARY_PRESET}/${uploadedImageDetails?.imageId}`
                          : `${CLOUDINARY_IMAGE_ACCESS_URL}${process.env.REACT_APP_CLOUDINARY_PRESET}/${userDetails?.image}`
                      }
                      sx={{
                        height: "100px",
                        width: "100px",
                      }}
                    />
                  ) : (
                    <Avatar
                      alt="profile_logo"
                      sx={{
                        height: "100px",
                        width: "100px",
                      }}
                    >
                      {userDetails?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  )}

                  <TextField
                    inputRef={imageInputRef}
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    type="file"
                    variant="outlined"
                    label="Upload Image"
                    InputLabelProps={{ shrink: true }} // Keeps the label shrunk even when no file is selected
                    sx={{
                      display: "none", // Hide the input but keep it in the DOM
                      width: "100%",
                    }}
                    inputProps={{
                      accept: "image/*",
                    }}
                  />
                  <IconButton
                    type="button"
                    onClick={handleClickPlus}
                    sx={{
                      height: 30,
                      width: 30,
                      position: "absolute",
                      top: 0,
                      right: 0,
                      transform: "translate(10%, -33%)",
                      zIndex: 20,
                      backgroundColor: isDarkMode
                        ? DARK_MODE_COLOR
                        : LIGHT_MODE_COLOR,
                      color: isDarkMode ? LIGHT_MODE_COLOR : DARK_MODE_COLOR,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? LIGHT_MODE_COLOR
                          : DARK_MODE_COLOR,
                        color: isDarkMode ? DARK_MODE_COLOR : LIGHT_MODE_COLOR,
                      },
                      paddingRight: 2,
                    }}
                  >
                    <AddIcon
                      sx={{
                        height: 25,
                        width: 25,
                        marginLeft: 1,
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            )}

            {/* name & user id */}
            {(activePath === ALL_NAVIGATION_LINKS.signup.path ||
              activePath === ALL_NAVIGATION_LINKS.profile.path) && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    vxs: "column",
                    md: "row",
                  },
                  marginBottom: 1,
                  gap: {
                    vxs: 0,
                    md: 1,
                  },
                }}
              >
                <TextField
                  inputRef={nameInputRef}
                  type="text"
                  id="name"
                  label="Name"
                  variant="outlined"
                  sx={{
                    width: {
                      vxs: "100%",
                      md: "50%",
                    },
                    marginBottom: {
                      vxs: 1,
                      md: 0,
                    },
                    maxWidth: "324px",
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        color: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                    },
                  }}
                  value={formData?.name}
                  onChange={handleChangeInput}
                  autoComplete="name"
                />
                <TextField
                  type="text"
                  id="user_id"
                  label="User Id"
                  variant="outlined"
                  sx={{
                    width: {
                      vxs: "100%",
                      md: "50%",
                    },
                    maxWidth: "324px",
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        color: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                    },
                  }}
                  value={formData?.user_id}
                  onChange={handleChangeInput}
                  autoComplete="userid"
                />
              </Box>
            )}

            {/* email & mobile number */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: {
                  vxs: "column",
                  md: "row",
                },

                gap: {
                  vxs: 0,
                  md: 1,
                },
              }}
            >
              <TextField
                inputRef={emailInputRef}
                type={
                  activePath === ALL_NAVIGATION_LINKS.signin.path
                    ? "text"
                    : "email"
                }
                id="email"
                label={
                  activePath === ALL_NAVIGATION_LINKS.signin.path
                    ? "Email (or) User Id"
                    : "Email Address"
                }
                variant="outlined"
                sx={{
                  width: "100%",
                  maxWidth: "324px",
                  "& .MuiInputBase-input": {
                    color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isDarkMode
                        ? LIGHT_SHADE_COLOR
                        : DARK_SHADE_COLOR,
                    },
                    "&:hover fieldset": {
                      borderColor: isDarkMode
                        ? LIGHT_SHADE_COLOR
                        : DARK_SHADE_COLOR,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isDarkMode
                        ? LIGHT_SHADE_COLOR
                        : DARK_SHADE_COLOR,
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                  },
                }}
                value={formData?.email}
                onChange={handleChangeInput}
                autoComplete="email"
              />

              {activePath === ALL_NAVIGATION_LINKS.profile.path && (
                <TextField
                  type={"tel"}
                  id="mobile_number"
                  label={"Mobile Number"}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "324px",
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        color: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                    },
                    marginTop: {
                      vxs: 1,
                      md: 0,
                    },
                  }}
                  value={formData?.mobile_number}
                  onChange={handleChangeInput}
                  autoComplete="mobile_number"
                />
              )}
            </Box>

            {/* password, confirm_password */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection:
                  activePath === ALL_NAVIGATION_LINKS.profile.path
                    ? {
                        vxs: "column",
                        md: "row",
                      }
                    : "column",
                gap: {
                  vxs: 0,
                  md: 1,
                },
              }}
            >
              <FormControl
                sx={{
                  marginTop: 1,
                  width: "100%",
                  maxWidth: "324px",
                  "& .MuiInputBase-input": {
                    color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isDarkMode
                        ? LIGHT_SHADE_COLOR
                        : DARK_SHADE_COLOR,
                    },
                    "&:hover fieldset": {
                      borderColor: isDarkMode
                        ? LIGHT_SHADE_COLOR
                        : DARK_SHADE_COLOR,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isDarkMode
                        ? LIGHT_SHADE_COLOR
                        : DARK_SHADE_COLOR,
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                  },
                }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  {activePath === ALL_NAVIGATION_LINKS.profile.path
                    ? "Old Password"
                    : "Password"}
                </InputLabel>
                <OutlinedInput
                  onChange={handleChangeInput}
                  id={
                    activePath === ALL_NAVIGATION_LINKS.profile.path
                      ? "old_password"
                      : "password"
                  }
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          color: isDarkMode
                            ? DARK_MODE_COLOR
                            : LIGHT_MODE_COLOR,
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={
                    activePath === ALL_NAVIGATION_LINKS.profile.path
                      ? formData?.old_password
                      : activePath === ALL_NAVIGATION_LINKS.signin.path ||
                        activePath === ALL_NAVIGATION_LINKS.signup.path
                      ? formData?.password
                      : ""
                  }
                  label={
                    activePath === ALL_NAVIGATION_LINKS.profile.path
                      ? "Old Password"
                      : "Password"
                  }
                  autoComplete="current-password"
                />
              </FormControl>

              {(activePath === ALL_NAVIGATION_LINKS.signup.path ||
                activePath === ALL_NAVIGATION_LINKS.profile.path) && (
                <FormControl
                  sx={{
                    marginTop: 1,
                    width: "100%",
                    maxWidth: "324px",
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        color: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                    },
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    {activePath === ALL_NAVIGATION_LINKS.profile.path
                      ? "New Pasword"
                      : "Confirm Password"}
                  </InputLabel>
                  <OutlinedInput
                    onChange={handleChangeInput}
                    id={
                      activePath === ALL_NAVIGATION_LINKS.profile.path
                        ? "new_password"
                        : "confirm_password"
                    }
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          sx={{
                            color: isDarkMode
                              ? DARK_MODE_COLOR
                              : LIGHT_MODE_COLOR,
                          }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={
                      activePath === ALL_NAVIGATION_LINKS.profile.path
                        ? formData?.new_password
                        : activePath === ALL_NAVIGATION_LINKS.signin.path ||
                          activePath === ALL_NAVIGATION_LINKS.signup.path
                        ? formData?.confirm_password
                        : ""
                    }
                    label={
                      activePath === ALL_NAVIGATION_LINKS.profile.path
                        ? "New Password"
                        : "Confirm Password"
                    }
                    autoComplete="current-password"
                  />
                </FormControl>
              )}
            </Box>

            {/* address, role */}
            {activePath === ALL_NAVIGATION_LINKS.profile.path && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    vxs: "column",
                    md: "row",
                  },
                  marginTop: 1,
                  gap: {
                    vxs: 0,
                    md: 1,
                  },
                }}
              >
                <TextField
                  disabled={true}
                  type={"text"}
                  id="role"
                  label={"Role"}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "324px",
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-disabled": {
                        "& fieldset": {
                          borderColor: isDarkMode
                            ? LIGHT_SHADE_COLOR
                            : DARK_SHADE_COLOR,
                        },
                        "& .MuiInputBase-input": {
                          color: isDarkMode
                            ? LIGHT_SHADE_COLOR
                            : DARK_SHADE_COLOR,
                        },
                        "& .MuiInputLabel-root": {
                          color: isDarkMode
                            ? LIGHT_SHADE_COLOR
                            : DARK_SHADE_COLOR,
                        },
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                    },
                  }}
                  value={formData?.role}
                  autoComplete="role"
                />

                <TextField
                  type={"text"}
                  id="address"
                  label={"Address"}
                  variant="outlined"
                  multiline
                  sx={{
                    width: "100%",
                    maxWidth: "324px",
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        color: isDarkMode
                          ? LIGHT_SHADE_COLOR
                          : DARK_SHADE_COLOR,
                      },
                    },
                    marginTop: {
                      vxs: 1,
                      md: 0,
                    },
                  }}
                  value={formData?.address}
                  onChange={handleChangeInput}
                  autoComplete="address"
                />
              </Box>
            )}

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
                marginLeft:
                  activePath === ALL_NAVIGATION_LINKS.profile.path ? "auto" : 0,
                marginRight:
                  activePath === ALL_NAVIGATION_LINKS.profile.path ? "auto" : 0,
              }}
              disabled={
                !checkAnyChangesMade
                  ? activePath === ALL_NAVIGATION_LINKS.profile.path &&
                    !checkAnyChangesMade
                  : loading
              }
            >
              {loading && isSubmitClicked ? (
                <CircularProgress
                  sx={{
                    color: isDarkMode ? LIGHT_MODE_COLOR : DARK_MODE_COLOR,
                  }}
                />
              ) : activePath === ALL_NAVIGATION_LINKS.signin.path ? (
                ALL_NAVIGATION_LINKS.signin.name
              ) : activePath === ALL_NAVIGATION_LINKS.signup.path ? (
                ALL_NAVIGATION_LINKS.signup.name
              ) : (
                "Update Details"
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

            {activePath === ALL_NAVIGATION_LINKS.signin.path ? (
              <>
                <Typography
                  variant="p"
                  component="p"
                  marginTop={2}
                  marginLeft={1}
                  marginRight={1}
                  fontSize={15}
                >
                  <span>Not a Member?</span>
                  <Link
                    to={ALL_NAVIGATION_LINKS.signup.path}
                    className={`font-semibold leading-6 ml-1 ${
                      isDarkMode
                        ? `text-[${DARK_MODE_COLOR}]`
                        : `text-[${LIGHT_MODE_COLOR}]`
                    }`}
                  >
                    Register Here
                  </Link>
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  marginTop={2}
                  marginLeft={1}
                  marginRight={1}
                  fontSize={15}
                >
                  <span>Didn't Remember Your Password?</span>

                  <Link
                    to={ALL_NAVIGATION_LINKS.forgetpassword.path}
                    className={`font-semibold leading-6 ml-1 ${
                      isDarkMode
                        ? `text-[${DARK_MODE_COLOR}]`
                        : `text-[${LIGHT_MODE_COLOR}]`
                    }`}
                  >
                    Forget Password
                  </Link>
                </Typography>
              </>
            ) : activePath === ALL_NAVIGATION_LINKS.signup.path ? (
              <Typography
                variant="p"
                component="p"
                marginTop={2}
                marginLeft={1}
                marginRight={1}
                fontSize={15}
              >
                <span>Aleready have an account?</span>
                <Link
                  to={ALL_NAVIGATION_LINKS.signin.path}
                  className={`font-semibold leading-6 ml-1 ${
                    isDarkMode
                      ? `text-[${DARK_MODE_COLOR}]`
                      : `text-[${LIGHT_MODE_COLOR}]`
                  }`}
                >
                  Login Here
                </Link>
              </Typography>
            ) : null}
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AuthForm;
