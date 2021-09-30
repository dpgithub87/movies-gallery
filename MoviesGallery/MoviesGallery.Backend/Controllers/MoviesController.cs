using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MoviesGallery.Backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoviesGallery.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class MoviesController : Controller
    {
        private readonly ILogger<MoviesController> _logger;

        public MoviesController(ILogger<MoviesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Movies")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetAllMovies()
        {
            List<Movie> allMovies = new List<Movie>();

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

        [HttpGet("Movie")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetMovie(string movieTitle)
        {
            Movie movie = new Movie();

            try
            {
                movie = await GetMovieByTitle(movieTitle);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error : {e.Message}!");
                return BadRequest(500);
            }

            return Ok(movie);
        }

        [HttpPost("Movie")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> AddMovie([FromBody] Movie movie)
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

        [HttpPut("Movie")]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> UpdateMovie([FromBody] Movie movie)
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

        private async Task InsertOrUpdateMovie(Movie movie)
        {
            bool movieExists = await CheckIfMovieExistsInDb(movie);
            if (movieExists)
            {
                await InsertAMovie(movie);
            }
            else 
            {
                await UpdateAMovie(movie);
            }
        }

        private async Task<bool> CheckIfMovieExistsInDb(Movie movie)
        {
            _logger.LogInformation($"Checking if a movie exists: {movie}.");
            throw new NotImplementedException();
        }

        private async Task UpdateAMovie(Movie movie)
        {
            _logger.LogInformation($"Updating a movie: {movie}.");
            throw new NotImplementedException();
        }

        private async Task InsertAMovie(Movie movie)
        {
            _logger.LogInformation($"Adding a movie: {movie}.");
            throw new NotImplementedException();
        }

        private async Task<Movie> GetMovieByTitle(string movieTitle)
        {
            _logger.LogInformation($"Getting movie by title : {movieTitle}.");
            throw new NotImplementedException();
        }

        private async Task<List<Movie>> GetAllMoviesList()
        {
            _logger.LogInformation($"Get all movies.");
            throw new NotImplementedException();
        }
    }
}
