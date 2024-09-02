import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import useDeviceResize from "../../hooks/useDeviceResize";
import { DARK_SHADE_COLOR, LIGHT_SHADE_COLOR } from "../../utils/constants";
import {
  toggleFilterStatus,
  toggleSortFilterStatus,
} from "../../redux/slices/filterSlice";
import { useEffect, useRef } from "react";

const FiltersPage = () => {
  const dispatch = useDispatch();
  const filterBoxRef = useRef();
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  const size = useDeviceResize();
  const handleCloseFilter = () => {
    dispatch(toggleSortFilterStatus(false));
    dispatch(toggleFilterStatus(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(event.target)
      ) {
        handleCloseFilter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={filterBoxRef}
      sx={{
        position: size?.width <= 640 ? "absolute" : "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: {
          vxs: "90%",
          sm: "100%",
        },
        bottom: 0,
        zIndex: 10,
        backgroundColor: {
          vxs: isDarkMode ? "#4d4949" : LIGHT_SHADE_COLOR,
          sm: isDarkMode ? DARK_SHADE_COLOR : "#fff",
          borderRight: isDarkMode
            ? `1px solid ${LIGHT_SHADE_COLOR}`
            : `1px solid ${DARK_SHADE_COLOR}`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          borderBottom: isDarkMode
            ? `1px solid ${LIGHT_SHADE_COLOR}`
            : `1px solid ${DARK_SHADE_COLOR}`,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          FILTERS
        </Typography>

        {size?.width <= 640 && (
          <IconButton
            sx={{
              color: "red",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "rotate(90deg)",
              },
            }}
            onClick={handleCloseFilter}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FiltersPage;
