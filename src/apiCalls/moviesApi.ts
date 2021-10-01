import Axios, { AxiosResponse, Canceler } from "axios";
import { Movie } from "../types/types";
import { MoviesApiHost } from "./apiHost";

const axios = () =>
  Axios.create({
    baseURL: MoviesApiHost,
    timeout: 30000
});

const CancelToken = Axios.CancelToken;
export let Cancel: Canceler;

const getHeaders = () => {
    return {
      headers: {
        ContentType: "application/json"
      },
      cancelToken: new CancelToken(function executor(cancelToken) {
        Cancel = cancelToken;
      })
    };
  };
  

  export const GetAllMovies = (): Promise<AxiosResponse> =>
    axios()
      .get(
        "/Movies/Movies",
        getHeaders()
      )
      .then((res) => res)
      .catch((error) => {
        throw error; //Open error modal
    });
  
    export const GetMovie = (movieTitle: string): Promise<AxiosResponse> =>
    axios().get(`/Movies/Movie?signalRConnectionID=${movieTitle}`, getHeaders())
      .then((res) => res)
      .catch((error) => {
        throw error; //Open error modal
    });

    export const AddMovie = (movie: Movie) =>
    axios().post(`/Movies/Movie/`, movie, getHeaders())
      .then((res) => res)
      .catch((error) => {
        throw error; //Open error modal
    });

    export const UpdateMovie = (movie: Movie) =>
    axios().put(`/Movies/Movie/`, movie, getHeaders())
      .then((res) => res)
      .catch((error) => {
        throw error; //Open error modal
    });
  

    // ( TO DO ) Login


    // ( TO DO ) Register
    