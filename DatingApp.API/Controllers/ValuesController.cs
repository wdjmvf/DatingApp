using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize] //เพิ่ม attr นี้ section 3 lecture 34 บน udemy
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase //อ้างอิงจาก section 3 lecture 29 บน udemy Controller เฉยๆ จะค่าตัวแปล fuction ต่างๆ ที่ support เกี่ยวกับ View ให้เล่น แต่ตอนนี้ app เราใช้ angular เป็น view แยกโดยชัดเจน ไม่ได้ใช้ View ของ .net เอง ฉะนั้นใช้ ControllerBase แทนได้เลยเพราะไม่มีข้อมูลเกี่ยวกับ View support ให้ใช้
    {
        private readonly DataContext context;
        public ValuesController(DataContext context)
        {
            this.context = context;

        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await this.context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await this.context.Values.FirstOrDefaultAsync(v => v.Id == id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
