using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repository, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(/*[FromBody]*/ UserForRegisterDto userForRegisterDto)
        { //Attribute FormBody ไม่จำเป็นต้องใส่ก็ได้ถ้า Class ของเราใส่ Attr [ApiController] ครอบเอาไว้
            /*
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            } */

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repository.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }

        //Section 3 lecture 32 บน udemy
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repository.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            //claim ไว้ใช้เป็น Sucjevt ของ token discriptor
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            //token key
            //เก็บ key ไว้ที่ app setting แล้วดึงมาใช้นะ (แบบเดียวกับ connectionString อะ)
            //ในความเป็นจริง key จาก app setting ควรใช้ random text ที่มันยาวๆ encrypted ไว่ก็ได้
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            //signing credential
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Token Discriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            //Token handler
            var tokenHadler = new JwtSecurityTokenHandler();

            //JWT token ที่จะส่งกลับไปให้ client
            var token = tokenHadler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHadler.WriteToken(token),
                user
            });
        }
    }
}