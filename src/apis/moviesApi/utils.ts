import Axios, { AxiosResponse, Canceler } from "axios";
import { MoviesApiHost } from "../apiHost";

// export const getAccessToken = (): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       let authToken = sessionStorage.getItem("AuthToken");
//       authToken !== null && resolve(authToken);
//     });
//   };

export const axios = () =>
Axios.create({
  baseURL: MoviesApiHost,
  timeout: 30000
});

export const getHeaders = () => {
    return {
        headers: {
            //Authorization: `Bearer ${token}`,
            ContentType: "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
};
