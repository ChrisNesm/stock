import React, { Component, useEffect, useRef } from "react";

import { useState, useCallback } from 'react';
import { useLogin, useNotify, Notification, defaultTheme, ReferenceInput, SelectInput,
    useGetOne, useListContext, useRecordContext, useDataProvider, useMutation, 
    useRefresh, Create, SimpleForm, TextInput, TextField, NumberInput, 
} from 'react-admin';
import { Redirect } from 'react-router-dom'
import './index.css'
import { Chip, Typography, useMediaQuery, Modal, Card, Button, CardHeader, CardContent } from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox'
import Cancel from '@material-ui/icons/Cancel'
import CustomChip from "../CustomChip";
const FormButton = props => (
    <div id="button" class="row">
      <button onClick={props.submit} >  {props.title}</button>
    </div>
);
  
  
export const OrderForm = (props) => {
    const record = useRecordContext()
    // console.log(record)
        const [mutate] = useMutation();
        const save = useCallback(
            async (values) => {
                try {
                    await mutate({
                        type: 'create',
                        resource: 'orderers',
                        payload: { data: {
                            article_id: record.id,
                            order_quantity: values.order_quantity
                        } },
                    }, { returnPromise: true });
                    props.callback && props.callback()
                } catch (error) {
                    if (error) {
                        return error;
                    }
                }
            },
            [mutate],
        );
    
        return (
            <Create basePath='/orderers' resource="orderers" component={'div'} >
                <SimpleForm save={save}>
                    <CustomChip label="Article: " getText={() => record.name} />
                    <CustomChip label="Quantité actuelle: " getText={() => `${record.pending_quantity}`} />
                    <NumberInput max={record.pending_quantity} label="Quantité à commander" source="order_quantity"  />
                </SimpleForm>
            </Create>
        );
    };

export const MakeOrderModal = ({open, closer, callback}) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const record = useRecordContext()
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
                <OrderForm callback={callback} />
                
            </Card>
            </Modal>
    )
}