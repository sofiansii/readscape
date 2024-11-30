import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import SearchResult from './SearchResult';
import { CircularProgress } from '@mui/material';


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

    const handleOnFocus = () => {
        if (!searchIsFocused)
            setSearchIsFocused(true);
    };

    const handleBlur = () => {

        // if (searchIsFocused)
        //     setSearchIsFocused(false);
    };

    const searchRef = React.useRef(null);
    const searchResultRef = React.useRef(null);

    React.useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event:any) {
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


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                    <SearchWrapper  ref={searchRef}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
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
                            <SearchResult />
                        </SearchResultContainer>
                    </SearchWrapper>
                    <ShoppingCartSharpIcon sx={{ ml: 1 }} />
                </Toolbar>
            </AppBar>
        </Box>
    );

}
