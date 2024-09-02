import { Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";

const CategoriesShimmer = () => {
  const activePath = useSelector(
    (store) => store?.persistSliceReducer?.path?.activePath
  );
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        marginLeft:
          activePath === ALL_NAVIGATION_LINKS.all_categories.path ? 0 : 1,
        marginBottom: activePath === ALL_NAVIGATION_LINKS.home.path ? 0 : 1,
        marginTop: 1,
        flexWrap:
          activePath === ALL_NAVIGATION_LINKS.all_categories.path
            ? "wrap"
            : "nowrap",
      }}
    >
      {Array(10)
        .fill("")
        .map((each, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              whiteSpace: "nowrap",
              width: {
                vxs:
                  activePath === ALL_NAVIGATION_LINKS.home.path
                    ? "90px"
                    : "90px",
                sm:
                  activePath === ALL_NAVIGATION_LINKS.home.path
                    ? "90px"
                    : "120px",
              },
              flexShrink: 0,
              padding: 1,
            }}
            key={index}
          >
            <Skeleton
              variant="rounded"
              width={activePath === ALL_NAVIGATION_LINKS.home.path ? 40 : 80}
              height={activePath === ALL_NAVIGATION_LINKS.home.path ? 35 : 80}
            />
            <Skeleton
              variant="rounded"
              width={
                activePath === ALL_NAVIGATION_LINKS.all_categories.path
                  ? 80
                  : 100
              }
              height={
                activePath === ALL_NAVIGATION_LINKS.all_categories.path
                  ? 15
                  : 20
              }
              sx={{
                marginTop: 1,
              }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default CategoriesShimmer;
