import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import NavBar from './views/NavBar';
import focusOnMain from './Hooks/FocusOnMain';
import Landing from './components/Landing';
import Login from './components/Login';
import OnBoarding from './views/Onboarding';
import React from 'react';
const App: React.FC = () => {
  return (
    <>
      <button onClick={focusOnMain} id='skip-to-main'>Skip to main</button>
      <NavBar/>
      <main id='main-content' tabIndex={-1}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<OnBoarding/>}/>
          </Routes>
        </BrowserRouter>
      </main>
      
    </>
  )
}

export default App;
