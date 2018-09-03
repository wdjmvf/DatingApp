namespace DatingApp.API.Helpers
{
    // Section 11 Lecture 103 การ plug กับ Cloudinary.com
    // เอา class ที่สร้างนี้ไป register ที่ Startup.cs ด้วย
    public class CloudinarySettings
    {
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}