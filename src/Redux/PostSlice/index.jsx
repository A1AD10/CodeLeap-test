import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        currentUser: ''
    },
    reducers: {
        setPost: (state, action) => {
            state.post = action.payload
        },
        addPost: (state, action) => {
            state.post.unshift(action.payload)
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        newPost: (state, action) => {
            const index = state.post.findIndex(post => post.id === action.payload.id)
            if(index !== -1) {
                state.post[index] = action.payload
                console.log("Post atualizado:", state.post[index]);  
            } else {
                console.error("Post não encontrado para atualização:", action.payload.id);
            
            }
        }
    }
})

export const { setPost, addPost, setCurrentUser, newPost } = postSlice.actions

export default postSlice.reducer