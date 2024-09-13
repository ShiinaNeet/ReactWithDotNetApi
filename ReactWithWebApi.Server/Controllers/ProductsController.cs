using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ReactWithWebApi.Server.Data;
using ReactWithWebApi.Server.Models;

namespace ReactWithWebApi.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DBContext _context;

        public ProductsController(DBContext context)
        {
            _context = context;
        }
        public string RequestJsonBuilder(object result)
        {
            return JsonConvert.SerializeObject(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            var result = new
            {
                status = "Success",
                data = products
            };
            return Ok(RequestJsonBuilder(result));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(Guid id)
        {
            var products = await _context.Products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(Guid id, Products products)
        {
            if (id != products.Id)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var result = new
            {
                message = "The Product was successfully updated",
                status = "Success"
            };
            
            return Ok(RequestJsonBuilder(result));

        }
        
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts(Products products)
        {
            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.Id } , new { status = "Success" , data = products});
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducts(Guid id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();
            var result = new
            {
                status = "Success",
                message = "Product was successfully deleted"
            };
            return Ok(RequestJsonBuilder(result));
        }

        private bool ProductsExists(Guid id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
