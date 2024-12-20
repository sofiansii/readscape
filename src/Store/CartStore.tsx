import {create} from 'zustand'
import { Book } from '../Models/Book';
import { v4 as uuidv4 } from 'uuid'

export const useCartStore = create<{cart:Book[],setCart:Function,addToCart:Function}>( (set) => ({
    cart: loadPersistedData(),
    setCart: (cart : Book[] ) => set((oldCart) => {
        persistToStorage(cart)
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
        persistToStorage(cart)
        return {cart} ;
    } )
}));

function persistToStorage(cart:Book[]){
    localStorage.setItem("cart",JSON.stringify(cart))
    // set user id
    if(localStorage.getItem("userId") === null)
        localStorage.setItem("userId", uuidv4())
}
function loadPersistedData() : Book[] {
    const dataString = localStorage.getItem("cart");
    if (dataString == null )
        return Array<Book>();
    return JSON.parse(dataString )?? Array<Book>();
}