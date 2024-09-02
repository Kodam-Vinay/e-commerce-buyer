import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  ALL_NAVIGATION_LINKS,
  constructNavigateAPiUrl,
  DARK_MODE_COLOR,
  DARK_SHADE_COLOR,
  LIGHT_MODE_COLOR,
  LIGHT_SHADE_COLOR,
  SORT_FILTER_OPTIONS,
} from "../../utils/constants";
import {
  storeSortFilter,
  toggleFilterStatus,
  toggleSortFilterStatus,
} from "../../redux/slices/filterSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const SortFilterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sortBoxRef = useRef();
  const [searchParams] = useSearchParams();
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  const sortByValue = useSelector((store) => store?.filter?.sortBy);
  const category = useSelector((store) => store?.filter?.category);
  const subCategory = useSelector((store) => store?.filter?.sub_category);
  const brand = useSelector((store) => store?.filter?.brand);
  const searchInput = useSelector((store) => store?.search?.searchInput);
  // const isSortFilterOpen = useSelector(
  //   (store) => store?.filter?.isSortFilterOpen
  // );

  const encodedCategory = encodeURIComponent(
    category || searchParams.get("category") || ""
  );

  const encodedSubCategory = encodeURIComponent(
    subCategory || searchParams.get("sub_category") || ""
  );

  const encodedBrand = encodeURIComponent(
    brand || searchParams.get("brand") || ""
  );

  const encodedSearchInput = encodeURIComponent(
    searchInput || searchParams.get("search_q") || ""
  );

  const handleCloseSortFilter = () => {
    dispatch(toggleSortFilterStatus(false));
    dispatch(toggleFilterStatus(false));
  };

  const sortArrays = Array(Object.keys(SORT_FILTER_OPTIONS).length).fill("");

  const sortInputRefs = useRef(sortArrays);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortBoxRef.current && !sortBoxRef.current.contains(event.target)) {
        handleCloseSortFilter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const activeIndex = Object.keys(SORT_FILTER_OPTIONS).findIndex(
      (key) => SORT_FILTER_OPTIONS[key] === sortByValue
    );
    if (activeIndex !== -1 && sortInputRefs.current[activeIndex]) {
      sortInputRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [sortByValue, SORT_FILTER_OPTIONS]);

  const handleSort = (e) => {
    const encodedSort = encodeURIComponent(e.target.value);
    dispatch(storeSortFilter(e.target.value));
    const apiUrl = constructNavigateAPiUrl({
      encodedBrand,
      encodedCategory,
      encodedSearchInput,
      encodedSubCategory,
      encodedSortByValue: encodedSort,
      pathName: ALL_NAVIGATION_LINKS.products.path,
    });
    navigate(apiUrl);
    const timer = setTimeout(() => {
      handleCloseSortFilter();
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <Box
      ref={sortBoxRef}
      sx={{
        overflow: "hidden",
        width: "100%",
        position: {
          vxs: "absolute",
          sm: "relative",
        },
        height: {
          vxs: "52%",
          sm: "45px",
        },
        display: "flex",
        flexDirection: {
          vxs: "column",
          sm: "row",
        },
        bottom: 0,
        zIndex: 10,
        backgroundColor: {
          vxs: isDarkMode ? "#4d4949" : LIGHT_SHADE_COLOR,
          sm: "transparent",
        },
        transition: "transform 0.3s ease-in-out",
        translate: "translateY(0)",
        borderBottom: isDarkMode
          ? `1px solid ${LIGHT_SHADE_COLOR}`
          : `1px solid ${DARK_SHADE_COLOR}`,
        paddingLeft: {
          vxs: 0,
          sm: 1,
        },
        paddingRight: {
          vxs: 0,
          sm: 1,
        },
      }}
    >
      <Box
        sx={{
          display: {
            vxs: "flex",
          },
          alignItems: "center",
          justifyContent: "space-between",
          padding: {
            vxs: 1,
            sm: 0,
          },
          borderBottom: {
            vxs: isDarkMode
              ? `1px solid ${LIGHT_SHADE_COLOR}`
              : `1px solid ${DARK_SHADE_COLOR}`,
            sm: "none",
            textWrap: "nowrap",
          },
          marginRight: {
            vxs: 0,
            sm: 2,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          SORT BY
        </Typography>
        <IconButton
          sx={{
            color: "red",
            transition: "transform 0.3s ease-in-out", // Smooth transition for the rotation
            "&:hover": {
              transform: "rotate(90deg)", // Rotate 90 degrees on hover
            },
            display: {
              vxs: "flex",
              sm: "none",
            },
          }}
          onClick={handleCloseSortFilter}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: {
            vxs: "column",
            sm: "row",
          },
        }}
      >
        <RadioGroup
          defaultValue={SORT_FILTER_OPTIONS.relavance}
          name="sort-filters-group"
          value={sortByValue}
          sx={{
            display: "flex",
            flexDirection: {
              vxs: "column",
              sm: "row",
            },
            overflowX: "auto",
            flexWrap: "nowrap",
            width: "100%",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            gap: {
              vxs: 0,
              sm: 2,
            },
          }}
        >
          {Object.keys(SORT_FILTER_OPTIONS).map((eachFilter, index) => (
            <FormControlLabel
              ref={(el) => (sortInputRefs.current[index] = el)}
              onChange={handleSort}
              sx={{
                display: "flex",
                width: {
                  vxs: "100%",
                  sm: "fit-content",
                },
                borderBottom: {
                  vxs: "none",
                  sm:
                    sortByValue === SORT_FILTER_OPTIONS[eachFilter]
                      ? isDarkMode
                        ? `3px solid ${DARK_MODE_COLOR}`
                        : `3px solid ${LIGHT_MODE_COLOR}`
                      : "",
                },
                textWrap: "nowrap",
                margin: 0,
                color:
                  sortByValue === SORT_FILTER_OPTIONS[eachFilter]
                    ? isDarkMode
                      ? DARK_MODE_COLOR
                      : LIGHT_MODE_COLOR
                    : "",
              }}
              key={eachFilter}
              value={SORT_FILTER_OPTIONS[eachFilter]}
              control={
                <Radio
                  sx={{
                    color: isDarkMode ? DARK_MODE_COLOR : LIGHT_MODE_COLOR,
                    "&.Mui-checked": {
                      color: isDarkMode ? DARK_MODE_COLOR : "", // Checked color
                    },
                    display: {
                      sm: "none",
                    },
                  }}
                />
              }
              label={SORT_FILTER_OPTIONS[eachFilter]}
              componentsProps={{
                typography: {
                  fontWeight:
                    sortByValue === SORT_FILTER_OPTIONS[eachFilter]
                      ? "bold"
                      : "normal",
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SortFilterPage;
