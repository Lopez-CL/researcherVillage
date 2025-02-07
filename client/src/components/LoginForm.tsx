import React, {useState} from 'react';
import Button from './Button';
import useStringInput from '../Hooks/InputChange';
import { Link } from 'react-router-dom';
interface LoginData {
    emailOrUsername: string,
    password: string
}
const LoginForm: React.FC = () =>{
    const [userData, setUserData] = useState<LoginData>({
        emailOrUsername: "",
        password: ""
    });
    const handleInput = useStringInput(userData, setUserData);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        alert(`userData: ${JSON.stringify(userData)}`);
        const resetData = Object.keys(userData).reduce((acc,key)=>{
            acc[key] = ''
            return acc;
        }, {} as typeof userData)
        setUserData(resetData);
    }
    return(
        <>
            <form className='login-page__login-form stack'>
                <div>
                    <input
                    className='input' 
                    onChange={handleInput} 
                    value={userData.emailOrUsername}
                    aria-label='Email or Username' 
                    placeholder='Email or Username' 
                    name = "emailOrUsername" 
                    id='emailOrUsername' 
                    type="text" />
                    <input
                    className='input' 
                    onChange={handleInput} 
                    value={userData.password}
                    aria-label='Password' 
                    placeholder='Password' 
                    name = "password" 
                    id='password' 
                    type='password' />
                </div>
                <Button label = 'Login' eventFunc = {handleSubmit}></Button>
                <Link to='/'>Forgot your password?</Link>
            </form>
        </>
    )
}

export default LoginForm;
