import { IconButton, Typography } from "@mui/material";
import CartPng from '../static/images/Cart.png'
import { useCartStore } from "../Store/CartStore";


function CardActionArea() {
    var { cart, setCart } = useCartStore();

    return (
        <IconButton sx={{ marginLeft: 1, color: 'white', height: '100%', '&:hover': { backgroundColor: '#a64db5' } }}>

            <img src={CartPng} style={{ height: '30px' }} />
            <Typography variant='body2' sx={{
                position: 'absolute', left: -2, top: -2, backgroundColor: 'white',
                borderRadius: '50%', color: 'purple', width: 20, height: 20
            }} >{cart.length}</Typography>
        </IconButton>);
}

export default CardActionArea;