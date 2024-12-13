import axios from "axios";
import { Book } from "../Models/Book";

export async function searchBooks(query: string): Promise<Book[]> {
    var books = Array<Book>();
    try {
        const response = await axios.get("http://localhost:8080/search", { params: { query } })
        const data = response.data;
        for (const index in data) {
            let jsonLine = JSON.parse(data[index]);
            books.push({
                id: jsonLine['isbn'],
                title: jsonLine['title'],
                categories: (jsonLine['category'] as string).split('\u0026'),
                price: jsonLine['price'],
                author: jsonLine['author'],
                description: "description",
                image_url: "http://localhost:8080/images/" + jsonLine['image_name'],
                quantity: 1
            });
        }
        return books;
    } catch (e) {
        console.log(e)
        return books;
    }

}