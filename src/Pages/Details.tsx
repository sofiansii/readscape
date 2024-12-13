import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from "../Models/Book";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import axios from 'axios';
import AddToCartButton from "../Components/AddToCartButton";
import BookDisplay from "../Components/Book";
import { searchBooks } from "../helper/HeplerBook";

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    maxHeight: 550,
    border: "1px solid",
    borderColor: theme.palette.divider,
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
        width: '90%',
        objectFit: 'contain',

    },

}));
const AddToCartWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginRight: 4,
    marginBottom: 2,
    border: "1px solid",
    borderRadius: "4px",
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    padding: 0
}));


function DetailsPage() {
    var [book, setBook] = useState<Book | undefined>(undefined);
    var [suggestions, setSuggestions] = useState<Book[] | undefined>(undefined);
    const navigate = useNavigate();
    var params = useParams();

    React.useEffect(() => {
        setBook(undefined)
        setSuggestions(undefined)
        searchBooks(params['id'] as string).then(data => {
            if (data.length > 0) {
                setBook(data[0])
                if (data[0].categories.length > 0)
                    searchBooks(data[0].categories[0])
                        .then(suggestionData => setSuggestions(suggestionData.filter(b => b.id != data[0].id)))
            }

        })
    }, [params])

    if (book !== undefined)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
                <Card elevation={4} sx={{ width: "70%", padding: 4, minHeight: '100vh' }}>
                    {/* main content */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                        height: 'auto',
                        flexWrap: { xs: 'wrap', md: 'nowrap' }
                    }}>
                        <Box sx={{ width: { sm: '100%', md: '45%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                            <Image src={book.image_url} />
                        </Box>
                        <Box sx={{
                            marginLeft: 1, display: 'flex', flexDirection: 'column', width: { sm: '100%', md: '45%' }, padding: 2
                        }} >
                            <Typography sx={{ marginBottom: 1, }} variant="h6"  >
                                {book.title}
                            </Typography>
                            <Box sx={{ marginBottom: 1 }}>
                                {book.categories.map((c) =>
                                    <Chip key={c} label={c} size="small" sx={{ margin: 0.2 }} />
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', marginBottom: 1, color: 'grey' }} >
                                <Typography variant="body2" >{book.author}</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ flexGrow: 1 }} >
                                {book.description}
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'flex-end', marginTop: 1 }}>
                                <AddToCartWrapper>
                                    <Typography sx={{ marginLeft: 1 }} variant="h4">
                                        {book.price.toString().split('.')[0]}
                                    </Typography>
                                    <Typography sx={{ marginRight: 0.5 }} variant="body2">
                                        {book.price.toString().split('.')[1] + '$'}
                                    </Typography>
                                    <AddToCartButton book={book} />
                                </AddToCartWrapper>
                            </Box>

                        </Box>
                    </Box>
                    {/* suggestions */}
                    <Typography sx={{ marginTop: 5, marginBottom: 1 }} variant="h5">You Might Also Like</Typography>
                    {suggestions === undefined ?
                        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                            <CircularProgress></CircularProgress>
                        </Container> : // else 
                        <Box sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent:"space-around",
                            width: "100%",
                            overflowX: "hidden",
                            paddingInline: 1,
                            flexWrap: { sm: "wrap", md: "nowrap" }

                        }}>
                            {suggestions.slice(0,4).map(book =>
                                <CardActionArea 
                                onClick={()=> navigate('/book/' + book.id)}
                                key={book.id} sx={{ width: { sm: "70%", md: "25%" } , marginBlock: 1 }}>
                                    <Card elevation={0} sx={{padding:1}} >
                                        <CardMedia
                                            component="img"
                                            src={book.image_url}
                                            title={book.title}
                                        />
                                        <CardContent sx={{ paddingInline: 0.5 }} >
                                            <Box sx={{ marginBottom: 0.5 }}>
                                                {book.categories.map((c) =>
                                                    <Chip key={c} label={c} size="small" sx={{ margin: 0.2 }} />
                                                )}
                                            </Box>
                                            <Typography sx={{ marginBottom: 1 }} variant="body2" fontSize={12}>
                                                {book.title.substring(0, book.title.length > 90 ? 90 : book.title.length - 1) + '...'}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                </CardActionArea>
                            )}
                        </Box>
                    }
                </Card >
            </Box >
        );
    else return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress></CircularProgress>
        </Container>
    );
}

export default DetailsPage;