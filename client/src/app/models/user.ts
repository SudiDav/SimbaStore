import {Basket} from "./basket";

export interface User {
  name: string;
  email: string;
  token: string;
  basket?: Basket;
}
