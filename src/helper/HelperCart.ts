import axios from "axios";
import { Book } from "../Models/Book";

export async function submitOrder(cart: Book[]): Promise<boolean> {
    try {
        var res = await axios.post("http://127.0.0.1:8000/api/order", {
            userId: localStorage.getItem('userId'),
            orderlines: cart.map(b => ({
                book_id: b.id,
                price: b.price,
                quantity: b.quantity
            }))
        })
        if (res.status === 201)
            return true
        return false;
    } catch (e) {
        console.log(e)
        return false;
    }
}