import React, { useState, useEffect } from 'react';
import {
    List, Edit, Show, 
    TextField, DateField, ReferenceField, useRefresh,
   
    TabbedForm, FormTab, useGetList, TabbedFormTabs, useGetOne, NumberField, linkToRecord, SimpleShowLayout, useShowContext
} from 'react-admin'
import { EditAction, ESGToolbar } from '../../components/Actions';
import { Box, Button } from '@material-ui/core';
import { MakeOrderModal } from '../../components/MakeOrder';
import {ManagerOnly, SellerOnly} from '../../components/Restrictors'
const Title = (props) => {
    const [ title, setTitle ] = useState("...")
    const { data } = useGetOne(props.resource, props.id)
    // console.log(data)
    
    return <h3>{data ? 'Magasin de ' +data.name : title}</h3>
}

export default (props) => {
    const [ state, setState ] = useState(false)
    const closer = ()=> setState(prev => !prev);
    const refresh = useRefresh()
    return (
        <Show  {...props} title={<Title {...props} />} actions={<ESGToolbar />} >
            <SimpleShowLayout>
                <ReferenceField source='warehouse_id' reference='warehouses'>
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="name" />
                <TextField source="description" />
                <NumberField
                    source="unit_price"
                    color="inherit"
                    options={{
                        style: 'currency',
                        currency: 'XOF',
                    }}
                    
                />
                <NumberField label="Quantité accesible" source="pending_quantity" />
                <ManagerOnly>
                    <NumberField label="Quantité totale" source="quantity" />
                </ManagerOnly>
                <Box>
                <MakeOrderModal
                    open={state}
                    closer={closer}
                    callback={()=>{
                        closer()
                        refresh()
                    }}
                />
                <SellerOnly>
                    <Button
                        
                        onClick={closer}
                        variant='contained'
                    >
                        Commander
                    </Button>
                </SellerOnly>

                </Box>
            </SimpleShowLayout>
        </Show>
    )
}
