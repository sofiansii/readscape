import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import { Book } from "../Models/Book";
import { styled } from '@mui/material/styles';

var Image = styled('img')(({ theme }) => ({
    maxWidth: '45%',
    height: 'auto',
    objectFit: 'contain',
    padding: 1,
    [theme.breakpoints.down('md')]: {
        maxWidth: '90%',
    },

}));



function DetailsPage() {
    var params = useParams();

    var book: Book = {
        id: 69,
        title: 'An Introduction to Parallel Programming',
        author: 'Peter Pacheco',
        image_url: 'http://localhost:8080/images/0123742609.jpg',
        categories: ['Computers', 'Technology'],
        price: 3.59,
        description: "The Lord of the Rings is an epic[1] high fantasy novel[a] by the English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling books ever written, with over 150 million copies sold"
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
            <Card elevation={4} sx={{ width: "70%", padding: 4 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: { xs:'wrap' , md: 'nowrap'}
                }}>
                    <Image src={book.image_url} />
                    <Box sx={{ marginTop: 4, marginLeft: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }} >
                        <Typography sx={{ marginBottom: 1 }} variant="h4"  >
                            {book.title}
                        </Typography>
                        <Typography variant="body1"  >
                            {book.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'flex-end', flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', marginRight: 4, marginBottom: 2 }}  >
                                <Typography variant="h4">
                                    {book.price.toString().split('.')[0]}
                                </Typography>
                                <Typography variant="body2">
                                    {book.price.toString().split('.')[1] + '$'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained">Add To Card</Button>
                </Box>
            </Card>
        </Box>
    );
}

export default DetailsPage;