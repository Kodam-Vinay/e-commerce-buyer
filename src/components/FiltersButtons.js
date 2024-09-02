import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PiSortAscending } from "react-icons/pi";
import { CiSliderHorizontal } from "react-icons/ci";
import {
  DARK_MODE_COLOR,
  DARK_SHADE_COLOR,
  LIGHT_SHADE_COLOR,
} from "../utils/constants";
import {
  toggleFilterStatus,
  toggleSortFilterStatus,
} from "../redux/slices/filterSlice";

const FiltersButtons = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  const handleClickSort = () => {
    dispatch(toggleSortFilterStatus(true));
    dispatch(toggleFilterStatus(false));
  };
  const handleClickFilter = () => {
    dispatch(toggleFilterStatus(true));
    dispatch(toggleSortFilterStatus(false));
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: {
          vxs: "flex",
          sm: "none",
        },
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        marginLeft: "auto",
        marginRight: "auto",
        borderTop: isDarkMode
          ? `1px solid ${LIGHT_SHADE_COLOR}`
          : `1px solid ${DARK_SHADE_COLOR}`,
      }}
    >
      <Button
        variant="contained"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
          color: isDarkMode ? "" : DARK_MODE_COLOR,
          borderRadius: 0,
          ":hover": {
            backgroundColor: isDarkMode ? "#737070" : "#f2f2f2",
            boxShadow: "none",
          },
        }}
        onClick={handleClickSort}
      >
        <PiSortAscending size={20} />
        <span className="ml-1">Sort</span>
      </Button>
      <Typography
        sx={{
          fontSize: "24px",
          color: isDarkMode ? LIGHT_SHADE_COLOR : DARK_SHADE_COLOR,
        }}
      >
        |
      </Typography>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
          color: isDarkMode ? "" : DARK_MODE_COLOR,
          borderRadius: 0,
          ":hover": {
            backgroundColor: isDarkMode ? "#737070" : "#f2f2f2",
            boxShadow: "none",
          },
        }}
        onClick={handleClickFilter}
      >
        <CiSliderHorizontal size={20} />
        <span className="ml-1">Filter</span>
      </Button>
    </Box>
  );
};

export default FiltersButtons;
