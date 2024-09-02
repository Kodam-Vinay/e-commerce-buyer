import { useEffect, useState } from "react";
import AuthForm from "../components/forms/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { postRequest, updateRequest } from "../api/apiCalls";
import { storeUserInfo } from "../redux/slices/userSlice";
import {
  checkAnyChangesMadeFn,
  storeToastError,
  storeToastSuccess,
} from "../utils/constants";
import { Box } from "@mui/material";
import { storeImageId } from "../redux/slices/imageSlice";

const Profile = () => {
  const dispath = useDispatch();
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const [formData, setFormData] = useState({
    name: userDetails?.name ? userDetails?.name : "",
    user_id: userDetails?.user_id ? userDetails?.user_id : "",
    old_password: "",
    new_password: "",
    address: userDetails?.address ? userDetails?.address : "",
    mobile_number: userDetails?.contact?.mobile_number
      ? userDetails?.contact?.mobile_number
      : "",
    email: userDetails?.contact?.email ? userDetails?.contact?.email : "",
    role: userDetails?.role ? userDetails?.role : "",
  });
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isImageUploadClicked, setImageUploadClicked] = useState(false);
  const [isSubmitClicked, setSubmitClicked] = useState(false);
  const [isDetailsUpdateSuccess, setIsDetailsUpdateSuccess] = useState(false);
  const uploadedImageDetails = useSelector(
    (store) => store?.persistSliceReducer?.image?.imageDetails
  );

  useEffect(() => {
    if (uploadedImageDetails) {
      dispath(storeImageId({}));
    }
  }, [isDetailsUpdateSuccess]);

  useEffect(() => {
    setFormData({
      name: userDetails?.name,
      user_id: userDetails?.user_id,
      old_password: "",
      new_password: "",
      address: userDetails?.address,
      mobile_number: userDetails?.contact?.mobile_number,
      email: userDetails?.contact?.email,
      role: userDetails?.role,
    });
  }, [userDetails]);

  const checkPasswordChanged =
    formData?.old_password?.toString().trim().length > 7 &&
    formData?.new_password?.toString().trim().length > 7;

  const checkAnyChangesMade = checkAnyChangesMadeFn({
    formData,
    userDetails,
    uploadedImageDetails,
    checkPasswordChanged,
  });

  const handleAuthForm = async (e) => {
    e.preventDefault();
    if (
      !formData?.name ||
      !formData?.address ||
      !formData?.user_id ||
      !formData?.mobile_number ||
      !formData?.email
    ) {
      setIsError(true);
      setError("Please fill all the fields");
      return;
    }
    if (
      (formData?.old_password && !formData?.new_password) ||
      (formData?.new_password && !formData?.old_password)
    ) {
      setIsError(true);
      setError("Please fill both old and new password");
      return;
    }
    setSubmitClicked(true);
    setImageUploadClicked(false);
    setLoading(true);
    let details = {};
    if (checkPasswordChanged) {
      details = {
        name: formData?.name,
        user_id: formData?.user_id,
        old_password: formData?.old_password,
        new_password: formData?.new_password,
        address: formData?.address,
        contact: {
          mobile_number: formData?.mobile_number,
          email: formData?.email,
        },
        image: uploadedImageDetails?.imageId
          ? uploadedImageDetails?.imageId
          : userDetails?.image,
      };
    } else {
      details = {
        name: formData?.name,
        user_id: formData?.user_id,
        address: formData?.address,
        contact: {
          mobile_number: formData?.mobile_number,
          email: formData?.email,
        },
        image: uploadedImageDetails?.imageId
          ? uploadedImageDetails?.imageId
          : userDetails?.image,
      };
    }

    const res = await updateRequest({
      apiUrl: "users/update",
      setIsError,
      setError,
      details,
      token: userDetails?.jwtToken,
    });

    if (res?.status) {
      dispath(storeUserInfo(res?.data?.userDetails));
      storeToastSuccess({ successMessage: res?.message });
      setFormData({
        old_password: "",
        new_password: "",
      });
      setIsDetailsUpdateSuccess(true);
    } else {
      storeToastError({ errorMessage: res?.message });
      setIsDetailsUpdateSuccess(false);
    }
    setLoading(false);
    setSubmitClicked(false);
    setImageUploadClicked(false);
  };

  const handleImageUpload = async (imageFile) => {
    if (!imageFile) {
      storeToastError({ errorMessage: "Please Select A Image!" });
      return;
    }
    if (imageFile?.type === "image/png" || imageFile?.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("image", imageFile);
      setLoading(true);
      setSubmitClicked(false);
      setImageUploadClicked(true);

      //code
      const res = await postRequest({
        apiUrl: "users/upload_image",
        details: formData,
        setError,
        setIsError,
        token: userDetails?.jwtToken,
      });
      if (res?.status) {
        storeToastSuccess({ successMessage: res?.message });
        dispath(
          storeImageId(
            res?.data?.image
              ? {
                  imageId: res?.data?.image,
                }
              : {
                  imageId: "DUMMY_PROFILE_LOGO",
                }
          )
        );
      } else {
        storeToastError({ errorMessage: res?.message });
      }
      setLoading(false);
      setSubmitClicked(false);
      setImageUploadClicked(false);
    } else {
      storeToastError({
        errorMessage: "Please Select A Image! png/jpeg format only.",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "99%",
        width: "100%",
      }}
    >
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        handleAuthForm={handleAuthForm}
        loading={loading}
        isError={isError}
        error={error}
        isImageUploadClicked={isImageUploadClicked}
        isSubmitClicked={isSubmitClicked}
        setImageUploadClicked={setImageUploadClicked}
        setSubmitClicked={setSubmitClicked}
        handleImageUpload={handleImageUpload}
        uploadedImageDetails={uploadedImageDetails}
        checkAnyChangesMade={checkAnyChangesMade}
      />
    </Box>
  );
};

export default Profile;
