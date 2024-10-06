import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className='login-registration'>
      <header>

      </header>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={login}/> */}
          </Routes>
        </BrowserRouter>
      <footer>

      </footer>
    </div>
  );
}

export default App;
