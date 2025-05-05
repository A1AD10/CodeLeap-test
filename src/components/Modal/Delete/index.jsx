import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Botao from '../../Botao';
import { useDispatch } from 'react-redux';
import { setPost } from '../../../Redux/PostSlice';


function Delete({ modal, close, id }) {

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff',
    width: { xs: '75%', sm: 600 },
    padding: '20px',
    borderRadius: '16px',
  }

  const titleStyle = {
    fontSize: { xs: '15px', sm: '20px' },
    fontWeight: 700,
  }

  const dispatch = useDispatch()


  const handleDelete = () => {
    fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
      method: 'DELETE'
    })
      .then(() => {
        return fetch('https://dev.codeleap.co.uk/careers/')
      })
      .then(res => res.json())
      .then(data => {
        dispatch(setPost(data.results));
        close()
      })
      .catch(() => {
        close();
      });
  };


  return (
    <Modal open={modal} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <Box display={'flex'} justifyContent={'initial'} marginBottom={4.5}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={titleStyle}>
            Are you sure you want to delete this item?
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'end'} gap={2}>
          <Botao onClick={close} style={{ background: '#ffffff', color: '#000000', border: '1px solid black' }}>Cancel</Botao>
          <Botao onClick={handleDelete} style={{ background: '#FF5151' }}>Delete</Botao>
        </Box>
      </Box>
    </Modal>
  );
}

export default Delete