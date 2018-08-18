using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    //ถูกสร้างขึ้นตอน section 3 lecture 25 บน udemy
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}