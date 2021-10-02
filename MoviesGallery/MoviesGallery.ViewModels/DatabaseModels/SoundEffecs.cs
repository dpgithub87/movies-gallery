using MoviesGallery.Models.Interfaces.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesGallery.Models.DatabaseModels
{
    public class SoundEffects : ISoundEffects
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string SoundEffect { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public Movies Movie { get; set; }
    }
}
