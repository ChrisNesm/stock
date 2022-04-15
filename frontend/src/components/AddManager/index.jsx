import React, { Component, useEffect, useRef } from "react";

import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme, useGetOne, useListContext, useRecordContext, useDataProvider, useRefresh } from 'react-admin';
import { Redirect } from 'react-router-dom'
import './index.css'
import { Chip, Typography, useMediaQuery, Modal, Card, Button, CardHeader, CardContent } from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox'
import Cancel from '@material-ui/icons/Cancel'
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
  
const AddManager = (props) => {
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
       
            <form id="loginform" style={{}} {...props} >
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
export default AddManager

export const AddManagerIcon = ({clickHandler, label, onClick, ...rest}) => {
    return (
        <Button className="link-add-manager" 
            onClick={onClick} 
            variant="contained" 
            color="secondary" 
            style={{display: 'flex', alignItems: 'center', alignContent: 'center', verticalAlign: 'center'}} {...rest} >
            {label} 
            <AddBox color="action"  />
        </Button>
    )
}

export const AddManagerModal = ({open, closer, callback}) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
   
    return (
        <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            
            >
            <Card style={{
                position: 'absolute',
                top: '30%',
                width: isSmall ? '90vw' : '40vw',
                left: isSmall ? '5vw' : '30vw',
                height: '50vh',
                display: 'flex',
                verticalAlign: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}
            
            >
                 <Cancel color="error" style={{alignSelf: 'flex-start'}} onClick={closer} />
                <AddManager callback={callback} />
                
            </Card>
            </Modal>
    )
}