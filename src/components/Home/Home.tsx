import React from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../features/posts/postsSlice';
import PostsList from '../../features/posts/PostsList';
import { RootState } from '../../app/store';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <PostsList />
    </div>
  );
};

export default Home;
