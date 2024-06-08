import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from './types';
import { log } from 'console';

const initialState: Post[] = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.push(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;

      const existingPost = state.find((post) => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state = state.filter((post) => post.id !== action.payload);
      return state;
    },
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts;

export const selectPostById = (state: RootState, postId: string) => {
  const post = state.posts.find((post) => post.id === postId);

  if (!post) {
    throw new Error(`Id ${postId} is not valid!`);
  }

  return post;
};

export default postsSlice.reducer;
