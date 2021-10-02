using MoviesGallery.Models.Interfaces.Database;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesGallery.Models.DatabaseModels
{
    public class Movies : IMovies
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

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
        public List<SoundEffects> SoundEffects { get; set; }

        [Required]
        public List<Stills> Stills { get; set; }
    }
}
