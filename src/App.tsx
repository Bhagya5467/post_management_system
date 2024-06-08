import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import AddPostForm from './features/posts/AddPosts/AddPostForm';
import EditPostPage from './features/posts/EditPosts/EditPostPage';

interface Post {
  id: string;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, { ...newPost, id: String(posts.length + 1) }]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add-post"
          element={<AddPostForm onAddPost={handleAddPost} />}
        />
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
