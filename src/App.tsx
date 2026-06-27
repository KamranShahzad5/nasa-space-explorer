import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import './App.css';

// App is the root component
// Sets up: Router, FavoritesProvider, Layout, Routes, Toast notifications

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '0.88rem',
            },
          }}
        />

        <div className="app">
          <Navbar />
          <main className="app__main">
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/search"    element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>

      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
