import React from 'react';

const AccountItems = ({ accounts, callback }) => {
    return accounts.map(account => (
        <li key={account._id} style={{ marginTop: '1rem' }}>
            <button
                style={{ marginRight: '1rem' }}
                onClick={() => callback(account._id)}
                className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3">
                <i className="material-icons">delete</i>
            </button>
            <b>{account.institutionName}</b>
        </li>
    ));
};

export default AccountItems;