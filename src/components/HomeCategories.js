import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ALL_NAVIGATION_LINKS,
  DARK_SHADE_COLOR,
  LIGHT_SHADE_COLOR,
} from "../utils/constants";

import { storeCategoryFilter } from "../redux/slices/filterSlice";
import EachCategorySubCategoryBrand from "./EachCategorySubCategoryBrand";

export default function HomeCategories({ categories }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  const navigate = useNavigate();

  const handleCategory = (category) => {
    navigate(`/${category}`);
    dispatch(storeCategoryFilter(category));
  };

  return (
    <Box
      sx={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        gap: 2,
        overflowX: "auto",
        overflowY: "hidden",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        marginTop: 1,
        marginBottom: "2px",
      }}
    >
      <Box
        onClick={() => navigate(ALL_NAVIGATION_LINKS.all_categories.path)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          whiteSpace: "nowrap",
          width: "100px",
          flexShrink: 0,
          height: "65px",
          marginTop: 2,
          marginBottom: "2px",
        }}
      >
        <span
          className={`text-xs font-semibold text-[${
            isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR
          }]`}
        >
          {ALL_NAVIGATION_LINKS.all_categories.icon}
        </span>
        <Typography
          sx={{
            fontSize: {
              vxs: "12px",
              sm: "14px",
            },
            fontWeight: "semibold",
          }}
        >
          {ALL_NAVIGATION_LINKS.all_categories.title}
        </Typography>
      </Box>

      {categories?.map((eachCategory) => (
        <EachCategorySubCategoryBrand
          key={eachCategory?.id}
          handleEachFilter={handleCategory}
          details={eachCategory}
        />
      ))}
    </Box>
  );
}
