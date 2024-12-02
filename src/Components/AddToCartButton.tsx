import { Button } from "@mui/material";
import { useCartStore } from "../Store/CartStore";

function AddToCartButton() {
  var {cart, setCart} = useCartStore();


    const handleAddToCart = () => {
        cart = [...cart,1]
        setCart(cart)
    };

    return <Button onClick={handleAddToCart} sx={{ scale: 1.01 }} variant="contained">Add To Card</Button>
}

export default AddToCartButton;