import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';

import theme from './constants/theme' 
import dataProvider from './providers/dataProvider' 
import authProvider from './providers/authProvider'

import LoginPage from './pages/Login';
import LogoutButton from './components/LogoutButton';

import UserCRUD from './pages/User'
import StoreCRUD from './pages/Store'
import WarehouseCRUD from './pages/Warehouse'
import OrderCRUD from './pages/Order'
import ArticleCRUD from "./pages/Article";
// require('dotenv').config();
const guessers = {
    list: ListGuesser,
    edit: EditGuesser,
    show: ShowGuesser
}
const App = () => (
    <Admin 
    	title="Rooky stock"
        loginPage={LoginPage} 
    	dataProvider={dataProvider} 
    	authProvider={authProvider}  
        theme={theme}
    	>

        <Resource options={{label: "Users (admin)"}} name="users" {...UserCRUD}  />
        <Resource  options={{label: "Mes Boutiques"}}  name="stores" {...StoreCRUD}  />
        <Resource  options={{label: "Tous mes entrepots"}}  name="warehouses" {...WarehouseCRUD}  />
        <Resource  options={{label: "Tous mes articles"}}  name="articles" {...ArticleCRUD}  />
        <Resource  options={{label: "Commandes"}}  name="orderers" {...OrderCRUD} />
    </Admin>
);

export default App;