import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LongArticle from './pages/LongArticle';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRout from './components/AuthRout';
import IsAuthor from './components/IsAuthor';
import CreateArticle from './pages/AuthorPage/CreateArticle';
import ListArticle from './pages/AuthorPage/ListArticle';
import NotFound from './components/NotFound';



function App() {

  const Logout = () => {
    localStorage.clear();
    return <Navigate to='/login'/>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/article/:id" element={
        <AuthRout>
            <LongArticle />
        </AuthRout>} />
        <Route path="/author/create-article" element={
        <IsAuthor>
            <CreateArticle />
        </IsAuthor>} />
        <Route path="/author/list-articles" element={
        <IsAuthor>
            <ListArticle />
        </IsAuthor>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
