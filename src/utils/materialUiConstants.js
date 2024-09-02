import {
  alpha,
  Box,
  Button,
  createTheme,
  InputBase,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import {
  ALL_NAVIGATION_LINKS,
  DARK_MODE_COLOR,
  NAVIGATION_LINKS,
} from "./constants";

export const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const customTheme = createTheme({
  breakpoints: {
    values: {
      vxs: 0,
      xs: 300,
      mxs: 475,
      sm: 640,
      md: 768,
      mdl: 850,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  zIndex: {
    drawer: 1200,
  },
});

//header

export const renderNavigationLinks = ({ navigate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          vxs: "column",
          sm: "row",
        },
      }}
    >
      {Object.keys(NAVIGATION_LINKS).map((eachNavigation) => (
        <MenuItem
          key={NAVIGATION_LINKS[eachNavigation].name}
          onClick={() => navigate(NAVIGATION_LINKS[eachNavigation].path)}
          sx={{
            fontWeight: "bold",
            display: "flex",
            flexDirection: "row",
            transition: "all 0.5s ease",
            "&:hover": {
              animation: "alternate",
              transform: "scale(1.05)",
            },
          }}
        >
          <span className="mr-1">
            {NAVIGATION_LINKS[eachNavigation].element}
          </span>
          <span className="sm:hidden mdl:block">
            {NAVIGATION_LINKS[eachNavigation].name}
          </span>
        </MenuItem>
      ))}
    </Box>
  );
};

export const RenderMenu = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  isDarkMode,
  navigate,
  handleLogout,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        marginTop: 6,
      }}
    >
      <Box
        sx={{
          backgroundColor: isDarkMode ? DARK_MODE_COLOR : "",
          marginTop: -1,
          marginBottom: -1,
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              vxs: "column",
            },
            marginLeft: 1,
            marginRight: 1,
            marginBottom: 1,
          }}
        >
          <MenuItem
            onClick={() => {
              navigate(ALL_NAVIGATION_LINKS.profile.path);
              handleMenuClose();
            }}
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              transition: "all 0.5s ease",
              "&:hover": {
                animation: "alternate",
                transform: "scale(1.05)",
              },
            }}
          >
            <span className="mr-1">{ALL_NAVIGATION_LINKS.profile.element}</span>
            <span className="">{ALL_NAVIGATION_LINKS.profile.name}</span>
          </MenuItem>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              vxs: "column",
            },
            bgcolor: "#f04646",
            marginLeft: 1,
            marginRight: 1,
            borderRadius: 1,
            ":hover": {
              bgcolor: "#ed2f2f",
            },
          }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              transition: "all 0.5s ease",
              "&:hover": {
                animation: "alternate",
                transform: "scale(1.05)",
              },
            }}
          >
            <span className="mr-1">{ALL_NAVIGATION_LINKS.logout.element}</span>
            <span className="">{ALL_NAVIGATION_LINKS.logout.name}</span>
          </MenuItem>
        </Box>
      </Box>
    </Menu>
  );
};

export const RenderMobileMenu = ({
  mobileMoreAnchorEl,
  mobileMenuId,
  isMobileMenuOpen,
  handleMobileMenuClose,
  userDetails,
  navigate,
  handleLogout,
  isDarkMode,
}) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      sx={{
        mt: 1,
        display: { vxs: "block", sm: "none" },
      }}
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {renderNavigationLinks({ navigate })}

      {userDetails?.jwtToken ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                vxs: "column",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate(ALL_NAVIGATION_LINKS.profile.path);
                handleMobileMenuClose();
              }}
              sx={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "row",
                transition: "all 0.5s ease",
                "&:hover": {
                  animation: "alternate",
                  transform: "scale(1.05)",
                },
              }}
            >
              <span className="mr-2">
                {ALL_NAVIGATION_LINKS.profile.element}
              </span>
              {ALL_NAVIGATION_LINKS.profile.name}
            </MenuItem>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 1,
              paddingRight: 1,
              marginTop: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "#f04646",
                ":hover": {
                  bgcolor: "#ed2f2f",
                },
                fontSize: {
                  sm: "10px",
                },
              }}
            >
              {ALL_NAVIGATION_LINKS.logout.name}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 1,
            paddingRight: 1,
            marginTop: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(ALL_NAVIGATION_LINKS.signin.path)}
            sx={{
              bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              "&:hover": {
                bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
              },
              fontSize: {
                sm: "10px",
              },
            }}
          >
            {ALL_NAVIGATION_LINKS.signin.name}
          </Button>
        </Box>
      )}
    </Menu>
  );
};

export const menuId = "primary-search-account-menu";

export const mobileMenuId = "primary-search-account-menu-mobile";
