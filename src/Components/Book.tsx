import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Input, styled, SxProps, Theme, Typography } from "@mui/material";
import { Book } from "../Models/Book";
import Quantity from './Quantity';
import { useEffect, useState } from "react";
import { useCartStore } from "../Store/CartStore";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from "@mui/material/colors";



interface Props {
    book: Book;
    handleBookClick?: Function;
    displayQuantity?: boolean;
    displayDiscription?: boolean;
    displayPrice?: boolean;
    displayDelete?: boolean
}

function BookDisplay(props: Props) {
    var { cart, setCart } = useCartStore();

    function privateHandleButtonClick() {
        if (props.handleBookClick != undefined)
            props.handleBookClick(props.book.id)
    }

    const Container = (_props: any) => props.handleBookClick === undefined ?
        <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start' }}>{_props.children}</Box> :
        <CardActionArea onClick={privateHandleButtonClick} sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start' }}>{_props.children}</CardActionArea>;

    function handleQuantityChange(newQuantity: number) {
        const newCart = [...cart];
        var bookIndex = cart.findIndex((b => b.id == props.book.id));
        cart[bookIndex].quantity = newQuantity;
        setCart(newCart)
    }

    function handleDeleteButton() {
        const newCart = [...cart];
        var bookIndex = cart.findIndex((b => b.id == props.book.id));
        newCart.splice(bookIndex, 1)
        setCart(newCart)
    }

    return <Container>
        <CardMedia
            sx={{ height: 150, minWidth: 120, marginLeft: 0.5 }}
            image={props.book.image_url}
            title={props.book.title}
        />
        <CardContent sx={{ paddingInline: 2, paddingBlock: 1, display: 'flex', flexDirection: 'column' }} >
            <Typography sx={{ marginBottom: 1 }} component="h6" fontSize={15}>
                {props.book.title}
            </Typography>
            {props.displayPrice ? <Typography variant="body2" letterSpacing={1}>{+props.book.price.toFixed(2) + "€"}</Typography> : null}
            {props.displayDiscription ?
                <Typography sx={{ marginBottom: 1, fontSize: 10, flexGrow: 1 }} component="p" variant="caption">
                    {props.book.description.substring(0, props.book.description.length > 120 ? 120 : props.book.description.length - 1) + '...'}
                </Typography>
                : null}

            {props.displayQuantity ? <Quantity onValueChange={handleQuantityChange} value={props.book.quantity} /> : null}
            <Box>
                {props.book.categories.map((c) =>
                    <Chip key={c} label={c} size="small" sx={{ margin: 0.2 }} />
                )}
            </Box>
        </CardContent>
        {props.displayQuantity ?
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleDeleteButton} sx={{ height: '2em' }} >
                    <DeleteForeverIcon sx={{ color: red[400] }} />
                </IconButton>
            </Box> : undefined}
    </Container>;
}

export default BookDisplay;