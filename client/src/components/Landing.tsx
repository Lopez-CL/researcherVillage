import React from "react";
import * as Icons from  '../icons';
import Button from "./Button";
import { Link } from "react-router-dom";

const Landing: React.FC = () =>{
    return(
        <>
            <div className="landscape-flex-2 landing-page">
                <section className="stack">
                    <h1>A place for researchers to connect, grow, and learn.</h1>
                    
                        <Link className="button" to='/register'>Join the community</Link>
                        <Link to='/login' className="button button--transparent">I already have an account</Link>
                    
                </section>
                <Icons.LandingFlower/>
            </div>
        </>
    )
}

export default Landing;