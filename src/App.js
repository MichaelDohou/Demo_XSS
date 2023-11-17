import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import Link
import TopicsList from './TopicsList';
import CreateTopic from './CreateTopic';
import TopicDetail from './TopicDetail';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Forum</h1>
          </Link>
        </header>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<TopicsList />} />
            <Route path="/create-topic" element={<CreateTopic />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;