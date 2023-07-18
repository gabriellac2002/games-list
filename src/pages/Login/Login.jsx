import React from "react";
import { useState, useEffect } from "react";
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import './login.css'

import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/Footer/footer'

//assets
import logo from '../../assets/logo.png';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

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
            const errorCode = error.code;
            const errorMessage = error.message;
        });

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
                        <div className="cadastro">
                            <Link to='/cadastro'><p>Cadastre-se</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login