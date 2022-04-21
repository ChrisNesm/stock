import { Button } from "@material-ui/core"
import AddBox from '@material-ui/icons/Save'
import { useRecordContext, useDataProvider, useNotify, useRefresh } from "react-admin"

const ConfimOrder = ({clickHandler, label, onClick, ...rest}) => {
    const record = useRecordContext()
    const dataProvider = useDataProvider()
    const notify = useNotify()
    const refresh = useRefresh()
    // useGetOne('warehouses', )

    onClick = onClick ? onClick : ()=>{
        dataProvider.rejectOrder({id: record.id})
            .then(({data})=>{
                console.log("my data", data)
                notify(`La Commande a été rejectée !`, 'success', {}, false, 5000)
                refresh()
                rest.callback && rest.callback()
            })
            .catch(console.log)

    }
    console.log(record)
    return (
        <Button className="link-add-manager" 
            onClick={onClick} 
            variant="contained" 
            color="error" 
            {...rest} >
            {label} 
            
        </Button>
    )
}

export default ConfimOrder