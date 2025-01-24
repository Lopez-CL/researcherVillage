import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import * as Icons from './icons';
import Button from './components/Button';
const App: React.FC = () => {
  const alertMe = () =>{
    alert("I've been clicked!");
  }
  return (
    <>
      <h1>Researcher Village Coming Soon </h1>
      <Button label="Click Me!" isDefaultGreen ={false} eventFunc={alertMe}/>
      <BrowserRouter>
        <Routes>
          <Route path='/' /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
