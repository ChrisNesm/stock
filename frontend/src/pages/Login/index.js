import React, { Component } from "react";
import './Login.css'

import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme, Link } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import authProvider from '../../providers/authProvider'
import { Redirect } from 'react-router-dom'

import theme from '../../constants/theme'
import { Typography , Button} from "@material-ui/core";

const FormButton = props => (
    <div id="button" class="row">
      <button onClick={props.submit} >  {props.title}</button>
    </div>
);
  
const FormInput = props => (
<div class="row">
    <label>{props.description}</label>
    <input {...props} />
</div>  
);
  
export default (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const login = useLogin();
    const notify = useNotify();
    
    const submit = e => {
        e.preventDefault();
        login({ username, password }).catch(() =>
            notify('Informations incorrectes !')
        );
    };


    return(
        <ThemeProvider theme={theme}>
            <form id="loginform">
                <h2 id="headerTitle">Connexion</h2>
                <div>
                    <FormInput onChange={e => setUsername(e.target.value)} name="username" description="Numéro de téléphone ou email *" placeholder="Votre numéro de téléphone" type="text" />
                    <FormInput onChange={e => setPassword(e.target.value)} name="password" description="Mot de passe *" placeholder="Votre mot de passe" type="password"/>
                    <FormButton title="Valider" submit={ e => submit(e) } />
                    <Link to="/signin">
                        {/* <Typography variant="caption"> S'inscrire </Typography> */}
                        <Button >  S'inscrire</Button>
                    </Link>
                </div>
              <Notification />
          </form>
        </ThemeProvider>
    )
}
