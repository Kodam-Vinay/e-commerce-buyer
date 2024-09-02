import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useGetData from "../hooks/useGetData";
import { storeSubCategoriesList } from "../redux/slices/allFiltersSlice";
import { useEffect, useState } from "react";
import {
  ALL_NAVIGATION_LINKS,
  API_STATUS_LIST,
  constructNavigateAPiUrl,
  renderResults,
  storeToastError,
} from "../utils/constants";
import EachCategorySubCategoryBrand from "./EachCategorySubCategoryBrand";
import CategoriesShimmer from "../shimmer/CategoriesShimmer";
import { useNavigate, useParams } from "react-router-dom";
import { storeSubCategoryFilter } from "../redux/slices/filterSlice";

const RenderSubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const category = useSelector((store) => store?.filter?.category);
  const subCategoriesList = useSelector(
    (store) => store?.allFilters?.subCategoriesList
  );
  const { category: pathCategory } = useParams();
  const encodedCategory = encodeURIComponent(category || pathCategory || "");

  useEffect(() => {
    if (isError) {
      storeToastError({ errorMessage: error });
    }
  }, [isError, error]);

  useGetData({
    apiUrl: `sub-categories/all?category=${
      encodedCategory ? encodedCategory : pathCategory
    }`,
    setApiStatus,
    setData: (data) => dispatch(storeSubCategoriesList(data?.subCategories)),
    setError,
    setIsError,
  });

  const handleSubCategory = (subCategory) => {
    const encodedSubCategory = encodeURIComponent(subCategory);
    dispatch(storeSubCategoryFilter(subCategory));
    const apiUrl = constructNavigateAPiUrl({
      encodedCategory,
      encodedSubCategory,
      pathName: ALL_NAVIGATION_LINKS.all_brands.path,
    });
    navigate(apiUrl);
  };

  const renderSuccess = () => {
    return (
      <>
        {subCategoriesList?.length > 0
          ? subCategoriesList?.map((eachSubCategory) => (
              <EachCategorySubCategoryBrand
                details={eachSubCategory}
                key={eachSubCategory?.id}
                handleEachFilter={() =>
                  handleSubCategory(eachSubCategory?.name)
                }
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

export default RenderSubCategories;
