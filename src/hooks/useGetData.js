import { useEffect } from "react";
import { getRequest } from "../api/apiCalls";
import { API_STATUS_LIST } from "../utils/constants";

const useGetData = ({
  apiUrl,
  setError,
  setIsError,
  setData,
  shouldFetch = true,
  dependencies = [],
  setApiStatus,
}) => {
  useEffect(() => {
    if (shouldFetch) {
      getData();
    }
  }, [shouldFetch, ...dependencies]);

  async function getData() {
    setApiStatus(API_STATUS_LIST.inProgress);
    const res = await getRequest({
      apiUrl,
      setError,
      setIsError,
    });
    if (res?.status) {
      setIsError(false);
      setData(res?.data);
      setApiStatus(API_STATUS_LIST.success);
    } else {
      setIsError(true);
      setError(res?.message);
      setApiStatus(API_STATUS_LIST.failure);
    }
  }
};

export default useGetData;
