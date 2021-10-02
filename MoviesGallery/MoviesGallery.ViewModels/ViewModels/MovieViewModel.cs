using MoviesGallery.Models.Interfaces.ViewModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MoviesGallery.Models.ViewModels
{
    public class MovieViewModel : IMovieViewModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string ImdbID { get; set; }

        [Required]
        public string ListingType { get; set; }

        [Required]
        public string ImdbRating { get; set; }

        [Required]
        public string Language { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Plot { get; set; }

        [Required]
        public string Poster { get; set; }

        [Required]
        public string UniqueIdentifier { get; set; }

        [Required]
        public List<SoundEffectViewModel> SoundEffects { get; set; }

        [Required]
        public List<StillViewModel> Stills { get; set; }
    }
}
