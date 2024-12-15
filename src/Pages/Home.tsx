import { Box,  Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Book } from "../Models/Book";
import { searchBooks } from "../helper/HeplerBook";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        searchBooks("parenting").then(res => setFeaturedBooks(res.splice(0, 6)))
    }, [])


    return (
        <Box>

            <Box
                sx={{
                    backgroundColor: '#f4f4f4',
                    padding: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#333' }}>Welcome to the Book Store</Typography>
                <Typography variant="h5" sx={{ color: '#555', marginBottom: 2 }}>Your one-stop shop for the best books</Typography>
            </Box>

            {featuredBooks === undefined ?
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                    <CircularProgress />
                </Container> :
                <Box sx={{ padding: 4, backgroundColor: '#fafafa' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>Featured Books</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 4,
                        textAlign: 'center',
                    }}>
                        {featuredBooks.map((book) => (
                                <CardActionArea key={book.id} sx={{ maxWidth: 345 }} onClick={() => navigate("book/" + book.id)}>
                                    <Card >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={book.image_url}
                                            alt={book.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{book.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>

                        ))}
                    </Box>
                </Box>
            }
        </Box >
    );
}

export default HomePage;