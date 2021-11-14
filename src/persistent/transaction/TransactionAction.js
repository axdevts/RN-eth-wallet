import {RequestConstant, ResponseConstant} from '../common/CommonConstant';
import {TransactionConstant} from './TransactionConstant';
import {TransactionService} from './TransactionService';
import {green, orange} from '../../component/common/LMStyle';
import moment from 'moment';
import convert from 'ether-converter';


export const TransactionAction = {
    add,
    list
};
function add(data) {
    return async dispatch => {
        dispatch(RequestConstant(TransactionConstant.ADD_TRANSACTION_REQUEST, data));
        const result = await TransactionService.add(data);
        dispatch(ResponseConstant(TransactionConstant.ADD_TRANSACTION_SUCCESS, TransactionConstant.ADD_TRANSACTION_FAILURE, result));
        return result;
    };
}

function list(address) {
    return async dispatch => {
        dispatch(RequestConstant(TransactionConstant.LIST_TRANSACTION_REQUEST, {}));
        const transactions = await TransactionService.list({address});
        transactions.map((transaction) => {
            transaction.sentOrReceived = transaction.from.toUpperCase() == address.toUpperCase() ? 'Sent' : 'Received';
            transaction.status = transaction.txreceipt_status == '0' ? 'Pending' : 'Confirmed';
            transaction.color = transaction.txreceipt_status == '0' ? orange : green;
            transaction.icon = transaction.from.toUpperCase() == address.toUpperCase() ? require('../../../assets/send.png') : require('../../../assets/receive.png');
            transaction.date = moment(transaction.timeStamp,'X').format('MMMM Do YYYY, h:mm:ss a');
            transaction.etherValue = convert(transaction.value, 'wei').ether;
            transaction.etherGasValue = convert(transaction.gasPrice*transaction.gas, 'wei').ether;
        });
        const result = {
            success : true ,
            data : transactions
        }
        dispatch(ResponseConstant(TransactionConstant.LIST_TRANSACTION_SUCCESS, TransactionConstant.LIST_TRANSACTION_FAILURE, result));
        return result;
    };
}
