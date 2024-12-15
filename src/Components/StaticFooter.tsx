import { Box, Typography } from "@mui/material";

function StaticFooter() {
    return (  <Box sx={{
        backgroundColor: '#333',
        color: 'white',
        padding: 2,
        textAlign: 'center'
      }}>
        <Typography variant="body2">&copy; 2024 Readscape | All Rights Reserved</Typography>
      </Box> );
}

export default StaticFooter;