import { Box } from "@mui/material";
import { Puff } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { DARK_MODE_COLOR, LIGHT_MODE_COLOR } from "../utils/constants";

export default function EntryPageLoader() {
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Puff
        visible={true}
        height="80"
        width="80"
        color={isDarkMode ? DARK_MODE_COLOR : LIGHT_MODE_COLOR}
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Box>
  );
}
