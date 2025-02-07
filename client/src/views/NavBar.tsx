import React,{useState} from "react";
import NavItemsListGuest from "../components/NavItemsGuest";
const NavBar: React.FC = () =>{
    const [isAuth, setIsAuth] = useState<boolean>(false);
    return(
        <>
        <nav className={`nav-bar ${isAuth?'authenticated':'guest'}`} >
            {isAuth?(<h1>You're Logged In</h1>):
            (<NavItemsListGuest/>)}
        </nav>
        </>
    )
}

export default NavBar;