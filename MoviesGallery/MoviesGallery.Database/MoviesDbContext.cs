using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MoviesGallery.Models.DatabaseModels;

namespace MoviesGallery.Database
{
    public class MoviesDbContext : DbContext, IDesignTimeDbContextFactory<MoviesDbContext>
    {
        public MoviesDbContext()
        { }

        public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
            : base(options)
        { }

        public MoviesDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MoviesDbContext>();
            optionsBuilder.UseSqlServer("Server=(local);Database=movies-gallery;Trusted_Connection=True;");
            return new MoviesDbContext(optionsBuilder.Options);
        }


        public virtual DbSet<Movies> Movies { get; set; }

        public virtual DbSet<SoundEffects> SoundEffects { get; set; }

        public virtual DbSet<Stills> Stills { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { }
    }
}
