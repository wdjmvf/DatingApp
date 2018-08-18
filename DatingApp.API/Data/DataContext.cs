using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        //เมื่อสร้าง model class และ dbset แล้วก็ run command "dotnet ef migrations add xxxxxx" เพื่อสร้าง class ในการ create table ใน DB
        //เมื่อ migrations เสร็จก็ใช้คำสั่ง "dotnet ef database update" เพื่อ run code ของ class ใน migrations ทีนี้ก็จะได้ tabl ใน DB แล้ว
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; } //เพิ่ม DbSet แล้วจะต้องไปบอกให้ service ใช้งาน DbContext ด้วย ที่ class Startup
        public DbSet<User> Users { get; set; }
    }
}