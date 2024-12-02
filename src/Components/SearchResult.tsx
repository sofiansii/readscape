import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Book } from '../Models/Book';
import { useNavigate } from 'react-router-dom';


interface Props {
    books: Array<Book>;
}
function SearchResult(props: Props) {
    const navigate = useNavigate();

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

    function handleBookClick(id: number) {
        console.log("clicked");
        navigate('/book/' + id)
    }




    return (
        <Container elevation={2}>
            {props.books.map((book) =>
                <Card key={book.id} elevation={0} sx={{ width: { sm: '100%', md: '47%' }, margin: 1 }}
                >
                    <CardActionArea onClick={() => handleBookClick(book.id)} sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                        <CardMedia
                            sx={{ height: 150, minWidth: 120, marginLeft: 0.5 }}
                            image={book.image_url}
                            title="green iguana"
                        />
                        <CardContent sx={{ paddingInline: 2, paddingBlock: 1, display: 'flex', flexDirection: 'column' }} >
                            <Typography sx={{ marginBottom: 1 }} component="h6" fontSize={15}>
                                {book.title}
                            </Typography>
                            <Typography sx={{ marginBottom: 1, fontSize: 10, flexGrow: 1 }} component="p" variant="caption">
                                {book.description.substring(0, book.description.length > 120 ? 120 : book.description.length - 1) + '...'}
                            </Typography>
                            <Box>
                                {book.categories.map((c) =>
                                    <Chip key={c} label={c} size="small" sx={{ margin: 0.2 }} />
                                )}
                            </Box>


                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </Container>
    );
}

export default SearchResult;