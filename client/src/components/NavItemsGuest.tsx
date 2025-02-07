import React from "react";
import * as Icons from '../icons';

const NavItemsListGuest: React.FC = () =>{
    return(
        <>
            <div className="nav-bar__logo-header">
                {<Icons.RVLogoGreen/>}
                <p>Researcher Village</p>
            </div>
            <a href='/'>About</a>
        </>
        
        
    )
}

export default NavItemsListGuest;