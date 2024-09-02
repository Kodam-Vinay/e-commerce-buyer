import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import {
  menuId,
  mobileMenuId,
  RenderMenu,
  RenderMobileMenu,
  renderNavigationLinks,
  SearchBar,
} from "../utils/materialUiConstants";
import useDeviceCheck from "../hooks/useDeviceCheck";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "../redux/slices/themeSlice";
import {
  ALL_NAVIGATION_LINKS,
  CLOUDINARY_IMAGE_ACCESS_URL,
  constructProductsApiUrl,
  DARK_MODE_COLOR,
  LIGHT_SHADE_COLOR,
  storeToastError,
  ToggleButton,
} from "../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDeviceResize from "../hooks/useDeviceResize";
import { Avatar, Button, Grid, InputBase } from "@mui/material";
import { storeUserInfo } from "../redux/slices/userSlice";
import {
  storeSearchInput,
  toggleSearchClick,
} from "../redux/slices/searchSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchBarInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const searchInput = useSelector((store) => store?.search?.searchInput);
  const category = useSelector((store) => store?.filter?.category);
  const subCategory = useSelector((store) => store?.filter?.sub_category);
  const brand = useSelector((store) => store?.filter?.brand);
  const activePath = useSelector(
    (store) => store?.persistSliceReducer?.path?.activePath
  );
  const checkSearchClicked = useSelector(
    (store) => store?.search?.isSearchClicked
  );
  const [searchParams, setSearchParams] = useSearchParams();

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

  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );

  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const isMobile = useDeviceCheck();
  const size = useDeviceResize();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchIconClicked = Boolean(searchAnchorEl);
  const isFilterOpen = useSelector((store) => store?.filter?.isFilterOpen);
  const isSortFilterOpen = useSelector(
    (store) => store?.filter?.isSortFilterOpen
  );

  useEffect(() => {
    if (size?.width > 640 || !isMobile) {
      handleMenuClose();
      handleSearchClose();
    }
  }, [size, isMobile]);

  useEffect(() => {
    if (searchParams.get("search_q")) {
      dispatch(storeSearchInput(searchParams.get("search_q")));
    } else if (!searchParams.get("search_q")) {
      dispatch(storeSearchInput(""));
    }
  }, [activePath, searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    if (checkSearchClicked) {
      dispatch(toggleSearchClick(false));
    }
  }, [checkSearchClicked, dispatch]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchOpen = (event) => {
    setSearchAnchorEl(event.currentTarget);
    const timer = setTimeout(() => {
      if (searchBarInputRef.current) {
        searchBarInputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timer);
  };

  const handleSearchClose = () => {
    const timer = setTimeout(() => {
      setSearchAnchorEl(null);
    }, 100);
    return () => clearTimeout(timer);
  };

  const handleChangeSearchInput = (e) => {
    dispatch(storeSearchInput(e.target.value));
  };

  const handleKeyDownSearchInput = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    const productsAPi = constructProductsApiUrl({
      encodedBrand,
      encodedCategory,
      encodedSearchInput,
      encodedSubCategory,
    }).replace("/all", "");
    if (searchInput?.toString().trim()?.length > 0) {
      handleSearchClose();
      navigate(productsAPi);
      dispatch(toggleSearchClick(true));
    } else {
      storeToastError({ errorMessage: "Please Enter At Least one character" });
    }
  };

  const handleLogout = () => {
    dispatch(storeUserInfo({}));
    navigate(ALL_NAVIGATION_LINKS.signin.path);
    handleMenuClose();
  };

  return (
    <Grid
      item
      vxs={12}
      sx={{
        height: size?.height < 900 ? "10%" : size?.height < 1100 ? "8%" : "6%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
          height: "100%",
          opacity:
            (isFilterOpen || isSortFilterOpen) && size.width <= 640 ? 0.5 : 1,
        }}
      >
        <Toolbar
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <IconButton
            onClick={() => navigate(ALL_NAVIGATION_LINKS.home.path)}
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <h1>Logo</h1>
          </IconButton>

          <SearchBar
            sx={{
              display: { vxs: "none", sm: "flex" },
              height: "40px",
            }}
          >
            <InputBase
              onKeyDown={(e) => handleKeyDownSearchInput(e)}
              onChange={(e) => handleChangeSearchInput(e)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                paddingLeft: 1,
                paddingTop: 0,
                paddingBottom: 0,
                height: "40px",
                color: "white",
              }}
              value={searchInput}
            />

            <IconButton onClick={handleSearchClick}>
              <SearchIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </SearchBar>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{ display: { vxs: "none", sm: "flex", flexDirection: "row" } }}
          >
            {renderNavigationLinks({ navigate })}
          </Box>

          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleSearchOpen}
            sx={{
              display: {
                sm: "none",
              },
              marginRight: 1,
            }}
          >
            <SearchIcon />
          </IconButton>

          <ToggleButton
            handleToggle={() => dispatch(toggleThemeMode())}
            isChecked={isDarkMode}
            isDarkMode={isDarkMode}
          />

          <Box sx={{ display: { vxs: "none", sm: "flex" }, marginLeft: 1 }}>
            {userDetails?.jwtToken ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {userDetails?.image ? (
                  <Avatar
                    src={`${CLOUDINARY_IMAGE_ACCESS_URL}${process.env.REACT_APP_CLOUDINARY_PRESET}/${userDetails?.image}`}
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />
                ) : (
                  <AccountCircle
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />
                )}
              </IconButton>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate(ALL_NAVIGATION_LINKS.signin.path)}
                sx={{
                  bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
                  "&:hover": {
                    bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
                  },
                }}
              >
                {ALL_NAVIGATION_LINKS.signin.name}
              </Button>
            )}
          </Box>

          <Box sx={{ display: { vxs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <Menu
          anchorEl={searchAnchorEl}
          sx={{
            display: { vxs: "flex", sm: "none" },
          }}
          open={isSearchIconClicked}
          onClose={handleSearchClose}
        >
          <SearchBar
            sx={{
              display: { vxs: "flex", sm: "none" },
              height: "60px",
              bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              "&:hover": {
                bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              },
              marginTop: -1,
              marginBottom: -1,
            }}
          >
            <InputBase
              inputRef={searchBarInputRef}
              onKeyDown={(e) => handleKeyDownSearchInput(e)}
              onChange={(e) => handleChangeSearchInput(e)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                paddingLeft: 1,
                paddingTop: 0,
                paddingBottom: 0,
                height: "60px",
                color: isDarkMode ? LIGHT_SHADE_COLOR : "",
              }}
              value={searchInput}
            />
            <IconButton
              onClick={handleSearchClick}
              sx={{
                color: isDarkMode ? LIGHT_SHADE_COLOR : "",
              }}
            >
              <SearchIcon />
            </IconButton>
          </SearchBar>
        </Menu>
      </AppBar>

      <RenderMobileMenu
        handleLogout={handleLogout}
        handleMobileMenuClose={handleMobileMenuClose}
        isDarkMode={isDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        navigate={navigate}
        renderNavigationLinks={renderNavigationLinks}
        userDetails={userDetails}
      />

      <RenderMenu
        anchorEl={anchorEl}
        handleLogout={handleLogout}
        handleMenuClose={handleMenuClose}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        menuId={menuId}
        navigate={navigate}
      />
    </Grid>
  );
}
