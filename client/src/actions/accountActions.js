import axios from 'axios';
import {
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    GET_ACCOUNTS,
    ACCOUNTS_LOADING,
    GET_TRANSACTIONS,
    TRANSACTIONS_LOADING,
    SET_SPENDR_LIMIT,
} from './types';

// Actions will go here
// Add account
export const addAccount = plaidData => dispatch => {
    const accounts = plaidData.accounts;
    axios
        .post('/api/plaid/accounts/add', plaidData)
        .then(res =>
            dispatch({
                type: ADD_ACCOUNT,
                payload: res.data,
            })
        )
        .then(data => (accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null))
        .catch(err => console.log(err));
};

// Delete account
export const deleteAccount = plaidData => dispatch => {
    if (window.confirm('Are you sure you want to remove this account?')) {
        const id = plaidData.id;
        const newAccounts = plaidData.accounts.filter(account => account._id !== id);
        axios
            .delete(`/api/plaid/accounts/${id}`)
            .then(res =>
                dispatch({
                    type: DELETE_ACCOUNT,
                    payload: id,
                })
            )
            .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
            .catch(err => console.log(err));
    }
};

// Get all accounts for specific user
export const getAccounts = () => dispatch => {
    dispatch(setAccountsLoading());
    axios
        .get('/api/plaid/accounts')
        .then(res =>
            dispatch({
                type: GET_ACCOUNTS,
                payload: res.data,
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ACCOUNTS,
                payload: null,
            })
        );
};
// Accounts loading
export const setAccountsLoading = () => {
    return {
        type: ACCOUNTS_LOADING,
    };
};

// Get Transactions
export const getTransactions = (plaidData, type, full = true, dateRange) => async dispatch => {
    dispatch(setTransactionsLoading());
    const transactions = await axios
        .post('/api/plaid/accounts/transactions', { plaidData, dateRange })
        .then(data => data)
        .catch(err =>
            dispatch({
                type: GET_TRANSACTIONS,
                payload: null,
            })
        );

    const filteredTransactions = transactions.data.filter(data => data.accountName === type);
    dispatch({
        type: GET_TRANSACTIONS,
        payload: full ? transactions.data : filteredTransactions,
    });
};
// Transactions loading
export const setTransactionsLoading = () => {
    return {
        type: TRANSACTIONS_LOADING,
    };
};

// Set Spendr limit
export const setSpendrLimit = (userId, limit) => async dispatch => {
    await axios.post('/api/spendrLimit/add', { userId, limit }).then(res =>
        dispatch({
            type: SET_SPENDR_LIMIT,
            payload: res.data,
        })
    );
};

// Get Spendr limit
export const getSpendrLimit = userId => async dispatch => {
    const limit = await axios
        .get(`/api/spendrLimit/limit/${userId}`)
        .then(res => res)
        .catch(err => console.log(err));

    return dispatch({
        type: SET_SPENDR_LIMIT,
        payload: limit.data,
    });
};
