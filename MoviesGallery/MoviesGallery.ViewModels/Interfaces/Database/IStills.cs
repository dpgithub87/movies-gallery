using MoviesGallery.Models.DatabaseModels;

namespace MoviesGallery.Models.Interfaces.Database
{
    public interface IStills
    {
        int Id { get; set; }

        string Still { get; set; }

        int MovieId { get; set; }

        Movies Movie { get; set; }
    }
}
