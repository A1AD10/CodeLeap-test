import { Box, Button } from "@mui/material";
import React from "react";

function Botao({ children, sx, onClick, ...props }) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            ...sx
        }}>
            <Button type='submit' variant="contained" onClick={onClick} {...props}
                sx={{
                    textTransform: 'none',
                    width: '111px',
                    fontSize: 16,
                    fontWeight: 700,
                    height: 34,
                    px: 7,
                    borderRadius: 2,
                    color: '#fff'
                }}>
                {children}
            </Button>
        </Box>
    )
}

export default Botao