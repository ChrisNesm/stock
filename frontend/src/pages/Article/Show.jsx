import React, { useState, useEffect } from 'react';
import {
    List, Edit, Show, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
   
    TabbedForm, FormTab, useGetList, TabbedFormTabs, useGetOne, NumberField, linkToRecord, SimpleShowLayout
} from 'react-admin'
import { Box, Card, CardContent, Chip } from '@material-ui/core';
import TabComponent from '../../components/TabComponent'
import UserChip from '../../components/UserChip';
import StoreListManagers, { WarehouseListManagers } from '../../components/ListManagers';
import GridList from '../../components/GridList';

const Title = (props) => {
    const [ title, setTitle ] = useState("...")
    const { data } = useGetOne(props.resource, props.id)
    // console.log(data)
    
    return <h3>{data ? 'Magasin de ' +data.name : title}</h3>
}

export default (props) => {
    const [ state, setState ] = useState([])
    
  
    return (
        <Show  {...props} title={<Title {...props} />} >
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
                <NumberField source="quantity" />
                <NumberField source="quantity" />

            </SimpleShowLayout>
        </Show>
    )
}
