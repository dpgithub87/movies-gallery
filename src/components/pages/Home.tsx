import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Pagination, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { HomePagePropsType, Language, Location, Movie } from "../../types/types";
import ErrorModal from "../errorModal/ErrorModal";
import * as MoviesRequests from "../../apis/moviesApi/moviesRequests";
import "../../styles/pages/Home.scss"

const Home: FunctionComponent<PropsWithChildren<HomePagePropsType>> = ({
    history
  }): ReactElement => {
  
    const [language, setLanguage] = useState<string>("English");
    const [location, setLocation] = useState<string>("United States");
    const [searchCriteria, setSearchCriteria] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    
    const languages: Array<Language> = [
        {
          value: 'English',
          label: 'English',
        },
        {
          value: 'Spanish',
          label: 'Spanish',
        },
        {
          value: 'Italian',
          label: 'Italian',
        },
        {
          value: 'French',
          label: 'French',
        },
      ];

    const locations: Array<Location> = [
        {
          value: 'United States',
          label: 'United States',
        },
        {
          value: 'United Kingdom',
          label: 'United Kingdom',
        },
        {
          value: 'Italy',
          label: 'Italy',
        },
        {
          value: 'France',
          label: 'France',
        },
      ];

      useEffect(() => {
          getAllMovies();
      },[]);
      
      const maxDescriptionCharacterLenght: number = 150; 
      
      const getAllMovies: Function = (): void => {
        MoviesRequests.GetAllMovies()
          .then((res: any) => {
            const allMovies: Movie[] = res.data;
            localStorage.setItem("movies", JSON.stringify(allMovies));
            setMovies(allMovies);
          })
          .catch((err: any) => {
            console.log(err);
            setShowErrorModal(true);
          });
      };

    const handleLanguageChange = (e: any) => {
        setLanguage(e.target.value);
      };

    const handleSearchCriteria = (e: any) => {
        setSearchCriteria(e.target.value);
      };

      const handleLocationChange = (e: any) => {
        setLocation(e.target.value);
      };

      const closeErrorModal: Function = (): void => {
        setShowErrorModal(!showErrorModal);
      };

      const handlePageChange = (event: any, value: any): void => {
        setPageNumber(value);
      };

    return (
        <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movie Gallery
            </Typography>
            <Container maxWidth="sm">
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Here you can find the best movies.
                    Feel free to book one from our list.
                    You can use the filters to find your favorite movies.
                </Typography>
            </Container>
            <Stack
              maxWidth="lg"
              sx={{ pt: 4 }}
              direction="row"
              spacing={3}
              justifyContent="center"
            >
                <TextField
                    id="outlined-search"
                    label="Search movies by title"
                    type="search"
                    helperText="Please search a movie by title"
                    value={searchCriteria}
                    onChange={handleSearchCriteria}
                    variant="outlined"
                    className="moviesSearchBar"
                    />

                  <TextField
                    id="outlined-select-language"
                    select
                    label="Select Movie Language"
                    value={language}
                    onChange={handleLanguageChange}
                    className="moviesSelectLanguage">
                    {languages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined-select-location"
                    select
                    label="Select Movie Location"
                    value={location}
                    onChange={handleLocationChange}
                    className="moviesSelectLocation">
                    {locations.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                  </TextField>
            </Stack>
          </Container>
          <Container className="pageNumberContainer">
            <Typography>Page: {pageNumber}</Typography>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {movies.slice(((pageNumber-1)*3), 3+ (pageNumber-1)).map((movie, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    className="movieCardImage"
                    onClick={() => history.push(`/details/${movie.uniqueIdentifier}`)}
                    image={movie.poster}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.title}
                    </Typography>
                    <Typography>
                    {movie.plot.substr(0, Math.min(movie.plot.length, maxDescriptionCharacterLenght))}
                    {movie.plot.length > maxDescriptionCharacterLenght && '...'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => history.push(`/details/${movie.uniqueIdentifier}`)}>Details</Button>
                    <Button size="small" onClick={() => history.push(`/book/${movie.uniqueIdentifier}`)} >Book</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Container className="paginationContainer">
            <Pagination count={Math.ceil(movies.length / 3)} page={pageNumber} onChange={handlePageChange} />
          </Container>
        </Container>
        {showErrorModal && (
            <ErrorModal isOpen={showErrorModal} handleClose={closeErrorModal} />
        )}
      </main>
    );
  };

  export default Home;