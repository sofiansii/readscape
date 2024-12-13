import { Alert, Button, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useCartStore } from "../Store/CartStore";
import { Book } from "../Models/Book";
import React from "react";

interface Props {
  book: Book
}
function AddToCartButton(props: Props) {
  var { cart, addToCart } = useCartStore();
  const [open, setOpen] = React.useState(false);


  const handleAddToCart = () => {
    addToCart(props.book)
    setOpen(true)
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleAddToCart} sx={{ scale: 1.03 }} variant="contained" disableElevation >Add To Card</Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Added to Cart"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Added to cart successfully
        </Alert>
      </Snackbar>
    </>)
}

export default AddToCartButton;