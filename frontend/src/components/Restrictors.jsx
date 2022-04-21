import { useEffect, useState } from 'react';
import { TopToolbar, useGetPermissions
} from 'react-admin';

export const AdminOnly = ({children, negate}) =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return  (
        <>
            {negate && (!permissions.is_superuser)  && children }
            {(!negate) && permissions.is_superuser  && children }
        </>
    );
}


export const ManagerOnly = ({children, negate}) =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return  (
        <>
            {negate && (!permissions.is_superuser)  && children }
            {(!negate) && permissions.is_manager  && children }
        </>
    );
}
