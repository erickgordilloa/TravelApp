import axios from "axios";

const protocol = "https";
const url = "huecas.educalinks.com.ec:4443";
/* const mainApi = axios.create(); */
const baseUrl = `${protocol}://${url}/api`;
/* mainApi.interceptors.request.use(
  async function (config) {
    config.baseURL = `${protocol}://${url}/api`;
    console.log(config.baseURL);

    const token = localStorage.getItem("x-token");

    config.headers = {
      ...config.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

mainApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response;
  },
  function (error) {
    // console.log(error);
    let errorMessage = "";

    if (error.response) {
      if (Array.isArray(error.response.data.detail)) {
        errorMessage = error.response.data.detail.join(" ");
      }

      errorMessage = error.response.data.detail;
    } else {
      errorMessage = error.message;
    }

    return Promise.reject(errorMessage);
  }
); */

export { baseUrl };
