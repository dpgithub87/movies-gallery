using MoviesGallery.Models.DatabaseModels;

namespace MoviesGallery.Models.Interfaces.Database
{
    public interface ISoundEffects
    {
        int Id { get; set; }

        string SoundEffect { get; set; }

        int MovieId { get; set; }

        Movies Movie { get; set; }
    }
}
