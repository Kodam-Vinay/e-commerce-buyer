import { Box, Typography } from "@mui/material";
import ProductsCarousel from "../components/products/ProductsCarousel";
import {
  API_STATUS_LIST,
  renderResults,
  storeToastError,
} from "../utils/constants";
import useGetData from "../hooks/useGetData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCategoriesList } from "../redux/slices/allFiltersSlice";
import HomeCategories from "../components/HomeCategories";
import CategoriesShimmer from "../shimmer/CategoriesShimmer";

const Home = () => {
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const dispath = useDispatch();
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const categoriesList = useSelector(
    (store) => store?.allFilters?.categoriesList
  );

  useEffect(() => {
    if (isError) {
      storeToastError({ errorMessage: error });
    }
  }, [isError, error]);

  useEffect(() => {
    setApiStatus(API_STATUS_LIST.success);
  }, [categoriesList]);

  // categories
  useGetData({
    setData: (data) => dispath(storeCategoriesList(data?.categories)),
    setApiStatus,
    setError,
    setIsError,
    apiUrl: `categories/all`,
    shouldFetch: categoriesList?.length > 0 ? false : true,
  });

  const renderSuccess = () => {
    return (
      <>
        {categoriesList?.length > 0 ? (
          <HomeCategories categories={categoriesList} />
        ) : (
          setApiStatus(API_STATUS_LIST.nodata)
        )}
      </>
    );
  };

  const renderLoader = () => {
    return <CategoriesShimmer />;
  };

  const renderNoList = () => {
    return <Typography variant="h6">No Categories Found</Typography>;
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
      }}
    >
      {renderResults({ apiStatus, renderSuccess, renderLoader, renderNoList })}

      {/* categories */}

      <Box
        sx={{
          height: "200px",
        }}
      >
        <ProductsCarousel />
      </Box>
    </Box>
  );
};

export default Home;
