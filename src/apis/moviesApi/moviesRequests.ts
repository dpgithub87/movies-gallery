import { AxiosResponse } from "axios";
import { Movie } from "../../types/types";  
import { axios, getHeaders } from "./utils";

  export const GetAllMovies = (): Promise<AxiosResponse> =>
    axios()
      .get(
        "/Movies/Movies",
        getHeaders()
      )
      .then((res) => res);
  
    export const GetMovie = (movieTitle: string): Promise<AxiosResponse> =>
    axios().get(`/Movies/Movie?signalRConnectionID=${movieTitle}`, getHeaders())
      .then((res) => res);

    export const AddMovie = (movie: Movie) =>
    axios().post(`/Movies/Movie/`, movie, getHeaders())
      .then((res) => res);

    export const UpdateMovie = (movie: Movie) =>
    axios().put(`/Movies/Movie/`, movie, getHeaders())
      .then((res) => res);

    