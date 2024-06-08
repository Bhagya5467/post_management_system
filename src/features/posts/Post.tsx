import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from './postsSlice';
import { Post as PostType } from './types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeletePostClicked = () => {
    dispatch(deletePost(post.id));
  };

  const onEditPostClicked = () => {
    navigate('/edit-post/${post.id}');
  };

  return (
    <article className='post'>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
          <div className='post-buttons'>
            <button type="button" onClick={onEditPostClicked}>Edit</button>
            <button type="button" onClick={onDeletePostClicked}>Delete</button>
          </div>
    </article>
  );
};

export default Post;
