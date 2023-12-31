import React from "react";
import { useState, useEffect,useContext } from "react";
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../pages/Auth/loginContext";
import './login.css'

import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/Footer/footer';

import SingIn from "../SingIn/SingIn";

//assets
import logo from '../../assets/logo.png';

const Login = ({cadastrar}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signIn, toggleSignIn } = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            const uid = user.uid;
            navigate('/');
            } else {
            // User is signed out
            // ...
            }
        });
    }, []);

    const logar = () => {
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('deu certo');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);

            if( errorMessage === 'Firebase: Error (auth/invalid-email).'){
                alert('Email invalido');
            } else 
            if( errorMessage === 'Firebase: Error (auth/missing-password).'){
                alert('Senha invalida');
            } else 
            if( errorMessage === 'Firebase: Error (auth/wrong-password).'){
                alert('Senha incorreta');
            } else 
            if( errorMessage === 'Firebase: Error (auth/user-not-found).'){
                alert('Usuario não cadastrado');
            }
        });

    }

    const cadastro = () => {
        toggleSignIn()
    }


    return(
        <div className="body_login">
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
                        <button className="button_submit" onClick={logar}>Enviar</button>
                        <div className="cadastro" onClick={cadastro}>
                           <p>Cadastre-se</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login