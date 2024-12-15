import { Alert, Box, Button, CircularProgress, Container, Fade, IconButton, Paper, Popper, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import CartPng from '../static/images/Cart.png'
import { useCartStore } from "../Store/CartStore";
import BookDisplay from "./Book";
import styled from "styled-components";
import React from "react";
import { submitOrder } from "../helper/HelperCart";


const OrderButton = styled(Button)(({ theme }) => ({
    color: "green",
    borderColor: "Green"
}))

function CardActionArea() {
    const { cart, setCart } = useCartStore();
    const [cartVisible, setCartVisible] = React.useState(false);
    const [loaderVisible, setLoaderVisible] = React.useState(false);
    const [notification, setNotification] = React.useState<string | undefined>(undefined);
    const buttonRef = React.useRef(null);
    const CartContentRef = React.useRef(null);

    React.useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (CartContentRef.current && !(CartContentRef.current as any).contains(event.target) &&
                !(buttonRef.current as any).contains(event.target)) {
                console.log("useeffect : " + cartVisible)
                setCartVisible(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [CartContentRef, cartVisible]);

    function handleCartButtonClick() {
        if (cart.length > 0)
            setCartVisible((cartVisible) => !cartVisible)
    }

    function handleOrderNowButtonClick() {
        if (cart.length > 0) {
            setLoaderVisible(true)
            submitOrder(cart).then(res => {
                if (res) {
                    setCart([]);
                    setNotification("success")
                }
                else
                    setNotification("error")
                setLoaderVisible(false);

            })
        }
    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification(undefined);
    };

    if (cartVisible === true && cart.length === 0)
        setCartVisible(false)

    return (
        <Box>
            <IconButton onClick={handleCartButtonClick} ref={buttonRef} sx={{ marginLeft: 1, color: 'white', height: '100%', '&:hover': { backgroundColor: '#a64db5' } }}>

                <img alt="cart" src={CartPng} style={{ height: '30px' }} />
                <Typography variant='body2' sx={{
                    padding: 0.2,
                    position: 'absolute', left: -2, top: -2, backgroundColor: 'purple',
                    borderRadius: '50%', color: 'white', width: 25, height: 20
                }} >{cart.length}</Typography>

            </IconButton>
            <Popper
                sx={{ zIndex: 1200, width: { sm: "70%", md: "50%", lg: "30%" } }}
                open={cartVisible && cart.length > 0}
                anchorEl={buttonRef.current}
                placement={"bottom-start"}
                transition={cart.length > 0 && cartVisible ? true : false}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>

                        <Paper ref={CartContentRef} sx={{ padding: 1 }}>
                            {loaderVisible ?
                                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                    <CircularProgress />
                                </Container> :
                                <Box>
                                    <Box sx={{ width: "100%", maxHeight: "70vh", overflowY: "scroll" }}>
                                        {cart.map(book =>
                                            <Box key={book.id} sx={{ marginBottom: 1 }}>
                                                <BookDisplay displayDelete displayPrice displayQuantity book={book} />
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', marginBlock: 1, width: "100%", alignItems: 'center', justifyContent: "flex-end" }}>
                                        <Box sx={{ display: 'flex', alignItems: "center", border: "1px solid green", borderRadius: '5px' }}>
                                            <Typography color="green" fontWeight="bold" textAlign="end" letterSpacing={2} variant="body1"
                                                sx={{ flexGrow: 1, marginInline: 1 }}  >
                                                {cart.reduce((sum, b) => sum + b.quantity * b.price, 0).toFixed(2) + "€"}
                                            </Typography>
                                            <OrderButton onClick={handleOrderNowButtonClick} variant="outlined" sx={{ scale: 1.01 }} >Order Now</OrderButton>

                                        </Box>
                                    </Box>
                                </Box>
                            }
                        </Paper>
                    </Fade>
                )}
            </Popper>
            {/* notifications should belong to the page */}
            <Snackbar
                open={notification !== undefined}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Added to Cart"
            >
                <Alert
                    onClose={handleClose}
                    severity={
                        notification === "success" ? "success" : "error"
                    }
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification === "success" ? "Order placed successfully" :
                        "Error while placing order"}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CardActionArea;