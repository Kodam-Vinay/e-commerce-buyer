import { Box, Grid, Rating, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  CLOUDINARY_IMAGE_ACCESS_URL,
  DARK_MODE_COLOR,
  DARK_SHADE_COLOR,
  LIGHT_MODE_COLOR,
  LIGHT_SHADE_COLOR,
} from "../../utils/constants";
// import useDeviceResize from "../../hooks/useDeviceResize";

export default function EachProduct({ details }) {
  const isDarkMode = useSelector(
    (store) => store?.persistSliceReducer?.theme?.isDarkMode
  );
  // const size = useDeviceResize();

  return (
    <Grid
      item
      vxs={12}
      mxs={6}
      md={5}
      mdl={4}
      xl={3}
      xxl={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexShrink: 0,
        borderBottom: isDarkMode
          ? `1px solid ${LIGHT_SHADE_COLOR}`
          : `1px solid ${DARK_SHADE_COLOR}`,
        borderRight: {
          mxs: isDarkMode
            ? `1px solid ${LIGHT_SHADE_COLOR}`
            : `1px solid ${DARK_SHADE_COLOR}`,
        },
        padding: 1,
        height: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            vxs: "row",
            mxs: "column",
          },
          alignItems: {
            vxs: "center",
          },
          justifyContent: {
            vxs: "space-between",
            mxs: "start",
          },
        }}
      >
        {/* product image */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            maxWidth: {
              vxs: "40%",
              mxs: "80%",
            },
          }}
        >
          <img
            src={`${CLOUDINARY_IMAGE_ACCESS_URL}${process.env.REACT_APP_CLOUDINARY_PRODUCTS_PRESET}/${details?.images[0]?.url}`}
            alt={CLOUDINARY_IMAGE_ACCESS_URL + details?.images[0]?.url}
            className="flex-shrink-0 h-24 xs:h-36 my-auto flex-grow"
          />
          {details?.stock?.available === 0 && (
            <span className="text-xs text-center font-bold flex flex-col">
              <span>Not</span>
              <span>Availale</span>
            </span>
          )}
        </Box>

        {/* product text details */}
        <Box
          sx={{
            marginLeft: 3,
            paddingLeft: 1,
            paddingRight: 1,
            marginTop: 1,
            marginRight: "auto",
            columnGap: 2,
          }}
        >
          <Typography
            variant="p"
            fontSize="18px"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="mr-2 text-wrap">
              {details?.name?.slice(0, 14) + ".."}
            </span>
          </Typography>

          <Rating
            name="read-only"
            value={2.6}
            readOnly
            sx={{
              display: {
                sm: "none",
                marginLeft: -3,
              },
            }}
          />
          <Box
            sx={{
              backgroundColor: isDarkMode ? DARK_MODE_COLOR : LIGHT_MODE_COLOR,
              height: 30,
              borderRadius: 1,
              display: {
                vxs: "none",
                sm: "flex",
              },
              alignItems: "center",
              paddingRight: 1,
              paddingLeft: 1,
              maxWidth: "60px",
              justifyContent: "space-around",
            }}
          >
            <span className="font-bold">2.5</span>
            <FaStar size={16} color="yellow" />
          </Box>
          <Typography
            variant="p"
            fontSize="18px"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {"₹ " + details?.price}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
