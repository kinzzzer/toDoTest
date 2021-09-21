import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/BUTTON/MyButton";
import {AuthContext} from "../context/useContext";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Page для Логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder='Login'/>
                <MyInput type="password" placeholder='Pass'/>
                <MyButton>Войти</MyButton>

            </form>
        </div>
    );
};

export default Login;