using System;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    //code นี้ถูกสร้างขึ้นใน section 3 lecture 23 บน udemy
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; } //เมื่อ user key password ในการ login เข้ามา จะนำมา check กับค่า Hash นี้
        public byte[] PasswordSalt { get; set; } //เปรียบเสมือน key ใช้ร่วมกับ hash เพื่อให้ค่ามัน ramdom ไปเรื่อยในแต่ละครั้ง
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}