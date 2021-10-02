using MoviesGallery.Models.DatabaseModels;
using System.Collections.Generic;

namespace MoviesGallery.Models.Interfaces.Database
{
    public interface IMovies
    {
        int Id { get; set; }

        string Title { get; set; }

        string ImdbID { get; set; }

        string ListingType { get; set; }

        string ImdbRating { get; set; }

        string Language { get; set; }

        string Location { get; set; }

        string Plot { get; set; }

        string Poster { get; set; }

        string UniqueIdentifier { get; set; }

        List<SoundEffects> SoundEffects { get; set; }

        List<Stills> Stills { get; set; }
    }
}
