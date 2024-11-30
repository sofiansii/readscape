import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Book } from '../Models/Book';
import { useNavigate } from 'react-router-dom';

function SearchResult() {
    const navigate = useNavigate();

    const Container = styled(Card)(({ theme }) => ({
        position: 'absolute',
        marginTop: 20,
        color: 'red',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '70%',
        maxHeight:'70vh',
        overflowY:'scroll',
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

    function handleBookClick(){
        console.log("clicked");
        navigate('/book/' +book.id)
    }


    var book: Book = {
        id: 69,
        title: 'An Introduction to Parallel Programming',
        author: 'Peter Pacheco',
        image_url: 'http://localhost:8080/images/0123742609.jpg',
        categories: ['Computers', 'Technology'],
        price: 3.59,
        description: "The Lord of the Rings is an epic[1] high fantasy novel[a] by the English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling books ever written, with over 150 million copies sold"
    };
    var a = [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99,111,222,333,444,555,666]

    return (
        <Container elevation={2}>
            {a.map((n) =>
                <Card key={n} elevation={0} sx={{  width: { sm:'100%', md: '47%'}, margin: 1 }}
                >
                    <CardActionArea onClick={handleBookClick} sx={{display: 'flex', alignItems: 'center',}}>
                        <CardMedia
                            sx={{ height: 150, minWidth: 120, marginLeft: 0.5 }}

                            image={book.image_url}
                            title="green iguana"
                        />
                        <CardContent >
                            <Typography sx={{ marginBottom: 1 }} component="h6" fontSize={15}>
                                {book.title}
                            </Typography>
                            <Typography sx={{ marginBottom: 1, fontSize: 10 }} component="p" variant="caption">
                                {book.description.substring(0, book.description.length > 120 ? 120 : book.description.length - 1) + '...'}
                            </Typography>
                            {book.categories.map((c) =>
                                <Chip key={c} label={c} size="small" sx={{margin:0.2}} />
                            )}


                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </Container>
    );
}

export default SearchResult;