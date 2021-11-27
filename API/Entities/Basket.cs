using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new ();
        public void Add(Product product, int quantity)
         {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { ProductId = product.Id, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);    
            if(existingItem is not null) existingItem.Quantity += quantity;
        }  

        public void Remove(Product product, int quantity)
        {
           var item = Items.FirstOrDefault(item => item.ProductId == product.Id);
           if(item is null) return;
           item.Quantity -= quantity;
           if(item.Quantity == 0) Items.Remove(item);
        }
    }
}