import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Book } from '../Models/Book';
import { useNavigate } from 'react-router-dom';
import BookDisplay from "./Book";


const Container = styled(Card)(({ theme }) => ({
    position: 'absolute',
    marginTop: 20,
    color: 'red',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '70%',
    maxHeight: '70vh',
    overflowY: 'scroll',
    [theme.breakpoints.down('md')]: {
        marginInline: 0,
        width: '90%',
    },
}));

const BookResult = styled('div')(({ theme }) => ({
    position: 'absolute',
    color: 'red',
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column'
}));
const CategoryContainer = styled('div')(({ theme }) => ({
    borderRadius: '20%',
    backgroundColor: 'lightgrey'
}));


interface Props {
    books: Array<Book>;
}
function SearchResult(props: Props) {
    const navigate = useNavigate();

    

    function handleBookClick(id: number) {
        navigate('/book/' + id)
    }


    return (
        <Container elevation={2}>
            {props.books.map((book) =>
                <Card key={book.id} elevation={0} sx={{ width: { sm: '100%', md: '47%' }, margin: 1 }}
                >
                    <BookDisplay displayDiscription handleBookClick={handleBookClick} book={book}  />
                </Card>
            )}
        </Container>
    );
}

export default SearchResult;