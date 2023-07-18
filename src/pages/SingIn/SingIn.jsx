import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Alert } from "@mui/material";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/footer";

import '../Login/login.css';

import logo from '../../assets/logo.png';

const SingIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const singIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, senha);
        } catch (err){
            const errorMessage = err.message;
            console.log(errorMessage);

            if( errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
               // <Alert variant="filled" severity="error">
                //    A senha deve possuir no minimo 6 digitos
               // </Alert>
               alert('Senha no minimo com 6 digitos')
            } else
            if( errorMessage === 'Firebase: Error (auth/missing-password).'){
                alert('Preencha com a senha');
            } else 
            if( errorMessage === 'Firebase: Error (auth/invalid-email).'){
                alert('Email invalido');
            } else
            if( errorMessage === 'Firebase: Error (auth/missing-email).'){
                alert('Preencha com o email');
            }
        }
        
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
             // navigate('/');
            } else {
              // User is signed out
              // ...
            }
        });
    }, []);

    return(
        <div className="body_cadastro">
            <Navbar></Navbar>
            <div className="rest_page">
                <div className="container_login">
                    <div className="container_image_login">
                        <img src={logo} className="logo_login"></img>
                    </div>
                    <div className="container_inputs">
                        <p>Email:</p>
                        <input className="input_login" type="text" placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)}></input>
                        <p>Senha:</p>
                        <input className="input_login" type="password" placeholder="********" onChange={(e) => setSenha(e.target.value)}></input>
                        <button className="button_submit" onClick={singIn}>Cadastrar</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default SingIn;