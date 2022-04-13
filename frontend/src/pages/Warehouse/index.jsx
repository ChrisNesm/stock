import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useMediaQuery, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab, useGetList
} from 'react-admin'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { Card } from '@material-ui/core';
import ActionButton from '../../components/ActionButton'

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const ListWarehouse = props => {
/*    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
*/    return (
        <List {...props}>       
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="address" />
                <BooleanField source="is_active" />
                <ActionButton actions="edit,show,delete" />
                {/* <CreateRelatedNiveauBtn /> */}
            </Datagrid>
        </List>
    );
};

export const CreateWarehouse = (props) => (
    <Create  {...props}>
        <SimpleForm >
            <TextInput source="name" />
            <TextInput source="address" />
            <ReferenceInput source="store_id" reference="stores">
                <SelectInput optionText='name' />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const EditWarehouse = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="address" />
        </SimpleForm>
    </Edit>
);

export const ShowWarehouse = (props) => {
    const all =  useGetList(
        'warehouses/owned',
        {}, {}, {
            store_id: parseInt(props.id)
        }
    )
    console.log(all)
    
    useEffect(()=>{
        // console.log(props)

    }, [])
    return (
        <Edit  {...props}>
            <TabbedForm>
                <FormTab label="Tableau de bord" >
                    <TextField source="name" />
                    <TextField source="address" />
                </FormTab>
                <FormTab label="entrepots" >
                    
                </FormTab>
                <FormTab label="gérants" >
                    
                </FormTab>
                <FormTab label="produits" >
                    
                </FormTab>
            </TabbedForm>
        </Edit>
    )
}



export default {
    list: ListWarehouse,
    edit: EditWarehouse,
    create: CreateWarehouse,
    show: ShowWarehouse
}

