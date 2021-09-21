import React, {useEffect, useState} from "react";
import './styles/app.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context/useContext";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuth(true)
        }
        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>

            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
