import {
    CreateButton, EditButton, DeleteButton, ShowButton,
    useRecordContext
   } from 'react-admin'
import { AdminOnly } from './Restrictors'
                   
   
   export default (props) => {
       const actions = props.actions.split(',')
       // const record = useRecordContext()
   
       return (
           <>
               { actions.find( action => action === 'show' )  && <ShowButton {...props} label="Voir" /> }
               { actions.find( action => action === 'edit' )  && (
                   <AdminOnly negate={true}>
                        <EditButton {...props} label="Modifier" />
                   </AdminOnly>
               ) }
               { actions.find( action => action === 'delete' ) && <DeleteButton {...props} label="Archiver" /> }
   
           </>
       )
   }