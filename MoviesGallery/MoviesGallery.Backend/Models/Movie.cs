using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MoviesGallery.Backend.Models
{
    public class Movie
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
        public List<string> SoundEffects { get; set; }

        [Required]
        public List<string> Stills { get; set; }
    }
}
