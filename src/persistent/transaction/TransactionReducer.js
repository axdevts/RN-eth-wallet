import {TransactionConstant} from './TransactionConstant';

const initialState = {
    status: '',
    data: {
        transactions: [],
    },
    error: {},
};

export function TransactionReducer(state = initialState, action) {
    switch (action.type) {
        case TransactionConstant.ADD_TRANSACTION_SUCCESS:
            return {
                status: TransactionConstant.ADD_TRANSACTION_SUCCESS,
                data: {...state.data, ...{transactions: [...state.data.transactions,action.data]}},
                error: {},
            };
        case TransactionConstant.LIST_TRANSACTION_SUCCESS:
            return {
                status: TransactionConstant.LIST_TRANSACTION_SUCCESS,
                data: {...state.data, ...{transactions: action.data}},
                error: {},
            };
        default:
            return state;
    }
}
