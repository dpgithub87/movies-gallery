using Microsoft.EntityFrameworkCore;

namespace MoviesGallery.Database
{
    public class DataSeeder
    {
        public static void SeedData(MoviesDbContext context)
        {
            context.Database.Migrate();
        }
    }
}
