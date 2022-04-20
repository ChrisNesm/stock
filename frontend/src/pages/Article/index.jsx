import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
    NumberField, linkToRecord,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useMediaQuery, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab, useGetList, TabbedFormTabs, NumberInput, usePermissions
} from 'react-admin'
import ActionButton from '../../components/ActionButton'
import GridList from '../../components/GridList';
import { Chip, Box } from '@material-ui/core';
import ShowArticle from './Show';
import {ListActions} from '../../components/Actions'
export const ListArticle = props => {

    return (
        <List {...props} actions={<ListActions />}>       
           <GridList
                getTitle={rec => `${rec.name}`}
                getSubtitle={rec => (
                    <span>
                        <NumberField
                            source="unit_price"
                            record={rec}
                            color="inherit"
                            options={{
                                style: 'currency',
                                currency: 'XOF',
                            }}
                            
                        />
                    </span>
                )}
                image={null}
                to={id => linkToRecord('/articles', id, 'show')}
                getActionIcon={rec => (<Chip size='small' label={`Commandé: ${rec.pending_quantity}/${rec.quantity}`} />)}
                
            />
        </List> 
    );
};

export const CreateArticle = (props) => (
    <Create  {...props} title="Ajouter un article">
        <SimpleForm>
            <ReferenceInput source="warehouse_id" reference="warehouses" label="Entrepot">
                <SelectInput source='name' label="Magasin" required />
            </ReferenceInput>
            <TextInput source="name" required />
            <TextInput source="description" />
            <NumberInput source="unit_price" required/>
            <NumberInput source="quantity" defaultValue={0}  required/>
        </SimpleForm>
    </Create>
);

export const EditArticle = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                    <ReferenceField source="warehouse_id" reference="warehouses" label="Entrepot">
                        <TextField source='name' label="Magasin" />
                    </ReferenceField>
                    <ReferenceField source="warehouse_id" reference="warehouses">
                        <ReferenceField source="store_id" reference="stores" label="Boutique" >
                            <TextField source='name' />
                            </ReferenceField>
                    </ReferenceField>
    
                    <TextInput source="name" />
                    <TextInput source="description" />
                    <NumberInput source="unit_price" />
                    <NumberInput source="quantity" />
                    <NumberInput source="pending_quantity" />
            </SimpleForm>
        </Edit>
    );

} 



export default {
    list: ListArticle,
    edit: EditArticle,
    create: CreateArticle,
    show: ShowArticle
}

