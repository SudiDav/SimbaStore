import {LoadingButton} from "@mui/lab";
import {
  CardMedia,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";
import {Link} from "react-router-dom";
import {Product} from "../../app/models/product";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {currencyFormat} from "../../app/util/util";
import {addBasketItemAsync} from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({product}: Props) {
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{maxWidth: 345}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: "secondary.main"}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {fontWeight: "bold", color: "primary.main"},
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.main",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' color='secondary'>
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.type} / {product.brand}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
          size='small'
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size='small'>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
