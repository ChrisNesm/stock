import { useEffect, useState } from 'react';
import { TopToolbar, useGetPermissions
} from 'react-admin';

export const AdminOnly = ({children, negate, otherwise}) =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return  (
        <>
            {(negate && (!permissions.is_superuser) ) || ((!negate) && permissions.is_superuser) ? children : otherwise}
        </>
    );
}


export const ManagerOnly = ({children, negate, otherwise}) =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return  (
        <>
            {(negate && (!permissions.is_superuser)) || ((!negate) && permissions.is_manager )  ? children : otherwise }
        </>
    );
}

export const SellerOnly = ({children, negate, otherwise}) =>{
    const [ permissions, setState ] = useState({})
    const getPermissions = useGetPermissions()
    useEffect(()=>{
        if(permissions.email !== undefined ){
            getPermissions().then(setState)
        }
    }, [permissions])
    return  (
        <>
            {(negate && (!permissions.is_seller)) || ((!negate) && permissions.is_seller )  ? children : otherwise }
        </>
    );
}
