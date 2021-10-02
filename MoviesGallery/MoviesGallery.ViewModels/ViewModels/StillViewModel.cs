using MoviesGallery.Models.Interfaces.ViewModels;

namespace MoviesGallery.Models.ViewModels
{
    public class StillViewModel : IStillViewModel
    {
        public string Still { get; set; }

        public int MovieId { get; set; }

        public MovieViewModel Movie { get; set; }
    }
}
