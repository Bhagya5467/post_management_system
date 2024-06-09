import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import AddPostForm from './features/posts/AddPosts/AddPostForm';
import EditPostPage from './features/posts/EditPosts/EditPostPage';

const App: FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPostForm />} />
        <Route path="/edit-post/:postId" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
