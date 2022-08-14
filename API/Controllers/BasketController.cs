using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket is null) return NotFound();
            return basket.MapBasketToDtos();
        }       

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)        
        {
            // get the basket
            var basket = await RetrieveBasket(GetBuyerId());

            if(basket == null) basket = createBasket();

            var product = await _context.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails{Title = "Product not found"});

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
  
            if(result) return CreatedAtRoute("GetBasket",basket.MapBasketToDtos());

            return BadRequest(new ProblemDetails{ Title = "Problem adding Items to the basket" });
        }        

        [HttpDelete]
        public async Task<ActionResult> RemoveBasKetItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if(basket is null) return NotFound();            
            
            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{ Title = "Problem removing Items from the basket" });
        }       

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId)) 
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
        private Basket createBasket()
        {
            // set the cookies to the buyerId
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            { 
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }            
            var basket = new Basket()
            {
                BuyerId = buyerId
            };
            _context.Baskets.Add(basket);
            return basket;
        }       
    }
}