import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';


const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    width: '1em',
    height: '1em',
    overflow: 'hidden',
    marginInline: 2,
    fontSize:'1.1em',

    padding: 0

}))


interface Props {
    value: number;
    onValueChange?: (newValue: number) => void;
}

function Quantity(props: Props) {
    const [value, setValue] = React.useState<number>(props.value);
    function increment() {
        const newValue = value + 1;
        console.log(newValue)
        setValue(newValue)
        props.onValueChange?.(newValue)
    }

    function decrement() {
        const newValue = value > 1 ? value - 1 : value;
        setValue(newValue)
        props.onValueChange?.(newValue)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBlock:1 }}>

            <Typography>x{value}</Typography>
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <StyledButton onClick={increment} >+</StyledButton>
                <StyledButton onClick={decrement} >-</StyledButton>
            </Box>
        </Box>
    );
}

export default Quantity;