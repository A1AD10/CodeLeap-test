import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Botao from '../../components/Botao';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../Redux/PostSlice';
import Post from '../../components/Post';

const style = {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    flexDirection: 'column',
    bgcolor: '#fff',
    width: {
        xs: '90%',     
        sm: 675,       
        md: 800        
    },
    paddingBottom: 4,
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #777777',
    borderRadius: '16px',
    padding: '18px',
    gap: 3,
    marginTop: 3
  }

  const inputStyle = {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#999999',
      borderRadius: '8px'
    },
    '& .MuiOutlinedInput-root': {
      height: '32px'
    }
  }

  const textAreaStyle = {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#777777',
      borderRadius: '8px'
    }
  }
  

function Home() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.post.currentUser)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(title.trim() === '' || content.trim() === '') {
            setError(true)
        } else {
            setError(false)

            const newPost = {
                username: currentUser,
                title,
                content
            }

            fetch('https://dev.codeleap.co.uk/careers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addPost(data))
                setTitle('')
                setContent('')
            })
        }
    }

  return (
    <Box sx={style}>
            <Box bgcolor={'#7695EC'} color='#ffffff' width={'100%'} height={90} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                <Typography variant='h5'fontWeight={700} marginLeft={5}>CodeLeap Network</Typography>
            </Box>
            <Box sx={{ width: { xs: '85%', sm: '635px', md: '744px' }}}>
                <form onSubmit={handleSubmit}>
                    <Box sx={formStyle}>
                        <Typography variant='h5'fontWeight={700}>What’s on your mind?</Typography>
                        <Box>
                            <Typography fontWeight={400}>Title</Typography>
                            <TextField
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Hello World'
                                error={error}
                                sx={inputStyle}
                                inputProps={{ autoComplete: "off"}}
                            />
                        </Box>
                        <Box>
                            <Typography fontWeight={400}>Content</Typography>
                            <TextField
                                multiline
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder='Content here'
                                error={error}
                                sx={textAreaStyle}
                            />
                        </Box>
                        <Botao type="submit" sx={{ my: 1.5 }}>Create</Botao>
                    </Box>
                </form>
            </Box>
        <Post />
    </Box>
  )
}

export default Home;
