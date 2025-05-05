import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "../formatTimeAgo";
import { setPost } from "../../Redux/PostSlice";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Delete from "../Modal/Delete";
import Edit from "../Modal/Edit";

function Post() {

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #777777',
        borderRadius: '16px',
        padding: '18px',
        gap: 3,
        marginTop: 3,
        width: {
            xs: '75%',
            sm: '600px',
            md: '710px',
        },
    }

    const headerStyle = {
        bgcolor: '#7695EC',
        margin: '-19px',
        padding: '19px',
        color: '#ffffff',
        fontWeight: 700,
        borderRadius: '16px 16px 0 0',
        display: "flex",
        justifyContent: 'space-between',
        width: '100%',
    }
    
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post.post)
    const currentUser = useSelector((state) => state.post.currentUser)
    const [openId, setOpenId] = useState(null)
    const [modalType, setModalType] = useState(null)

    const handleOpenModal = (id, type) => {
        setOpenId(id);
        setModalType(type)
    };

    const handleCloseModal = () => {
        setOpenId(null);
        setModalType(null)
    }

    useEffect(() => {
        fetch('https://dev.codeleap.co.uk/careers/')
        .then(res => res.json())
        .then(data => dispatch(setPost(data.results)))
    }, [dispatch])

        
    return (
        <>
            {posts.map((item) => (
                <Box key={item.id} sx={cardStyle}>
                    <Box sx={headerStyle} >
                        <Typography variant="h5" fontWeight={700}>{item.title}</Typography>
                        <Box 
                            sx={{ display: item.username === currentUser ? 'flex' : 'none' }}                            
                            gap={3}>
                            <Button onClick={() => handleOpenModal(item.id, 'delete')} sx={{ minWidth: 0, padding: 0, color:'#ffffff', margin: 0 }}>
                                <DeleteForeverIcon sx={{ fontSize: '32px' }}/>
                            </Button>
                            <Button onClick={() => handleOpenModal(item.id, 'edit')} sx={{ minWidth: 0, padding: 0, color:'#ffffff', margin: 0 }}>
                                <EditDocumentIcon sx={{ fontSize: '32px' }}/>
                            </Button>
                            
                        </Box>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'}  marginTop={'10px'}>
                        <Typography sx={{ color: '#777777', fontWeight: 700 }}>@{item.username}</Typography>
                        <Typography sx={{ color: '#777777', fontWeight: 400 }}>{formatTimeAgo(item.created_datetime)}</Typography>
                    </Box>
                    <Typography>{item.content}</Typography>
                </Box>
            ))}

            {modalType === 'delete' && openId !== null && (
                <Delete modal={openId !== null} close={handleCloseModal} id={openId} />
            )}

            {modalType === 'edit' && openId !== null && (
                <Edit modalEdit={openId} closeEdit={handleCloseModal} />
            )}
        </>
    )
}

export default Post