import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { Box, ThemeProvider } from "@mui/material";
import { customTheme } from "./utils/materialUiConstants";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            height: "100vh",
          }}
        >
          <ToastContainer />
          <AppRoutes />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
