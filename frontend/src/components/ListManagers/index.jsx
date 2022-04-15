import React, {useState} from 'react';
import { SimpleList, ArrayField, SingleFieldList, TextField, Datagrid, useRefresh, useNotify,  useRecordContext, useDataProvider } from 'react-admin';
import { Box, useMediaQuery } from '@material-ui/core';
import UserChip from '../UserChip';
import theme from '../../constants/theme';
import AddManager, { AddManagerIcon, AddManagerModal } from '../AddManager';
import Cancel from '@material-ui/icons/Cancel'
import AccessAlarm from  '@material-ui/icons/AccessAlarm'

export const WarehouseListManagers = () => {
    const [ open, setOpen ] = useState();
    const handleRemoveManager = () => setOpen(prev => !prev)
    const dataProvider = useDataProvider();
    const warehouse = useRecordContext(),
            notify = useNotify(),
            refresh = useRefresh()
    

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Box m={1} >
            <ArrayField source="managers">
                
                {
                    isSmall ? (
                        <SimpleList 
                            primaryText={<UserChip getText={rec =>  `${rec.full_name}, ${rec.email}` } />}
                            secondaryText={
                                rec => "200 commandes effectuées"
                            }
                            
                            rightIcon={ row =>(
                                <Cancel onClick={()=> {
                                    let ok = window.confirm(`Vous allez retirer le manager ${row.full_name} (${row.email})`)
                                }} style={{color: 'black'}} />
                            )}
                            // tertiaryText={
                            //     <UserChip getText={rec =>  `${rec.full_name}, ${rec.email}` } />
                            // }
                            rowStyle={record => ({
                                width: '95vw',
                                backgroundColor: theme.palette.secondary.light,
                                marginBottom: 3,
                                marginTop: 3,
                            })}
                            linkType={false}

                        />

                    ) : (

                    <Datagrid 
                        // body={<MyDatagridBody />}
                        rowStyle={row => ({backgroundColor: theme.palette.secondary.light, marginBottom: 10})} 
                        rowClick={rec => {
                            console.log(warehouse.id, JSON.parse(rec).id )
                             dataProvider.removeManager({id: warehouse.id, user_id: JSON.parse(rec).id})
                                .then(({data})=>{
                                    console.log("my data", data)
                                    notify(`<${data.email}> ne gére plus le magasin <${warehouse.name}> `, 'success', {}, false, 10000)
                                    refresh()
                                })
                                .catch(err => notify(err.message, 'error'))
                        }} >
                            <span style={{zIndex: 1000}}>
                            <UserChip getText={rec =>  `${rec.full_name}, ${rec.email}` } />

                            </span>
                        <Cancel htmlColor='black' />
                        
                    </Datagrid>
                    )
                }
                
            </ArrayField>
            
        </Box>
    )
}

const StoreListManagers = () => {
    const [ open, setOpen ] = useState();
    const handleRemoveManager = () => setOpen(prev => !prev)

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <>
            {
                isSmall ? (
                    <SimpleList 
                        primaryText={<TextField source="name" style={{marginBottom: 20, color: 'white'}} />}
                        secondaryText={
                            <ArrayField source="managers">
                                <SingleFieldList>
                                    <UserChip />
                                </SingleFieldList>
                            </ArrayField>
                        }
                        
                        rightIcon={ row =>(
                            <AddManagerIcon onClick={()=> { console.log("ok"); handleRemoveManager() }} label="Ajouter" />
                        )}
                        tertiaryText={
                            <AddManagerModal open={open} closer={handleRemoveManager}  callback={handleRemoveManager}/>
                        }
                        rowStyle={record => ({
                            display: 'flew',
                            backgroundColor: theme.palette.secondary.light
                        })}
                        linkType={false}

                    />
                            

                ) : (

                <Datagrid rowStyle={row => ({backgroundColor: theme.palette.secondary.light})} rowClick={false} >
                    <AddManagerModal open={open} closer={handleRemoveManager} callback={handleRemoveManager}/>
                        <TextField  source="name" />
                        <ArrayField source="managers">
                            <SingleFieldList>
                                <UserChip />
                            </SingleFieldList>
                        </ArrayField>
                        
                        <AddManagerIcon onClick={handleRemoveManager} label="Ajouter" />
                    
                </Datagrid>
                )
            }
        </>
    )
}

export default StoreListManagers