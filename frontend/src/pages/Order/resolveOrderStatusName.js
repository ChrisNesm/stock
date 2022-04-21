import orderStatus from '../../constants/orderStatus';

export default (status) => {
    switch (status) {
        case orderStatus.DONE:
            return "Commande validée"
            break;
        case orderStatus.REJECTED:
            return "Rejectée par le gérant"
            break;

        case orderStatus.CANCELLED:
            return "Commande annulée"
            break;
        case orderStatus.PENDING:
            return "En événement"
            break;
                
        default:
            break;
    }
}