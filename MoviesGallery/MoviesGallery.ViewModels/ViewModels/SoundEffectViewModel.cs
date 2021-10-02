using MoviesGallery.Models.Interfaces.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace MoviesGallery.Models.ViewModels
{
    public class SoundEffectViewModel : ISoundEffectViewModel
    {
        [Required]
        public string SoundEffect { get; set; }

        [Required]
        public int MovieId { get; set; }

        public MovieViewModel Movie { get; set; }
    }
}
