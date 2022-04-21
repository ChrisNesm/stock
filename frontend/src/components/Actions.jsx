import { useEffect, useState } from 'react';
import { TopToolbar, useGetPermissions, Button,
    EditButton,     
    FilterButton,
    CreateButton,
    ExportButton,
    useListContext
} from 'react-admin';
import GoBack from './GoBack';

export const EditAction = ({ basePath, data, resource }) => {
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return (
        <TopToolbar>
            { (!permissions.is_superuser) && <EditButton basePath={basePath} record={data} label="Modifier" /> }
        </TopToolbar>
    );
}


export const ListActions = () =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return  (
        <TopToolbar>
            {
               permissions.is_manager && <CreateButton label="Créer" />
            }
            <ExportButton/>
        </TopToolbar>
    );
}


export const ESGToolbar = () =>{
    return  (
        <TopToolbar>
            <GoBack />
        </TopToolbar>
    );
}