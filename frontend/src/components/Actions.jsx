import { useEffect, useState } from 'react';
import { TopToolbar, useGetPermissions, Button,
    EditButton,     
    FilterButton,
    CreateButton,
    ExportButton,
    useListContext
} from 'react-admin';

export const EditAction = ({ basePath, data, resource }) => {
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        getPermissions().then(setState)
    }, [permissions])
    return (
        <TopToolbar>
            { (!permissions.is_superuser) && <EditButton basePath={basePath} record={data} /> }
        </TopToolbar>
    );
}


export const ListActions = () =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        getPermissions().then(setState)
    }, [permissions])
    return  (
        <TopToolbar>
            {
               permissions.is_manager && <CreateButton/>
            }
            <ExportButton/>
        </TopToolbar>
    );
}