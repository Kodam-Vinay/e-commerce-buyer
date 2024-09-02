import { AccountCircle, Home, Logout } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { BsCart4 } from "react-icons/bs";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Bounce, toast } from "react-toastify";
import { BiCategory } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import "../App.css";

export const API_URL = process.env.REACT_APP_E_COMMERCE_BACKEND_URL;

export const CLOUDINARY_IMAGE_ACCESS_URL =
  process.env.REACT_APP_CLOUDINARY_IMAGE_ACCESS_URL;

export const CLOUDINARY_IMAGE_UPLOAD_URL =
  process.env.REACT_APP_CLOUDINARY_IMAGE_UPLOAD_URL;

export const DARK_MODE_COLOR = "#303030";

export const DARK_SHADE_COLOR = "#4f4f4f";

export const LIGHT_MODE_COLOR = "#1976d3";

export const LIGHT_SHADE_COLOR = "#f2f0f0";

export const NAVIGATION_LINKS = {
  home: {
    path: "/",
    name: "Home",
    element: (
      <Home
        sx={{
          fontSize: 25,
        }}
      />
    ),
  },
  cart: {
    path: "/cart",
    name: "Cart",
    element: (
      <Badge badgeContent={4} color="error">
        <BsCart4 size={25} />
      </Badge>
    ),
  },
  orders: {
    path: "/orders",
    name: "Orders",
    element: <GiCardboardBoxClosed size={25} />,
  },
};

export const ALL_NAVIGATION_LINKS = {
  ...NAVIGATION_LINKS,
  profile: {
    path: "/profile",
    name: "Profile",
    element: (
      <AccountCircle
        sx={{
          fontSize: 25,
        }}
      />
    ),
  },
  signin: {
    path: "/sign-in",
    name: "Sign In",
    element: (
      <AccountCircle
        sx={{
          fontSize: 25,
        }}
      />
    ),
  },
  signup: {
    path: "/sign-up",
    name: "Sign Up",
    element: (
      <AccountCircle
        sx={{
          fontSize: 25,
        }}
      />
    ),
  },
  forgetpassword: {
    path: "/forget-password",
    name: "Forget Password",
    element: (
      <AccountCircle
        sx={{
          fontSize: 25,
        }}
      />
    ),
  },
  otpverfication: {
    path: "/verify-otp",
    name: "Verify Otp",
    element: (
      <AccountCircle
        sx={{
          fontSize: 25,
        }}
      />
    ),
  },
  logout: {
    path: "/logout",
    name: "Logout",
    element: <Logout />,
  },
  all_categories: {
    path: "/all-categories",
    title: "All Categories",
    icon: <BiCategory size={40} />,
  },
  all_sub_categories: {
    path: "/all-sub-categories",
    title: "All Sub Categories",
    icon: <BiCategory size={40} />,
  },
  all_brands: {
    path: "/all-brands",
    title: "All Brands",
    icon: <BiCategory size={40} />,
  },
  products: {
    path: "/products",
    title: "Products",
    icon: <BiCategory size={40} />,
  },
};

export const FORGET_FORM_CONSTANTS = {
  initial: "INITIAL",
  otpSend: "otpSend",
  otpVerified: "otpVerified",
  success: "SUCCESS",
};

export const storeToastError = ({ errorMessage }) => {
  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const storeToastSuccess = ({ successMessage }) => {
  toast.success(successMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const checkAnyChangesMadeFn = ({
  formData,
  userDetails,
  uploadedImageDetails,
  checkPasswordChanged,
}) => {
  const checkNameIsChanged =
    formData?.name?.toString().trim() !== userDetails?.name?.toString().trim();
  const checkEmailIsChanged =
    formData?.email?.toString().trim() !==
    userDetails?.contact?.email?.toString().trim();
  const checkMobileNumberIsChanged =
    formData?.mobile_number?.toString().trim() !==
    userDetails?.contact?.mobile_number?.toString().trim();
  const checkAddressChanged =
    formData?.address?.toString().trim() !==
    userDetails?.address?.toString().trim();
  const checkUserIdChanged =
    formData?.user_id?.toString().trim() !==
    userDetails?.user_id?.toString().trim();
  const checkImageIsChanged =
    uploadedImageDetails?.imageId?.toString().trim() !==
      userDetails?.image?.toString().trim() &&
    uploadedImageDetails?.imageId !== undefined;
  if (
    checkNameIsChanged ||
    checkEmailIsChanged ||
    checkMobileNumberIsChanged ||
    checkAddressChanged ||
    checkUserIdChanged ||
    checkImageIsChanged ||
    checkPasswordChanged
  ) {
    return true;
  }
  return false;
};

export const ToggleButton = ({ isDarkMode, isChecked, handleToggle }) => {
  return (
    <div className={`border toggle-button`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        id="toggle-checkbox"
        className="hidden"
      />

      <label
        className={`m-[3px] flex items-center toggle-label`}
        htmlFor="toggle-checkbox"
      >
        {isDarkMode && (
          <>
            <span className="mb-2 ml-1">
              <FiSun color="#E8C364" />
            </span>
            <span
              className={`ml-1 bg-[#888686]  ${
                isChecked ? "on" : "off"
              } toggle-slider`}
            ></span>
          </>
        )}

        {!isDarkMode && (
          <>
            <span
              className={`bg-[#FFFFFF] -ml-4 ${
                isChecked ? "off" : "on"
              } toggle-slider`}
            ></span>
            <span className="ml-7 mb-2">
              <FaMoon color="#E8C364" />
            </span>
          </>
        )}
      </label>
    </div>
  );
};

export const API_STATUS_LIST = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
  nodata: "NO_DATA",
};

export const renderResults = ({
  apiStatus,
  renderLoader,
  renderSuccess,
  renderNoList,
}) => {
  switch (apiStatus) {
    case API_STATUS_LIST.inProgress:
      return renderLoader();
    case API_STATUS_LIST.success:
      return renderSuccess();
    case API_STATUS_LIST.failure:
      return renderNoList();
    case API_STATUS_LIST.nodata:
      return renderNoList();
    default:
      return null;
  }
};

export const constructProductsApiUrl = ({
  encodedCategory,
  encodedSubCategory,
  encodedBrand,
  encodedSearchInput,
  encodedSortByValue,
}) => {
  const queryParams = [];

  if (encodedCategory) {
    queryParams.push(`category=${encodedCategory}`);
  }
  if (encodedSubCategory) {
    queryParams.push(`sub_category=${encodedSubCategory}`);
  }
  if (encodedBrand) {
    queryParams.push(`brand=${encodedBrand}`);
  }
  if (encodedSearchInput) {
    queryParams.push(`search_q=${encodedSearchInput}`);
  }
  if (encodedSortByValue) {
    queryParams.push(`sort=${encodedSortByValue}`);
  }

  return `products/all${queryParams.length ? `?${queryParams.join("&")}` : ""}`;
};

export const constructNavigateAPiUrl = ({
  pathName,
  encodedCategory,
  encodedSubCategory,
  encodedBrand,
  encodedSearchInput,
  encodedSortByValue,
}) => {
  const queryParams = [];

  if (encodedCategory) {
    queryParams.push(`category=${encodedCategory}`);
  }
  if (encodedSubCategory) {
    queryParams.push(`sub_category=${encodedSubCategory}`);
  }
  if (encodedBrand) {
    queryParams.push(`brand=${encodedBrand}`);
  }
  if (encodedSearchInput) {
    queryParams.push(`search_q=${encodedSearchInput}`);
  }
  if (encodedSortByValue) {
    queryParams.push(`sort=${encodedSortByValue}`);
  }
  return `${pathName}${queryParams.length ? `?${queryParams.join("&")}` : ""}`;
};

export const SORT_FILTER_OPTIONS = {
  relavance: "Relavance",
  popularity: "Popularity",
  price_low_to_high: "Price Low To High",
  price_high_to_low: "Price High To Low",
  newest_first: "Newest First",
  better_discount: "Better Discount",
};
