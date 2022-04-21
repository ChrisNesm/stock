import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, SimpleList,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, NumberField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    Form, SingleFieldList, ChipField, Show,
    linkToRecord,
    useGetOne,
    Link
} from 'react-admin'
import ActionButton from '../../components/ActionButton'
import { Box, Card, CardContent, CardHeader, useMediaQuery } from '@material-ui/core';
import theme from '../../constants/theme';
import { Modal, makeStyles, Chip, Button, Typography } from '@material-ui/core';
import GridList from '../../components/GridList';
import TabComponent from '../../components/TabComponent'
import AddManager, { AddManagerIcon, AddManagerModal } from '../../components/AddManager';
import UserChip from '../../components/UserChip/index';
import ListManagers from '../../components/ListManagers'

import AddBox from '@material-ui/icons/AddBox';
import { ESGToolbar } from '../../components/Actions';
export const ListStore = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
        return (
        <List {...props}>       
            { isSmall ? (
                <SimpleList
                primaryText={record => record.name}
                secondaryText={record => `${record.address}`}
                tertiaryText={record => record.is_active}
                linkType={record => record.canEdit ? "edit" : "show"}
                rowStyle={record => ({ backgroundColor: theme.palette.secondary.main, marginBottom: 10 })}
            />
            ) : (
                <Datagrid {...props} >
                <TextField source="name" />
                <TextField source="address" />
                <ActionButton actions="edit,show,delete" />
                {/* <CreateRelatedNiveauBtn /> */}
            </Datagrid>
            ) }
        </List>
    );
};

export const CreateStore = (props) => (
    <Create  {...props} actions={<ESGToolbar />}>
        <SimpleForm >
            <TextInput source="name" />
            <TextInput source="address" />
        </SimpleForm>
    </Create>
);

export const EditStore = (props) => (
    <Edit {...props} actions={<ESGToolbar />}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="address" />
        </SimpleForm>
    </Edit>
);

const Title = (props) => {
    const [ title, setTitle ] = useState("...")
    const { data } = useGetOne(props.resource, props.id)
    // console.log(data)
    
    return <h3>{data ? data.name : title}</h3>
}

export const ShowStore = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Show  {...props} title={<Title {...props} />} actions={<ESGToolbar />}>
            <div style={{}}>

                <TabComponent 
                
                    tabs={[
                        {label: "Articles"},
                        {label: "Tableau de board"},
                        {label: "Magasins"},
                        {label: "Gérants"},
                    ]}
                    panels={[
                        <>
                            <ArrayField source="warehouses">
                                <Datagrid rowStyle={row => ({width: '100vw', backgroundColor: 'white'})} >
                                    <ArrayField source="articles">
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
                                    </ArrayField>

                                </Datagrid>

                            </ArrayField>
                        </>,

                        <Box>
                            <span>Nom de la boutique : </span>
                            <TextField source="name" />
                            <br />
                            <span>Adresse : </span>
                            <TextField source="address" />
                        </Box>,

                        <div>
                            
                            <ArrayField source="warehouses">
                                <SingleFieldList>
                                    <ChipField source="name" />
                                </SingleFieldList>
                            </ArrayField>
                            
                        </div>,
                        
                        <>
                            
                            <ArrayField source="warehouses">
                                <ListManagers />
                            </ArrayField>
                        </>,
                       
                    ]} />
            </div>

        </Show>
    )
}



export default {
    list: ListStore,
    edit: EditStore,
    create: CreateStore,
    show: ShowStore
}

