import React, { Component } from "react";
import './SignIn.css'

import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme, useRedirect, useDataProvider, Link } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core'
import authProvider from '../../providers/authProvider'
import { Redirect } from 'react-router-dom'

import theme from '../../constants/theme'

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
    const [full_name, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const dataProvider = useDataProvider()
    const redirect = useRedirect()

    const login = useLogin();
    const notify = useNotify();
    
    const submit = e => {
        e.preventDefault();
        dataProvider.signIn({ email: username, password: password, full_name: full_name })
        .then(()=> redirect('/login'))
        .catch(() =>
            notify("Cette adresse mail/numéro de téléphone n'est pas disponible !")
        );
    };


    return(
        <ThemeProvider theme={theme}>
            <form id="loginform">
                <h2 id="headerTitle">Inscription</h2>
                <div>
                    <FormInput onChange={e => setFullName(e.target.value)} name="full_name" description="Nom et prénoms" placeholder="Votre nom complet" type="text"   />
                    <FormInput onChange={e => setUsername(e.target.value)} name="username" description="Numéro de téléphone ou email *" placeholder="" type="text"  required/>
                    <FormInput onChange={e => setPassword(e.target.value)} name="password" description="Mot de passe *" placeholder="Votre mot de passe" type="password" required />
                    <FormButton title="S'inscrire" submit={ e => submit(e) } />
                    <Link to="/login" id="sign">
                        {/* <Typography align="center" variant="body"> Se connecter </Typography> */}
                        {/* <div id="button2" class="row2"> */}
                         <Button >  Se connecter </Button>
                        {/* </div> */}
                    </Link>

                </div>
              <Notification />
          </form>
        </ThemeProvider>
    )
}
