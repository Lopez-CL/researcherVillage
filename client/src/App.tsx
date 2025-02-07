import './App.css'
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import NavBar from './views/NavBar';
import Landing from './components/Landing';
import Login from './components/Login';
const App: React.FC = () => {
  return (
    <>
      <NavBar/>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </main>
      
    </>
  )
}

export default App;
