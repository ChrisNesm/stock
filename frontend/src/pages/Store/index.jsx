import React, { cloneElement, useRef, useMemo, useState } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useMediaQuery, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab
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
            <TextInput source="full_name" />
            <TextInput source="email" />
            <TextInput source="password" />
            <BooleanInput source="is_owner" />
            <BooleanInput source="is_seller" />
            <BooleanInput source="is_manager" />
            <BooleanInput source="is_active" />
            <BooleanInput source="is_superuser" />
        </SimpleForm>
    </Create>
);

export const EditStore = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="full_name" />
            <TextInput source="email" />
            <BooleanInput source="is_owner" />
            <BooleanInput source="is_seller" />
            <BooleanInput source="is_manager" />
            <BooleanInput source="is_active" />
            <BooleanInput source="is_superuser" />
        </SimpleForm>
    </Edit>
);

export const ShowStore = (props) => (
    <Edit  {...props}>
        <TabbedForm>
            <FormTab label="Ma boutique" >
                <TextField source="name" />
                <TextField source="address" />
            </FormTab>
            <FormTab label="Mes entrepots" >
                
            </FormTab>
        </TabbedForm>
    </Edit>
);



export default {
    list: ListStore,
    edit: EditStore,
    create: CreateStore,
    show: ShowStore
}

