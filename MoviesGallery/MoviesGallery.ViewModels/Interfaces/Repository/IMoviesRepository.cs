using MoviesGallery.Models.Interfaces.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoviesGallery.Models.Interfaces.Repository
{
    public interface IMoviesRepository
    {
        bool CheckIfMovieExists(string uniqueIdentifier);

        Task AddMovieAsync(IMovieViewModel movieViewModel);

        Task UpdateMovieAsync(IMovieViewModel movieViewModel);

        Task DeleteMovieAsync(IMovieViewModel movieViewModel);

        Task<IMovieViewModel> GetMovieByTitleAsync(string movieTitle);

        Task<List<IMovieViewModel>> GetAllMoviesAsync();
    }
}
