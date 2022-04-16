import { Button } from "@material-ui/core"
import AddBox from '@material-ui/icons/Save'

const ConfimOrder = ({clickHandler, label, onClick, ...rest}) => {
    return (
        <Button className="link-add-manager" 
            onClick={onClick} 
            variant="contained" 
            color="secondary" 
            endIcon={<AddBox color="action"  />}
            {...rest} >
            {label} 
            
        </Button>
    )
}

export default ConfimOrder