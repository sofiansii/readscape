import {create} from 'zustand'
import { Book } from '../Models/Book';

export const useCartStore = create<{cart:Book[],setCart:Function,addToCart:Function}>( (set) => ({
    cart: Array<Book>(),
    setCart: (cart : Book[] ) => set((oldCart) => {
        // persist session between 
        return ({cart:cart})
    }),
    addToCart: (book:Book) => set((oldCart) => {
        const cart = oldCart.cart;

        var existingBook = cart.find(b => b.id === book?.id);
        if (existingBook === undefined){
            book.quantity = 1;
            cart.push(book)
        }
        else existingBook.quantity += 1;
        console.log(cart)
        return {cart} ;
    } )
}));