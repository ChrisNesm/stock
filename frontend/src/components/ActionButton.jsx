import {
    CreateButton, EditButton, DeleteButton, ShowButton,
    useRecordContext
   } from 'react-admin'
   
                   
   
   export default (props) => {
       const actions = props.actions.split(',')
       // const record = useRecordContext()
   
       return (
           <>
               { actions.find( action => action === 'show' )  && <ShowButton {...props} /> }
               { actions.find( action => action === 'edit' )  && <EditButton {...props} /> }
               { actions.find( action => action === 'delete' ) && <DeleteButton {...props} /> }
   
           </>
       )
   }