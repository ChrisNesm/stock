import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useMediaQuery, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab, useGetList, TabbedFormTabs
} from 'react-admin'
import ActionButton from '../../components/ActionButton'

import ShowWarehouse from './Show';

export const ListWarehouse = props => {
/*    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
*/    return (
        <List {...props}>       
            <Datagrid>
                <ReferenceField source="store_id" reference="stores">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="name" />
                <TextField source="address" />
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
           {/* <TabComponent /> */}
        </SimpleForm>
    </Edit>
);



export default {
    list: ListWarehouse,
    edit: EditWarehouse,
    create: CreateWarehouse,
    show: ShowWarehouse
}

