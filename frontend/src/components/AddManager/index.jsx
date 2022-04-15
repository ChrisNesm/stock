import React, { Component, useEffect, useRef } from "react";

import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme, useGetOne, useListContext, useRecordContext, useDataProvider, useRefresh } from 'react-admin';
import { Redirect } from 'react-router-dom'
import './index.css'
import { Chip, Typography } from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox'

const FormButton = props => (
    <div id="button" class="row">
      <button onClick={props.submit} >  {props.title}</button>
    </div>
);
  
const FormInput = props => {
    let ref = useRef()
    useEffect(()=>{
        console.log(ref.current)
        ref.current && ref.current.focus()
    }, [ref])
    return (
        <div class="row" >
            <label for="input" >{props.description}</label>
            <input id="input" {...props} ref={ref} onFocus={console.log("focus")} />
        </div>  
        );
}
  
export default (props) => {
    const record = useRecordContext()
    const [phone, setPhone] = useState('');
    const dataProvider = useDataProvider()
    const notify = useNotify()
    const refresh = useRefresh()
    // useGetOne('warehouses', )
    const submit = e => {
        e.preventDefault();
        // console.log(phone, record)
        dataProvider.setManager({id: record.id, user_id: parseInt(phone)})
            .then(({data})=>{
                console.log("my data", data)
                notify(`<${data.email}> est désormais manager du magasin <${record.name}> `, 'success', {}, false, 10000)
                refresh()
                props.callback && props.callback()
            })
            .catch(console.log)
    };


    return(
       
            <form id="loginform" style={{}} >
                <div>
                    <h4 style={{textAlign: 'center'}}>Ajout d'un gérant dans le magasin</h4>
                    <h1 style={{textAlign: 'center'}}><Chip label={record.name} /></h1>
                    <FormInput required onChange={e => setPhone(e.target.value)} name="username" description="Entrez son numéro de téléphone" type="text" />
                    <FormButton title="Valider" submit={ e => submit(e) } />
                </div>
              <Notification />
          </form>
       
    )
}


export const AddManagerIcon = ({clickHandler, label}) => {
    return (
        <span className="link-add-manager" onClick={clickHandler} style={{display: 'flex', alignItems: 'center', alignContent: 'center', verticalAlign: 'center'}}  >
            {label} 
            <AddBox color="secondary"  />
        </span>
    )
}