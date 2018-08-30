namespace DatingApp.API.DTOs
{
    // Section 10 Lecture 98 สร้าง class เพื่อทำการส่ง user จาก frontned มา update ที่ backend
    // สร้าง Class นี้แล้วต้องไป Mapping Auto mapper ที่ Mapping profile ด้วย
    public class UserForUpdateDto
    {
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}