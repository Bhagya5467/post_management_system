import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from './postsSlice';
import { Post } from './types';
import './PostsList.css';
import { RootState } from '../../app/store';

const PostsList = () => {
  const postsStore = useSelector((state: RootState) => state.posts);
  const [posts, setPosts] = useState(postsStore);

  useEffect(() => {
    setPosts(postsStore);
  }, [postsStore]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (postId: string) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = (postId: string) => {
    console.log(`Deleting post with id: ${postId}`);
    dispatch(deletePost(postId));
  };

  if (!posts.length) {
    return (
      <div className="empty-message">
        <h2>No posts found</h2>
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="post-buttons">
            <button onClick={() => handleEdit(post.id)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
