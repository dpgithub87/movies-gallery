using MoviesGallery.Models.ViewModels;
using System.Collections.Generic;

namespace MoviesGallery.Models.Interfaces.ViewModels
{
    public interface IMovieViewModel
    {
        string Title { get; set; }

        string ImdbID { get; set; }

        string ListingType { get; set; }

        string ImdbRating { get; set; }

        string Language { get; set; }

        string Location { get; set; }

        string Plot { get; set; }

        string Poster { get; set; }

        string UniqueIdentifier { get; set; }

        List<SoundEffectViewModel> SoundEffects { get; set; }

        List<StillViewModel> Stills { get; set; }
    }
}
