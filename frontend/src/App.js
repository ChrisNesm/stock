import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';

import theme from './constants/theme' 
import dataProvider from './providers/dataProvider' 
import authProvider from './providers/authProvider'

import LoginPage from './pages/Login';
import LogoutButton from './components/LogoutButton';

import UserCRUD from './pages/User'

const App = () => (
    <Admin 
    	title="My Custom Admin"
        loginPage={LoginPage} 
    	dataProvider={dataProvider} 
    	authProvider={authProvider}  
        theme={theme}
    	>

        <Resource name="users" {...UserCRUD}  />
    </Admin>
);

export default App;