using MoviesGallery.Models.ViewModels;

namespace MoviesGallery.Models.Interfaces.ViewModels
{
    public interface IStillViewModel
    {
        string Still { get; set; }

        int MovieId { get; set; }

        MovieViewModel Movie { get; set; }
    }
}
