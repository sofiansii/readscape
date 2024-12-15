import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import SearchIcon from '@mui/icons-material/Search';
import SearchResult from './SearchResult';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Book } from '../Models/Book';
import Cart from './Cart';
import { searchBooks } from '../helper/HeplerBook';

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
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        setSearchIsFocused(false);
    }, [location]);


    function fetchBooks(query: string) {
        searchBooks(query).then(res => {
            setIsLoading(false);
            setSearchResult(res);
        })
    }

    React.useEffect(() => {
        if (searchtext.trim().length === 0) {
            setSearchResult([]);
            return;
        }
        setIsLoading(true);
        const timeOutId = setTimeout(() => fetchBooks(searchtext), 500);
        return () => clearTimeout(timeOutId);
    }, [searchtext]);



    React.useEffect(() => {

        function handleClickOutside(event: any) {
            if (searchRef.current && !(searchRef.current as any).contains(event.target)) {
                setSearchIsFocused(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const handleOnFocus = () => {
        if (!searchIsFocused)
            setSearchIsFocused(true);
    };

    const handleSearchtextChange = (e: any) => {
        setSearchText(e.target.value)
    }




    return (
        <AppBar position="sticky">
            <Toolbar >
                <BookSharpIcon onClick={() => navigate('/')} sx={{ mr: 1,  '&:hover':{cursor:'pointer'} }} />
                <Typography
                    onClick={() => navigate('/')}
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', md: 'block', '&:hover':{cursor:'pointer'} } }}
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
