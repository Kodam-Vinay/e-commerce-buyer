import { API_URL } from "../utils/constants";

export const postRequest = async ({
  setIsError,
  setError,
  details,
  apiUrl,
  token,
}) => {
  try {
    console.log("hello");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };

    const imageOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: details,
    };

    const sendOptions =
      apiUrl === "users/upload_image" ? imageOptions : options;

    const response = await fetch(API_URL + apiUrl, sendOptions);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
      setError(null);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const updateRequest = async ({
  setIsError,
  setError,
  details,
  apiUrl,
  token,
}) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(API_URL + apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
      setError(null);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const getRequest = async ({ setIsError, setError, apiUrl }) => {
  try {
    const response = await fetch(API_URL + apiUrl);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
      setError(null);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};
