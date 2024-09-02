import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DARK_MODE_COLOR, NAVIGATION_LINKS } from "../utils/constants";

const ErrorPage = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        textAlign="center"
        marginBottom={4}
      >
        Something Error Happend
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(NAVIGATION_LINKS.home.path)}
        sx={{
          bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
          "&:hover": {
            bgcolor: isDarkMode ? DARK_MODE_COLOR : "",
          },
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default ErrorPage;
