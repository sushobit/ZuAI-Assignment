import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm';
import Loading from './components/Loading';
import './App.css';
import About from './components/About';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; // Increase progress by 10%
      setPercentage(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 200); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loading percentage={percentage} />;
  }

    return (
      <div className='App'>
        <Router>
            <CssBaseline />
            <Sidebar />
            <Container>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/new-post" element={<NewPostForm />} />
                    <Route path="/edit-post/:id" element={<EditPostForm />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Container>
            <Footer />
        </Router>
        </div>
    );
}

export default App;
