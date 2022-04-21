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

import { AdminOnly } from "./components/Restrictors";
const guessers = {
    list: ListGuesser,
    edit: EditGuesser,
    show: ShowGuesser
}

const Renderer = () => {
    const  [ perms, setPerms ] = React.useState({})
    React.useEffect(()=>{
        if(typeof perms.email === 'undefined') {
            authProvider.getPermissions()
                .then(setPerms)
        }
    }, [perms])
    console.log("APP perms", perms)
    return (
        <>
            {
                perms.is_superuser ? (
                    <Admin 
                        title="Rooky stock (admin)"
                        loginPage={LoginPage} 
                        dataProvider={dataProvider} 
                        authProvider={authProvider}  
                        theme={theme}
                        >
                            <Resource options={{label: "Users (admin)"}} name="users" {...UserCRUD}  />
                            <Resource  options={{label: "Toutes les Boutiques"}}  name="stores" list={StoreCRUD.list} show={StoreCRUD.show}  />
                            <Resource  options={{label: "Tous les entrepots"}}  name="warehouses" list={WarehouseCRUD.list} show={WarehouseCRUD.show}  />
                            <Resource  options={{label: "Tous les articles"}}  name="articles" list={ArticleCRUD.list} show={ArticleCRUD.show} />
                            <Resource  options={{label: "Toutes les Commandes"}}  name="orderers" list={OrderCRUD.list} show={OrderCRUD.show} />
                        </Admin>
                ) : (
                    <Admin 
                    title="Rooky stock"
                    loginPage={LoginPage} 
                    dataProvider={dataProvider} 
                    authProvider={authProvider}  
                    theme={theme}
                    >
                        <Resource  options={{label: "Mes Boutiques"}}  name="stores" {...StoreCRUD}  />
                        <Resource  options={{label: "Mes entrepots"}}  name="warehouses" {...WarehouseCRUD}  />
                        <Resource  options={{label: "Mes articles"}}  name="articles" {...ArticleCRUD}  />
                        <Resource  options={{label: "Mes Commandes"}}  name="orderers" {...OrderCRUD} />
                        <Resource   name="users" show={UserCRUD.show} />
                    </Admin>
                )
            }
        
        </>
    )
}

const App = () => (
    <Renderer />
);

export default App;