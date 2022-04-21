import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,SaveButton, Toolbar, useNotify, useRedirect, useCreate, useFormContext, useSaveContext,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
    NumberField, linkToRecord, ImageInput, ImageField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useMediaQuery, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab, useGetList, TabbedFormTabs, NumberInput, usePermissions, useQuery, useGetOne
} from 'react-admin'
import ActionButton from '../../components/ActionButton'
import GridList from '../../components/GridList';
import { Chip, Box } from '@material-ui/core';
import ShowArticle from './Show';
import {ESGToolbar, ListActions} from '../../components/Actions'


const ArticleSaveButton = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = (response) => {
        notify(`Article "${response.data.name}" saved!`);
        redirect('/articles');
    };
    const form = useFormContext();
    const saveContext = useSaveContext()
    return <Button label="Savon" onClick={()=>console.log(form)} />;
};

const PostEditToolbar = () => (
    <Toolbar>
        <ArticleSaveButton />
        <DeleteButton />
    </Toolbar>
);
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
const GeStoreName = ({id})=> {
    const {data} = useGetOne('stores', id)
    return <>{data && data.name}</>
}

export const CreateArticle = (props) => {
    const [create] = useCreate();
    const articleSave = (data) => {
        // create('articles', { data });
        console.log(" to save" , data)
    };    

    return (
        <Create  {...props} title="Ajouter un article"  >
            <SimpleForm>
            {/* <SimpleForm toolbar={<PostEditToolbar />}> */}
                <ReferenceInput source="warehouse_id" reference="warehouses" label="Entrepot">
                    <SelectInput source='name' label="Magasin" required  optionText={rec => (
                        <>
                            {rec.name} --- <GeStoreName id={rec.store_id} />
                        </>
                    ) }/>
                </ReferenceInput>
                <ImageInput source="img" label="Photo" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>

                <TextInput source="name" required />
                <TextInput source="description" />
                <NumberInput source="unit_price" required/>
                <NumberInput source="quantity" defaultValue={0}  required/>
            </SimpleForm>
        </Create>
    );
}

export const EditArticle = (props) => {
    return (
        <Edit {...props} actions={<ESGToolbar />}>
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

