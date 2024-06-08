import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { updatePost, selectPostById } from '../postsSlice';
import './EditPostPage.css';

const EditPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const post = useSelector((state: RootState) =>
    selectPostById(state, postId!)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  const onTitleChanged = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const editPost = () => {
    if (title && content) {
      dispatch(updatePost({ id: postId as string, title, content }));
      navigate('/');
    }
  };

  return (
    <div className="edit-post-page">
      <section>
        <h2>Edit Post</h2>
        <form>
          <label htmlFor="postTitle">Post Title</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={editPost}>
            Update Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditPostPage;
