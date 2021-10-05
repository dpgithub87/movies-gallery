import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Pagination, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { HomePagePropsType, Language, Location, Movie } from "../../types/types";
import ErrorModal from "../errorModal/ErrorModal";
import * as MoviesRequests from "../../apis/moviesApi/moviesRequests";
import "../../styles/pages/Home.scss"
import { MovieFilter } from "@mui/icons-material";

const Home: FunctionComponent<PropsWithChildren<HomePagePropsType>> = ({
    history
  }): ReactElement => {
  
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [languageFilter, setLanguageFilter] = useState<string>("");
    const [titleFilter, setTitleFilter] = useState<string>("");
    
      useEffect(() => {
        getAllMovies();
      },[]);
      
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

      const maxDescriptionCharacterLenght: number = 150;
      
      const getAllMovies = (): void => {
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
      let filteredMovies: Movie[] = JSON.parse(localStorage.getItem("movies")!);

      if(titleFilter)
        filteredMovies = filteredMovies.filter(m => 
          m.language.toLowerCase().includes(e.target.value.toLowerCase()) && 
          m.title.toLowerCase().includes(titleFilter.toLowerCase()));
      else
        filteredMovies = filteredMovies.filter(m => 
          m.language.toLowerCase().includes(e.target.value.toLowerCase()));

        setLanguageFilter(e.target.value);
        setMovies(filteredMovies);
      };
        
      const handleSearchCriteriaByTitle = (e: any) => {
        let filteredMovies: Movie[] = JSON.parse(localStorage.getItem("movies")!);

        if(languageFilter)
          filteredMovies = filteredMovies.filter(m => 
            m.title.toLowerCase().includes(e.target.value.toLowerCase()) && 
            m.language.toLowerCase().includes(languageFilter.toLowerCase()));
        else
          filteredMovies = filteredMovies.filter(m => 
            m.title.toLowerCase().includes(e.target.value.toLowerCase()));

        setTitleFilter(e.target.value);
        setMovies(filteredMovies);
      };

        const closeErrorModal = (): void => {
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
                    onChange={handleSearchCriteriaByTitle}
                    variant="outlined"
                    className="moviesSearchBar"
                    />

                  <TextField
                    id="outlined-select-language"
                    select
                    label="Select Movie Language"
                    onChange={handleLanguageChange}
                    className="moviesSelectLanguage"
                  >
                    <MenuItem aria-label="None" key="empty" value="">
                      &nbsp;
                    </MenuItem>
                    {languages.map((option) => (
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
                    <br/>
                    <Typography>
                      <strong>Language:</strong> {movie.language}
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