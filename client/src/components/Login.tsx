import React from "react";
import LoginForm from "./LoginForm";
import * as Icons from '../icons';
import { Link } from "react-router-dom";

const Login: React.FC = ()=>{
    return(
        <>
            <div className="landscape-flex-2 login-page">
                <section>
                    <h1>Welcome back to the Community!</h1>
                        {<LoginForm />}
                    <p className="community-invite">New here? {<Link to='/'>Create an account!</Link>}</p>
                </section>
                {<Icons.LoginFlower/>}
            </div>
        
        </>
    )
}

export default Login;