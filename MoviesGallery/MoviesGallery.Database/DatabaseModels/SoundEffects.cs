using MoviesGallery.Database.DatabaseModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesGallery.Database.DatabaseModels
{
    public class SoundEffects
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string SoundEffect { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public Movie Movie { get; set; }
    }
}
