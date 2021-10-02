using Microsoft.EntityFrameworkCore;
using MoviesGallery.Database;
using MoviesGallery.Models.DatabaseModels;
using MoviesGallery.Models.Interfaces.Database;
using MoviesGallery.Models.Interfaces.Repository;
using MoviesGallery.Models.Interfaces.ViewModels;
using MoviesGallery.Models.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesGallery.Repository
{
    public class MoviesRepository : IMoviesRepository
    {
        private readonly MoviesDbContext _context;
        
        public MoviesRepository(MoviesDbContext context)
        {
            _context = context;
        }

        public bool CheckIfMovieExists(string uniqueIdentifier)
        {
            bool movieExists = _context.Movies.Any(m => m.UniqueIdentifier == uniqueIdentifier);

            return movieExists;
        }

        public async Task AddMovieAsync(IMovieViewModel movieViewModel)
        {
            IMovies movie = new Movies()
            {
                ImdbID = movieViewModel.ImdbID,
                ImdbRating = movieViewModel.ImdbRating,
                Language = movieViewModel.Language,
                ListingType = movieViewModel.ListingType,
                Location = movieViewModel.Location,
                Plot = movieViewModel.Plot,
                Poster = movieViewModel.Poster,
                Title = movieViewModel.Title,
                UniqueIdentifier = movieViewModel.UniqueIdentifier
            };

            await _context.AddAsync(movie);
            await _context.SaveChangesAsync();

            int movieId = movie.Id; // AFTER THE INSERT, EF CORE SHOULD POPULATE THE 'ID' FOR US.

            // Add all ISoundEffects
            foreach (ISoundEffectViewModel soundEffectViewModel in movieViewModel.SoundEffects)
            {
                ISoundEffects soundEffect = new SoundEffects()
                {
                    MovieId = movieId,
                    SoundEffect = soundEffectViewModel.SoundEffect
                };

                await _context.SoundEffects.AddAsync((SoundEffects)soundEffect);
            }
            await _context.SaveChangesAsync();


            // Add Stills
            foreach (IStillViewModel stillViewModel in movieViewModel.Stills)
            {
                IStills still = new Stills()
                {
                    MovieId = movieId,
                    Still = stillViewModel.Still
                };

                await _context.Stills.AddAsync((Stills)still);
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateMovieAsync(IMovieViewModel movieViewModel)
        {
            Movies movie = await GetMovieIdByUniqueIdentifierAsync(movieViewModel.UniqueIdentifier);

            movie.ImdbID = movieViewModel.ImdbID;
            movie.ImdbRating = movieViewModel.ImdbRating;
            movie.Language = movieViewModel.Language;
            movie.ListingType = movieViewModel.ListingType;
            movie.Location = movieViewModel.Location;
            movie.Plot = movieViewModel.Plot;
            movie.Poster = movieViewModel.Poster;
            movie.Title = movieViewModel.Title;
            
            _context.Movies.Update(movie);
            await _context.SaveChangesAsync();

            //Update SoundEffects
            for (int i = 0; i < movieViewModel.SoundEffects.Count; i++)
            {
                ISoundEffectViewModel soundEffectViewModel = movieViewModel.SoundEffects[i];
                SoundEffects soundEffect = movie.SoundEffects[i];
                soundEffect.SoundEffect = soundEffectViewModel.SoundEffect;

                _context.SoundEffects.Update(soundEffect);
            }

            await _context.SaveChangesAsync();

            //Update Stills
            for (int i = 0; i < movieViewModel.Stills.Count; i++)
            {
                IStillViewModel stillsEffectViewModel = movieViewModel.Stills[i];
                Stills still = movie.Stills[i];
                still.Still = stillsEffectViewModel.Still;

                _context.Stills.Update(still);
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteMovieAsync(IMovieViewModel movieViewModel)
        {
            IMovies movie = new Movies()
            {
                ImdbID = movieViewModel.ImdbID,
                ImdbRating = movieViewModel.ImdbRating,
                Language = movieViewModel.Language,
                ListingType = movieViewModel.ListingType,
                Location = movieViewModel.Location,
                Plot = movieViewModel.Plot,
                Poster = movieViewModel.Poster,
                Title = movieViewModel.Title,
                UniqueIdentifier = movieViewModel.UniqueIdentifier
            };
            
            _context.Remove(movie);
            await _context.SaveChangesAsync();
        }

        public async Task<IMovieViewModel> GetMovieByTitleAsync(string movieTitle)
        {
            IMovies movie = await _context.Movies
                .Include(m => m.SoundEffects)
                .Include(m => m.Stills)
                .FirstOrDefaultAsync(m => m.Title == movieTitle);

            if (movie == null) 
            {
                return null;
            }

            //Add all the sound effects for that movie to a soundeffectViewModel
            List<SoundEffectViewModel> soundEffectViewModelList = new List<SoundEffectViewModel>();

            foreach (ISoundEffects soundEffect in movie.SoundEffects)
            {
                SoundEffectViewModel soundEffectViewModel = new SoundEffectViewModel()
                {
                    MovieId = soundEffect.MovieId,
                    SoundEffect = soundEffect.SoundEffect
                };

                soundEffectViewModelList.Add(soundEffectViewModel);
            }

            //Add all the stills for that movie to a IStillViewModel
            List<StillViewModel> stillViewModelList = new List<StillViewModel>();

            foreach (IStills still in movie.Stills)
            {
                StillViewModel stillViewModel = new StillViewModel()
                {
                    MovieId = still.MovieId,
                    Still = still.Still
                };

                stillViewModelList.Add(stillViewModel);
            }

            IMovieViewModel movieViewModel = new MovieViewModel()
            {
                ImdbID = movie.ImdbID,
                ImdbRating = movie.ImdbRating,
                Language = movie.Language,
                ListingType = movie.ListingType,
                Location = movie.Location,
                Plot = movie.Plot,
                Poster = movie.Poster,
                Title = movie.Title,
                UniqueIdentifier = movie.UniqueIdentifier,
                SoundEffects = soundEffectViewModelList,
                Stills = stillViewModelList
            };

            return movieViewModel;
        }

        public async Task<Movies> GetMovieIdByUniqueIdentifierAsync(string uniqueIdentifier)
        {
            Movies movie = await _context.Movies
                .Include(m => m.SoundEffects)
                .Include(m => m.Stills)
                .FirstOrDefaultAsync(m => m.UniqueIdentifier == uniqueIdentifier);

            return movie;
        }

        public async Task<List<IMovieViewModel>> GetAllMoviesAsync() 
        {
            List<IMovieViewModel> movieViewModelList = new List<IMovieViewModel>();

            List<Movies> movies = await _context.Movies.Include(m => m.SoundEffects).Include(m => m.Stills).ToListAsync();

            foreach (IMovies movie in movies)
            {
                List<SoundEffectViewModel> soundEffectViewModelList = new List<SoundEffectViewModel>();

                foreach (ISoundEffects soundEffect in movie.SoundEffects)
                {
                    SoundEffectViewModel soundEffectViewModel = new SoundEffectViewModel()
                    {
                        MovieId = soundEffect.MovieId,
                        SoundEffect = soundEffect.SoundEffect
                    };

                    soundEffectViewModelList.Add(soundEffectViewModel);
                }

                List<StillViewModel> stillViewModelList = new List<StillViewModel>();
                foreach (IStills still in movie.Stills)
                {
                    StillViewModel stillViewModel = new StillViewModel()
                    {
                        MovieId = still.MovieId,
                        Still = still.Still
                    };

                    stillViewModelList.Add(stillViewModel);
                }

                IMovieViewModel movieViewModel = new MovieViewModel()
                {
                    ImdbID = movie.ImdbID,
                    ImdbRating = movie.ImdbRating,
                    Language = movie.Language,
                    ListingType = movie.ListingType,
                    Location = movie.Location,
                    Plot = movie.Plot,
                    Poster = movie.Poster,
                    Title = movie.Title,
                    UniqueIdentifier = movie.UniqueIdentifier,
                    SoundEffects = soundEffectViewModelList,
                    Stills = stillViewModelList,
                };

                movieViewModelList.Add(movieViewModel);
            }

            return movieViewModelList;
        }
    }
}
