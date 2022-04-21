import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab, useGetList, TabbedFormTabs, useGetOne, SimpleList
} from 'react-admin'
import ActionButton from '../../components/ActionButton'
import { useMediaQuery } from '@material-ui/core';
import ShowWarehouse from './Show';
import theme from '../../constants/theme';
import { ESGToolbar } from '../../components/Actions';


const filters = [
    <ReferenceInput source='store_id' reference='stores' alwaysOn >
        <SelectInput optionName='name' />
    </ReferenceInput>
]

export const ListWarehouse = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const dataProv = useDataProvider()
    return (
        <List {...props} filters={filters} >   
            {
                isSmall ? (
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record => `${record.address}`}
                        tertiaryText={record => {
                            return (
                                <ReferenceField source='store_id' reference='stores'  >
                                    <TextField source='name' />
                                </ReferenceField>
                            )
                        }}
                        linkType={record => record.canEdit ? "edit" : "show"}
                        rowStyle={record => ({ backgroundColor: theme.palette.secondary.main, marginBottom: 10 })}
                    />
                ) : (

                    <Datagrid rowClick={'show'}>
                        <ReferenceField source="store_id" reference="stores" label="Boutique" >
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="name" />
                        <TextField source="address" />
                        <ActionButton actions="edit,show,delete" />
                        {/* <CreateRelatedNiveauBtn /> */}
                    </Datagrid>
                )
            }    
        </List>
    );
};

export const CreateWarehouse = (props) => (
    <Create  {...props} actions={<ESGToolbar />}>
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
    <Edit {...props} actions={<ESGToolbar />}>
        <SimpleForm>
        <TextInput source="name" />
        <TextInput source="address" />
        </SimpleForm>
    </Edit>
);



export default {
    list: ListWarehouse,
    edit: EditWarehouse,
    create: CreateWarehouse,
    show: ShowWarehouse
}

