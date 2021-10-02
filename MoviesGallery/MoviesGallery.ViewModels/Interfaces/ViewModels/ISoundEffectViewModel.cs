using MoviesGallery.Models.ViewModels;

namespace MoviesGallery.Models.Interfaces.ViewModels
{
    public interface ISoundEffectViewModel
    {
        string SoundEffect { get; set; }

        int MovieId { get; set; }

        MovieViewModel Movie { get; set; }
    }
}
