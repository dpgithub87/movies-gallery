import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { HomePagePropsType, Language, Location, Movie } from "../../types/types";
import * as MoviesRequests from "../../apis/moviesApi/moviesRequests";
import "../../styles/pages/Home.scss"
import ErrorModal from "../errorModal/ErrorModal";

const Home: FunctionComponent<PropsWithChildren<HomePagePropsType>> = ({
    history
  }): ReactElement => {
  
    const [language, setLanguage] = useState<string>("English");
    const [location, setLocation] = useState<string>("United States");
    const [searchCriteria, setSearchCriteria] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

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


      const moviesEx = [1,2,3,4,5,6,7,8,9];
      useEffect(() => {
          getAllMovies();
      },[]);
      
      const getAllMovies: Function = (): void => {
        MoviesRequests.GetAllMovies()
          .then((res: any) => {
            const allMovies: Movie[] = res.data;
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
        setSearchCriteria(e.target.value);
      };

      const closeErrorModal: Function = (): void => {
        setShowErrorModal(!showErrorModal);
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
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {moviesEx.map((m) => (
              <Grid item key={m} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                    sx={{ height: '50%' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Details</Button>
                    <Button size="small">Book</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {showErrorModal && (
            <ErrorModal isOpen={showErrorModal} handleClose={closeErrorModal} />
        )}
      </main>
    );
  };

  export default Home;