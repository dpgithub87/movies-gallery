using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MoviesGallery.Models.Interfaces.Repository;
using MoviesGallery.Models.Interfaces.ViewModels;
using MoviesGallery.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoviesGallery.Backend.Controllers
{
    [ApiController]
    public class MoviesController : Controller
    {
        private readonly ILogger<MoviesController> _logger;

        private readonly IMoviesRepository _moviesRepository;

        public MoviesController(ILogger<MoviesController> logger, IMoviesRepository moviesRepository)
        {
            _logger = logger;

            _moviesRepository = moviesRepository;
        }

        [HttpGet]
        [MapToApiVersion("2.0")]
        [Route("api/v2/[controller]/GetAllMovies")]
        public async Task<IActionResult> GetAllMovies()
        {
            List<IMovieViewModel> allMovies = new List<IMovieViewModel>();

            try
            {
                allMovies = await GetAllMoviesList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error : {e.Message}!");
                return BadRequest(500);
            }

            return Ok(allMovies);
        }

        [HttpGet]
        [MapToApiVersion("2.0")]
        [Route("api/v2/[controller]/GetMovieByTitle")]
        public async Task<IActionResult> GetMovieByTitle(string movieTitle)
        {
            IMovieViewModel movie = new MovieViewModel();

            try
            {
                movie = await GetMovie(movieTitle);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error : {e.Message}!");
                return BadRequest(500);
            }

            return Ok(movie);
        }

        [HttpPost]
        [MapToApiVersion("2.0")]
        [Route("api/v2/[controller]/AddMovie")]
        public async Task<IActionResult> AddMovie([FromBody] MovieViewModel movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(400);
            }

            try
            {
                await InsertOrUpdateMovie(movie);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error : {e.Message}!");
                return BadRequest(500);
            }

            return Ok(movie);
        }

        [HttpPut]
        [MapToApiVersion("2.0")]
        [Route("api/v2/[controller]/UpdateMovie")]
        public async Task<IActionResult> UpdateMovie([FromBody] MovieViewModel movieviewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(400);
            }

            try
            {
                await InsertOrUpdateMovie(movieviewModel);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error : {e.Message}!");
                return BadRequest(500);
            }

            return Ok(movieviewModel);
        }

        private async Task InsertOrUpdateMovie(IMovieViewModel movieviewModel)
        {
            bool movieExists = await CheckIfMovieExistsInDb(movieviewModel.UniqueIdentifier);
            if (movieExists)
            {
                await ModifyMovie(movieviewModel);
            }
            else 
            {
                await InsertMovie(movieviewModel);
            }
        }

        private async Task<bool> CheckIfMovieExistsInDb(string uniqueIdentifier)
        {
            _logger.LogInformation($"Checking if a movie exists: {uniqueIdentifier}.");
            
            bool movieExists = await Task.Run(() =>_moviesRepository.CheckIfMovieExists(uniqueIdentifier));

            return movieExists;
        }

        private async Task ModifyMovie(IMovieViewModel movieviewModel)
        {
            _logger.LogInformation($"Updating a movie: {movieviewModel}.");

            await _moviesRepository.UpdateMovieAsync(movieviewModel);
        }

        private async Task InsertMovie(IMovieViewModel movie)
        {
            _logger.LogInformation($"Adding a new movie: {movie}.");

            await _moviesRepository.AddMovieAsync(movie);
        }

        private async Task<IMovieViewModel> GetMovie(string movieTitle)
        {
            _logger.LogInformation($"Getting movie by title : {movieTitle}.");

            IMovieViewModel movieViewModel = await _moviesRepository.GetMovieByTitleAsync(movieTitle);

            return movieViewModel;
        }

        private async Task<List<IMovieViewModel>> GetAllMoviesList()
        {
            _logger.LogInformation($"Getting all movies.");
            
            List<IMovieViewModel> allMoviesViewModel = await _moviesRepository.GetAllMoviesAsync();

            return allMoviesViewModel;
        }
    }
}
