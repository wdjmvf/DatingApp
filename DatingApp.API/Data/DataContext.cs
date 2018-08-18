using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; } //เพิ่ม DbSet แล้วจะต้องไปบอกให้ service ใช้งาน DbContext ด้วย ที่ class Startup
    }
}