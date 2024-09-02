import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  API_STATUS_LIST,
  renderResults,
  storeToastError,
} from "../utils/constants";
import useGetData from "../hooks/useGetData";
import { useEffect, useState } from "react";
import { storeCategoriesList } from "../redux/slices/allFiltersSlice";
import CategoriesShimmer from "../shimmer/CategoriesShimmer";
import EachCategorySubCategoryBrand from "../components/EachCategorySubCategoryBrand";
import { useNavigate } from "react-router-dom";
import { storeCategoryFilter } from "../redux/slices/filterSlice";

const AllCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
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

  useGetData({
    apiUrl: "categories/all",
    setData: (data) => dispatch(storeCategoriesList(data?.categories)),
    setError,
    setApiStatus,
    setIsError,
    shouldFetch: categoriesList?.length > 0 ? false : true,
  });

  const handleCategory = (category) => {
    navigate(`/${category}`);
    dispatch(storeCategoryFilter(category));
  };

  const renderSuccess = () => {
    return (
      <>
        {categoriesList?.length > 0
          ? categoriesList?.map((eachCategory) => (
              <EachCategorySubCategoryBrand
                details={eachCategory}
                key={eachCategory?.id}
                handleEachFilter={() => handleCategory(eachCategory?.name)}
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
    return <Typography variant="h6">No Categories Found</Typography>;
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

export default AllCategories;
