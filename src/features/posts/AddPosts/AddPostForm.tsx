import { FC, FormEvent, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addPost } from '../postsSlice';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';
import './AddPostForm.css';

const AddPostForm: FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );

  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title) newErrors.title = 'Title is required';
    if (!content) newErrors.content = 'Content is required';

    return newErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newPost: Post = { title, content, id: nanoid() };

      dispatch(addPost(newPost));

      setTitle('');
      setContent('');
      setErrors({});

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div className="add-post-page">
      <div className="form-container">
        <h2>Add New Post</h2>
        <form className="add-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={errors.content ? 'error' : ''}
            ></textarea>
            {errors.content && (
              <div className="error-message">{errors.content}</div>
            )}
          </div>
          <button type="submit">Add Post</button>
        </form>
        {showPopup && (
          <div className="popup-message">
            <p>Post added successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPostForm;
