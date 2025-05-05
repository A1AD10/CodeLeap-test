import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Botao from "../../Botao";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../../../Redux/PostSlice";

function Edit({ modalEdit, closeEdit }) {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const posts = useSelector((state) => state.post.post)

    useEffect(() => {
        if (modalEdit) {
            const postToEdit = posts.find(post => post.id === modalEdit)

            if (postToEdit) {
                setTitle(postToEdit.title)
                setContent(postToEdit.content)
            } else {
                console.error("Post não encontrado para o id:", modalEdit);
            }
        }
    }, [modalEdit, posts])

    const handleSave = (e) => {
        e.preventDefault()

        const originalPost = posts.find(post => post.id === modalEdit)

        const updatedPost = {
            id: modalEdit,
            title: title,
            content: content,
            username: originalPost.username
        }

        console.log("Atualizando post:", updatedPost)
        dispatch(newPost(updatedPost))
        closeEdit()
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#ffffff',
        padding: '20px',
        borderRadius: '16px',
        width: {
            xs: '75%',
            sm: 600,
        },
    }

    const fieldStyle = {
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#999999',
            borderRadius: '8px',
        },
        '& .MuiOutlinedInput-root': {
            height: '32px',
        },
    }

    const multilineFieldStyle = {
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#777777',
            borderRadius: '8px',
        },
    }

    return (
        <Box>
            <Modal
                open={modalEdit}
                onClose={closeEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box display={'flex'} justifyContent={'initial'} marginBottom={4.5}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" fontWeight={700}>
                            Edit item
                        </Typography>
                    </Box>

                    <form onSubmit={handleSave}>
                        <Box display='flex' flexDirection='column' width='100%' gap={3} >
                            <Box>
                                <Typography fontWeight={400}>Title</Typography>
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Hello World'
                                    error={''}
                                    sx={fieldStyle}
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
                                    error={''}
                                    sx={multilineFieldStyle}
                                />
                            </Box>
                        </Box>
                    </form>

                    <Box display={'flex'} justifyContent={'end'} gap={2} marginTop={2.5}>
                        <Botao onClick={closeEdit} style={{ background: '#ffffff', color: '#000000', border: '1px solid black' }}>Cancel</Botao>
                        <Botao onClick={handleSave} style={{ background: '#47B960' }}>Save</Botao>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default Edit