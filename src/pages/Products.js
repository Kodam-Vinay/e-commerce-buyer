import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  API_STATUS_LIST,
  constructProductsApiUrl,
  renderResults,
  SORT_FILTER_OPTIONS,
  storeToastError,
} from "../utils/constants";
import useGetData from "../hooks/useGetData";
import { storeProductsList } from "../redux/slices/productSlice";
import CategoriesShimmer from "../shimmer/CategoriesShimmer";
import EachProduct from "../components/products/EachProduct";
import FiltersButtons from "../components/FiltersButtons";

const Products = () => {
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const productsList = useSelector((store) => store?.product?.productsList);
  const [searchParams] = useSearchParams();
  const category = useSelector((store) => store?.filter?.category);
  const subCategory = useSelector((store) => store?.filter?.sub_category);
  const brand = useSelector((store) => store?.filter?.brand);
  const searchInput = useSelector((store) => store?.search?.searchInput);
  const sortByValue = useSelector((store) => store?.filter?.sortBy);

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
  const encodedSortByValue = encodeURIComponent(
    sortByValue || searchParams.get("sort") || SORT_FILTER_OPTIONS.relavance
  );

  useEffect(() => {
    if (isError) {
      storeToastError({ errorMessage: error });
    }
  }, [isError, error]);

  const productsAPi = constructProductsApiUrl({
    encodedBrand,
    encodedCategory,
    encodedSearchInput,
    encodedSubCategory,
    encodedSortByValue,
  });

  useGetData({
    apiUrl: productsAPi,
    setApiStatus,
    setError,
    setIsError,
    setData: (data) => dispatch(storeProductsList(data?.products)),
    dependencies: [
      encodedCategory,
      encodedSubCategory,
      encodedBrand,
      encodedSortByValue,
      searchParams.get("search_q"),
    ],
  });

  const renderLoader = () => {
    return <CategoriesShimmer />;
  };

  const renderSuccess = () => {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 6,
        }}
      >
        {/* {productsList?.length > 0
          ? productsList?.map((eachProduct) => (
              <EachProduct
                details={eachProduct}
                key={eachProduct?.product_id}
              />
            ))
          : setApiStatus(API_STATUS_LIST.nodata)} */}
        {productsList?.length > 0 ? (
          <EachProduct
            details={productsList[0]}
            // key={eachProduct?.product_id}
          />
        ) : (
          setApiStatus(API_STATUS_LIST.nodata)
        )}
        <FiltersButtons />
      </Grid>
    );
  };

  const renderNoList = () => {
    return (
      <Typography variant="h6">
        {searchParams.get("search_q")
          ? `No Products Found with "${searchParams.get("search_q")}"`
          : "No Products Found"}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {/* add sort filter */}
      {renderResults({ apiStatus, renderLoader, renderNoList, renderSuccess })}
    </Box>
  );
};

export default Products;
