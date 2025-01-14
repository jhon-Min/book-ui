import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Book from './pages/Book';
import BookDetail from './pages/BookDetail';
import About from './pages/About';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga" element={<Book />} />
        <Route path="/about" element={<About />} />
        <Route path="/manga/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
}

export default App;
