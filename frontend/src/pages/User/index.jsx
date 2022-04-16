import {
    List, Edit, Create, Datagrid, SimpleForm, TopToolbar,
    FilterList, FilterListItem, FilterLiveSearch,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton,
    TextField, DateField, ReferenceField, SelectField, BooleanField,
    TextInput, DateInput, ReferenceInput, SelectInput, BooleanInput,
    useListContext, useTranslate, useMediaQuery, useRecordContext, useDataProvider, useResourceContext
} from 'react-admin'

import ActionButton from '../../components/ActionButton'

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


// const CreateRelatedNiveauBtn = ({ record }) => (
//     <Button
//         component={Link}
//         to={{
//             pathname: '/niveau/create',
//             state: { record: { annee: record.id } },
//         }}
//     >
//         Ajouter un niveau
//     </Button>
// );


export const ListUsers = props => {
/*    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
*/    return (
        <List {...props}>       
            <Datagrid>
                <TextField source="id" />
                <TextField source="full_name" />
                <TextField source="email" />
                <BooleanField source="is_owner" />
                <BooleanField source="is_seller" />
                <BooleanField source="is_manager" />
                <BooleanField source="is_active" />
                <BooleanField source="is_superuser" />
                <ActionButton actions="show,edit,delete" />
                {/* <CreateRelatedNiveauBtn /> */}
            </Datagrid>
        </List>
    );
};

export const CreateUser = (props) => (
    <Create  {...props}>
        <SimpleForm >
            <TextInput source="full_name" />
            <TextInput source="email" />
            <TextInput source="password" />
            <BooleanInput source="is_owner" />
            <BooleanInput source="is_seller" />
            <BooleanInput source="is_manager" />
        </SimpleForm>
    </Create>
);

export const EditUser = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="full_name" />
            <TextInput source="email" />
            <BooleanInput source="is_owner" />
            <BooleanInput source="is_seller" />
            <BooleanInput source="is_manager" />
            <BooleanInput source="is_active" />
            <BooleanInput source="is_superuser" />
        </SimpleForm>
    </Edit>
);

export const ShowUser = (props) => (
    <Edit  {...props}>
        <SimpleForm>
        <TextField source="id" />
            <TextField source="full_name" />
            <TextField source="email" />
            <BooleanField source="is_owner" />
            <BooleanField source="is_seller" />
            <BooleanField source="is_manager" />
            <BooleanField source="is_active" />
            <BooleanField source="is_superuser" />
        </SimpleForm>
    </Edit>
);



export default {
    list: ListUsers,
    edit: EditUser,
    create: CreateUser,
    show: ShowUser
}

