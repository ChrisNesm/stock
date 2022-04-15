import React, { useState, useEffect } from 'react';
import {
    List, Edit, Show, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
   
    TabbedForm, FormTab, useGetList, TabbedFormTabs
} from 'react-admin'

export default (props) => {
    const [ state, setState ] = useState([])
    
  
    return (
        <Show  {...props}>
            <TabbedForm tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />} >
                <FormTab label="Tableau de bord" >
                    <TextField source="name" />
                    <TextField source="address" />
                </FormTab>
                
                <FormTab label="gérants (owner)" >
                    <Button label="Yes" text="Text" />
                    <ArrayField source="managers">
                        <SingleFieldList>
                            <ChipField source="email" />
                        </SingleFieldList>
                    </ArrayField>
                </FormTab>
                <FormTab label="produits" >
                    <ArrayField source="articles">
                        <SingleFieldList>
                            <>
                                <TextField pars source="name"  />
                                <TextField source="description" />
                                <ChipField variant='success' source="unit_price" />
                            </>
                        </SingleFieldList>
                    </ArrayField>
                </FormTab>
                <FormTab label="Tableau de bord" >
                    <TextField source="name" />
                    <TextField source="address" />
                </FormTab>
                
                <FormTab label="gérants (owner)" >
                    <Button label="Yes" text="Text" />
                    <ArrayField source="managers">
                        <SingleFieldList>
                            <ChipField source="email" />
                        </SingleFieldList>
                    </ArrayField>
                </FormTab>
                <FormTab label="produits" >
                    <ArrayField source="articles">
                        <SingleFieldList>
                            <>
                                <TextField pars source="name"  />
                                <TextField source="description" />
                                <ChipField variant='success' source="unit_price" />
                            </>
                        </SingleFieldList>
                    </ArrayField>
                </FormTab>
            </TabbedForm>
        </Show>
    )
}
