import { Box, Typography } from "@mui/material";
import {
  ALL_NAVIGATION_LINKS,
  API_STATUS_LIST,
  constructNavigateAPiUrl,
  renderResults,
  storeToastError,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CategoriesShimmer from "../shimmer/CategoriesShimmer";
import useGetData from "../hooks/useGetData";
import { storeBrandsList } from "../redux/slices/allFiltersSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storeBrandFilter } from "../redux/slices/filterSlice";
import EachCategorySubCategoryBrand from "./EachCategorySubCategoryBrand";

const RenderBrands = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const subCategory = useSelector((store) => store?.filter?.subCategory);
  const category = useSelector((store) => store?.filter?.category);
  const brandsList = useSelector((store) => store?.allFilters?.brandsList);
  const [searchParams] = useSearchParams();
  const encodedCategory = encodeURIComponent(
    category || searchParams?.get("category") || ""
  );
  const encodedSubCategory = encodeURIComponent(
    subCategory || searchParams?.get("sub_category") || ""
  );

  const handleBrandCategory = (brand) => {
    const encodedBrand = encodeURIComponent(brand);
    dispatch(storeBrandFilter(brand));
    const apiUrl = constructNavigateAPiUrl({
      encodedBrand,
      encodedCategory,
      encodedSubCategory,
      pathName: ALL_NAVIGATION_LINKS.products.path,
    });

    navigate(apiUrl);
  };

  useGetData({
    apiUrl: `brands/all?category=${encodedCategory}&sub_category=${encodedSubCategory}`,
    setData: (data) => dispatch(storeBrandsList(data?.brands)),
    setApiStatus,
    setError,
    setIsError,
  });

  useEffect(() => {
    if (isError) {
      storeToastError({ errorMessage: error });
    }
  }, [isError, error]);

  const renderSuccess = () => {
    return (
      <>
        {brandsList?.length > 0
          ? brandsList?.map((eachBrand) => (
              <EachCategorySubCategoryBrand
                details={eachBrand}
                key={eachBrand?.id}
                handleEachFilter={() => handleBrandCategory(eachBrand?.name)}
              />
            ))
          : setApiStatus(API_STATUS_LIST.nodata)}
      </>
    );
  };

  const renderLoader = () => {
    return <CategoriesShimmer />;
  };

  const renderNoList = () => {
    return <Typography variant="h6">No Brands Found</Typography>;
  };
  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {renderResults({ apiStatus, renderLoader, renderNoList, renderSuccess })}
    </Box>
  );
};

export default RenderBrands;
