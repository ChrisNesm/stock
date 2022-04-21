import React, { cloneElement, useRef, useMemo, useState, useEffect } from 'react';
import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, 
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField, NumberField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useRecordContext, useDataProvider, useResourceContext,
    sanitizeListRestProps, DatagridLoading, ListContextProvider, 
    TabbedForm, FormTab, useGetList, TabbedFormTabs, SimpleList
} from 'react-admin'
import ActionButton from '../../components/ActionButton'
// import AddBox from '@material-ui/icons'
import ShowOrder from './Show';
import { Button, Chip, Typography, useMediaQuery  } from '@material-ui/core';
import UserChip from '../../components/UserChip';
import theme from '../../constants/theme';
import orderStatus from '../../constants/orderStatus';
import CustomChip from '../../components/CustomChip';
import ConfirmOrder from '../../components/ConfirmOrder';
import { ESGToolbar } from '../../components/Actions';



export const ListOrder = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props}>       
           {
               isSmall ? (
                <SimpleList
                    rowStyle={record => ({
                        width: '95vw',
                        backgroundColor: theme.palette.secondary.light,
                        marginBottom: 10,
                        marginLeft: 10,
                        padding: 0,
                        paddingLeft: 5,
                        borderRadius: 10
                    })}
                    primaryText={
                        <>
                            <CustomChip wrapperOnly getText={(rec => (
                                <>
                                    { rec.status === orderStatus.PENDING && <Typography variant="caption" color='error' >En attente</Typography> }
                                    <NumberField
                                        label="Prix convenu"
                                        source="unit_price"
                                        color="inherit"
                                        options={{
                                            style: 'currency',
                                            currency: 'XOF',
                                        }}
                                        style={{
                                            position: 'absolute',
                                            right: 15
                                        }}
                                        
                                    />
                                </>
                            ) )} />
                            <br />
                            <ReferenceField source="article_id" reference="articles" label="Article" link={false} >
                                <Typography style={{color: 'gray'}} >
                                    <TextField source="name"  />
                                </Typography>
                            </ReferenceField>
                        </>
                    }
                    secondaryText={
                       <>
                            <ReferenceField source="orderer_id" reference="users" label="Client" >
                                <Typography color='secondary' variant='caption' >
                                    <UserChip getText={rec => `Commandé par: ${rec.full_name}, ${rec.email}`} />
                                    
                                </Typography>
                            </ReferenceField>
                            <CustomChip 
                                getText={(rec =>  <Typography variant="caption" >Qté {rec.order_quantity}</Typography>)} 
                                linkStyle={{
                                    position: 'absolute',
                                    right: 15
                                }}    
                            />
                            
                       </>
                    }
                    linkType='show'
                />
               ) : (
                <Datagrid rowClick='show'>
                    <ReferenceField source="orderer_id" reference="users" label="Client" link={false}>
                        <TextField source="full_name" />
                    </ReferenceField>
                    <ReferenceField source="article_id" reference="articles" label="Article" link={false} >
                        <TextField source="name" />
                    </ReferenceField>
                    
                    <TextField source="order_quantity"  label="Commandé" />
                    <TextField source="status"  label="Etat de la commande" />
                </Datagrid>
               )
           }
        </List>
    );
};

export const CreateOrder = (props) => (
    <Create  {...props} actions={<ESGToolbar />}>
        <SimpleForm>
            <ReferenceInput source="article_id" reference="articles" label="Article" >
                <SelectInput source="name" />
            </ReferenceInput>
            <TextInput source="order_quantity"  label="Quantité" />
        </SimpleForm>
    </Create>
);

export default {
    list: ListOrder,
    create: CreateOrder,
    show: ShowOrder
}

