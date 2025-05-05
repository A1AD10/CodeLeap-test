import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Botao from '../../components/Botao';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../Redux/PostSlice';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '75%',
        sm: 400,
        md: 500
    },
    height: 205,
    bgcolor: '#fff',
    border: 'none',
    px: 4,
    py: 1,
    borderRadius: '16px',
};


function Login() {

    const [userName, setUserName] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateUserName = (userName) => {
        return userName.trim() === '';
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateUserName(userName)) {
            setError(true)
        } else {
            setError(false)
            dispatch(setCurrentUser(userName))
            navigate('/home')
        }
    }

    return (
        <div>
            <Box sx={modalStyle}>
                <Typography
                    sx={{
                        fontSize: { xs: '18px', sm: '20px', md: '22px' },
                        fontWeight: 700,
                        my: 2
                    }} component="h2" my={2}
                >
                    Welcome to CodeLeap network!
                </Typography>
                <Typography fontSize="16px" fontWeight="400">
                    Please enter your username
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column">
                        <TextField
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            error={error}
                            placeholder='John Doe'
                            variant="outlined"
                            sx={{ my: 2 }}
                            InputProps={{
                                autoComplete: "off",
                                sx: {
                                    height: 36,
                                    borderRadius: 2
                                },
                            }} />
                        <Botao>Enter</Botao>
                    </Box>
                </form>
            </Box>
        </div>
    );
}

export default Login