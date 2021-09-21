import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/useContext";
import MyButton from "../UI/BUTTON/MyButton";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}> Выйди от сюда </MyButton>
            <div className="navbar__links">
                <Link to="/about">Блабла</Link>
                <Link to="/posts">Основа</Link>
            </div>
        </div>
    );
};

export default Navbar;