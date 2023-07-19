import React from "react";
import { useState,useContext,useEffect } from "react";
import { LoginProvider,LoginContext } from './loginContext';

import Login from "../../components/Login/Login";
import SingIn from "../../components/SingIn/SingIn";

const Auth = () => {

    const { signIn, toggleSignIn } = useContext(LoginContext);
    useEffect(() => (
        console.log(signIn)
    ), [signIn]);

    const [cadastrar, setCadastrar] = useState(false);
    
    return (
        signIn ? <SingIn cadastrar={setCadastrar}></SingIn> : <Login cadastrar={setCadastrar}></Login>
    );
}

const _Auth = () => {
    return(
        <LoginProvider>
            <Auth></Auth>
        </LoginProvider>
    );
}

export default _Auth;