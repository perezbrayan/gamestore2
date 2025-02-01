import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import FortniteShop from './components/FortniteShop';
import Bot from './components/Bot';
import Crew from './components/Crew';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fortnite-shop" element={<FortniteShop />} />
            <Route path="/bot" element={<Bot />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;