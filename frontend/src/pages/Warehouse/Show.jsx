import React, { useState, useEffect } from 'react';
import {
    List, Edit, Show, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
   
    TabbedForm, FormTab, useGetList, TabbedFormTabs, useGetOne, NumberField, linkToRecord
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
            <TabComponent
                tabs={[
                    {label: 'Tableau de bord'},
                    {label: 'Gérants'},
                    {label: 'Articles'}
                ]}

                panels={[
                    <Box ml={4}>
                        <ReferenceField source="store_id" reference="stores" label="Boutique" >
                            <TextField source="name" />
                        </ReferenceField><br />
                        <TextField source="name" label="Nom du magasin" /><br />
                        <TextField source="address" label="Lieu" />
                    </Box>,

                    <>
                        <WarehouseListManagers />
                        
                    </>,

                    <>
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
                    </>
                ]}
            />

        </Show>
    )
}
