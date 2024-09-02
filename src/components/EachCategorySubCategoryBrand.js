import { Box, Typography } from "@mui/material";
import {
  ALL_NAVIGATION_LINKS,
  CLOUDINARY_IMAGE_ACCESS_URL,
} from "../utils/constants";
import { useSelector } from "react-redux";

export default function EachCategorySubCategoryBrand({
  details,
  handleEachFilter,
}) {
  const activePath = useSelector(
    (store) => store?.persistSliceReducer?.path?.activePath
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        whiteSpace: "nowrap",
        width: {
          vxs:
            activePath === ALL_NAVIGATION_LINKS.home.path ? "100px" : "100px",
          sm: activePath === ALL_NAVIGATION_LINKS.home.path ? "100px" : "120px",
        },
        flexShrink: 0,
        padding: 1,
      }}
      onClick={() => handleEachFilter(details?.name)}
    >
      {details?.image ? (
        <img
          src={`${CLOUDINARY_IMAGE_ACCESS_URL}${process.env.REACT_APP_CLOUDINARY_CATEGORIES_BRANDS}/${details?.image}
          `}
          alt={details?.name}
          className={`text-xs object-contain p-0 ${
            activePath === ALL_NAVIGATION_LINKS.home.path
              ? "h-10 w-10"
              : "h-20 w-20"
          }`}
        />
      ) : (
        <div
          className={`text-xs border ${
            activePath === ALL_NAVIGATION_LINKS.home.path
              ? "h-10 w-10"
              : "h-20 w-20"
          }`}
        ></div>
      )}
      <Typography
        sx={{
          fontSize: {
            vxs: "12px",
            sm: "14px",
          },
          fontWeight:
            activePath === ALL_NAVIGATION_LINKS.home.path ? "semibold" : "bold",
          marginTop: 1,
        }}
      >
        {details?.name}
      </Typography>
    </Box>
  );
}
