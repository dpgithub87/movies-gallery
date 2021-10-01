const url = (): string => `https://${window.location.host}`;

export const MoviesApiHost: string =
  process.env.NODE_ENV === "production"
    ? `${url()}/movies/api/`
    : "https://localhost:44393/api/";
