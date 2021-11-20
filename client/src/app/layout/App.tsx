import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "./Catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:6001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addProducts = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100.0,
        description: "description" + (prevState.length + 1),
        pictureUrl: "pictureUrl" + (prevState.length + 1),
        type: "type" + (prevState.length + 1),
        brand: "brand" + (prevState.length + 1),
        quantityInStock: prevState.length + 1,
      },
    ]);
  };

  return (
    <div>
      <Typography variant="h1">SimbaStore</Typography>
      <Catalog products={products} addProducts={addProducts} />
    </div>
  );
}

export default App;
