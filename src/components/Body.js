import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import EntryPageLoader from "./EntryPageLoader";
import Header from "./Header";
import {
  ALL_NAVIGATION_LINKS,
  DARK_SHADE_COLOR,
  LIGHT_SHADE_COLOR,
} from "../utils/constants";
import { storeActivePath } from "../redux/slices/pathSlice";
import useDeviceResize from "../hooks/useDeviceResize";
import {
  toggleFilterStatus,
  toggleSortFilterStatus,
} from "../redux/slices/filterSlice";
import FiltersPage from "./filters/FiltersPage";
import SortFilterPage from "./filters/SortFilterPage";

const Body = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const size = useDeviceResize();
  const activePath = useSelector(
    (store) => store?.persistSliceReducer?.path?.activePath
  );

  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  const isFilterOpen = useSelector((store) => store?.filter?.isFilterOpen);
  const isSortFilterOpen = useSelector(
    (store) => store?.filter?.isSortFilterOpen
  );

  useEffect(() => {
    dispatch(storeActivePath(location.pathname));
  }, [location.pathname]);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (size?.width > 640) {
      dispatch(toggleFilterStatus(true));
    } else {
      dispatch(toggleFilterStatus(false));
      dispatch(toggleSortFilterStatus(false));
    }
  }, [size]);

  return (
    <>
      {showLoader ? (
        <EntryPageLoader />
      ) : (
        <Grid
          container
          sx={{
            height: "100%",
          }}
        >
          <Header />
          <Grid
            container
            sx={{
              height: "90%",
              backgroundColor: isDarkMode ? DARK_SHADE_COLOR : "",
              color: isDarkMode ? LIGHT_SHADE_COLOR : "",
              overflow: "hidden",
              display: "flex",
              flexDirection: {
                vxs: "column",
                sm: "row",
              },
            }}
          >
            {activePath === ALL_NAVIGATION_LINKS.products.path && (
              <>
                {size.width <= 640 && isFilterOpen && (
                  <Grid item vxs={12}>
                    <FiltersPage />
                  </Grid>
                )}

                {size.width <= 640 && isSortFilterOpen && (
                  <Grid item vxs={12}>
                    <SortFilterPage />
                  </Grid>
                )}

                {size.width > 640 && (
                  <Grid item vxs={12} sm={4} md={3} xl={2}>
                    <FiltersPage />
                  </Grid>
                )}
              </>
            )}
            <Grid
              item
              vxs={12}
              sm={activePath === ALL_NAVIGATION_LINKS.products.path ? 8 : 12}
              md={activePath === ALL_NAVIGATION_LINKS.products.path ? 9 : 12}
              xl={activePath === ALL_NAVIGATION_LINKS.products.path ? 10 : 12}
              sx={{
                height: "100%",
                overflowY: "auto",
                opacity:
                  (isFilterOpen || isSortFilterOpen) && size.width <= 640
                    ? 0.5
                    : 1,
              }}
            >
              {activePath === ALL_NAVIGATION_LINKS.products.path &&
                size.width > 640 && (
                  <Grid item>
                    <SortFilterPage />
                  </Grid>
                )}
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Body;
