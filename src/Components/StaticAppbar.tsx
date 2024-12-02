import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import SearchResult from './SearchResult';
import { CircularProgress, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Book } from '../Models/Book';
import axios from 'axios';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { purple } from '@mui/material/colors';
import Cart from './Cart';

const SearchWrapper = styled('div')(({ theme }) => ({
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: 'column',
}));

const SearchResultContainer = styled('div')(({ theme }) => ({
    maxWidth: '100%'
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginInline: 0,
        width: '50%',
    },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const CircularProgressWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingInline: `calc(1em + ${theme.spacing(4)})`,

        transition: theme.transitions.create('width'),
    },
}));




export default function SearchAppBar() {
    const [searchIsFocused, setSearchIsFocused] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchtext, setSearchText] = React.useState("");
    const [searchResul, setSearchResult] = React.useState<Array<Book>>([]);
    const searchRef = React.useRef(null);
    const searchResultRef = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        setSearchIsFocused(false);
    }, [location]);


    function fetchBooks(query: string) {
        console.log('fetcging')
        axios.get("http://localhost:8080/search?query=" + query)
            .then(res => {
                const data = res.data;
                setIsLoading(false);
                if (data.length > 0) {
                    var books = Array<Book>();
                    console.log(data);
                    for (const index in data) {
                        let jsonLine = JSON.parse(data[index]);
                        console.log(jsonLine['category']);
                        books.push({
                            id: jsonLine['isbn'],
                            title: jsonLine['title'],
                            categories: (jsonLine['category'] as string).split('\u0026'),
                            price: jsonLine['price'],
                            author: jsonLine['author'],
                            description: "description",
                            image_url: "http://localhost:8080/images/" + jsonLine['image_name']
                        });
                    }
                    setSearchResult(books);
                } else
                    setSearchResult([]);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error)
            });
    }
    React.useEffect(() => {
        if (searchtext.trim().length == 0) {
            setSearchResult([]);
            return;
        }
        setIsLoading(true);
        const timeOutId = setTimeout(() => fetchBooks(searchtext), 500);
        return () => clearTimeout(timeOutId);
    }, [searchtext]);



    React.useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (searchRef.current && !(searchRef.current as any).contains(event.target)) {
                setSearchIsFocused(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const handleOnFocus = () => {
        if (!searchIsFocused)
            setSearchIsFocused(true);
    };

    const handleBlur = () => {

        // if (searchIsFocused)
        //     setSearchIsFocused(false);
    };
    const handleSearchtextChange = (e: any) => {
        setSearchText(e.target.value)
    }




    return (
        <AppBar position="sticky">
            <Toolbar >
                <BookSharpIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', md: 'block' } }}
                >
                    READSCAPE
                </Typography>
                <SearchWrapper ref={searchRef}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={handleSearchtextChange}
                            value={searchtext}
                            sx={{ width: '100%' }}
                            onFocus={handleOnFocus}
                            onBlur={handleBlur}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <CircularProgressWrapper>
                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        </CircularProgressWrapper>
                    </Search>
                    <SearchResultContainer sx={{ display: searchIsFocused ? 'flex' : 'none', justifyContent: 'center', width: '100%' }}>
                        <SearchResult books={searchResul} />
                    </SearchResultContainer>
                </SearchWrapper>
                <Cart/>
            </Toolbar>
        </AppBar>
    );

}
