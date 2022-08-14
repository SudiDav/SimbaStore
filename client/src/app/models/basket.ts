export interface BasketItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}
