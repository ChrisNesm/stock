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


// const CreateRelatedNiveauBtn = ({ record }) => (
//     <Button
//         component={Link}
//         to={{
//             pathname: '/niveau/create',
//             state: { record: { annee: record.id } },
//         }}
//     >
//         Ajouter un niveau
//     </Button>
// );


export const ListStore = props => {
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

export const CreateStore = (props) => (
    <Create  {...props}>
        <SimpleForm >
            <TextInput source="name" />
            <TextInput source="address" />
        </SimpleForm>
    </Create>
);

export const EditStore = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="address" />
        </SimpleForm>
    </Edit>
);

export const ShowStore = (props) => {
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
    list: ListStore,
    edit: EditStore,
    create: CreateStore,
    show: ShowStore
}
