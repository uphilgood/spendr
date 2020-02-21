import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlaidLinkButton from 'react-plaid-link-button';
import { connect } from 'react-redux';
import TransactionsTable from './components/TransactionsTable';
import CircleProgress from './components/CircleProgress';
import {
    getTransactions,
    addAccount,
    deleteAccount,
    setSpendrLimit,
    getSpendrLimit,
} from '../../actions/accountActions';
import { logoutUser } from '../../actions/authActions';

const Accounts = props => {
    const {
        accounts,
        getTransactions,
        user,
        plaid,
        addAccount,
        deleteAccount,
        logoutUser,
        userId,
        setSpendrLimit,
        getSpendrLimit,
    } = props;
    const { transactions, transactionsLoading, limit } = plaid;
    const [loaded, setLoaded] = useState();

    useEffect(() => {
        getTransactions(accounts);

        // getSpendrLimit needs to go here
        // setSpendrLimit(userId, 6500);
    }, []);

    useEffect(() => {
        getSpendrLimit(userId);
    }, [limit]);

    const maxLimit = limit.maxLimit;

    const handleOnSuccess = (token, metadata) => {
        const plaidData = {
            public_token: token,
            metadata: metadata,
            accounts: accounts,
        };
        addAccount(plaidData);
    };
    // Delete account
    const onDeleteClick = id => {
        const accountData = {
            id: id,
            accounts: accounts,
        };
        deleteAccount(accountData);
    };
    // Logout
    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    const accountItems = accounts.map(account => (
        <li key={account._id} style={{ marginTop: '1rem' }}>
            <button
                style={{ marginRight: '1rem' }}
                onClick={() => onDeleteClick(account._id)}
                className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3">
                <i className="material-icons">delete</i>
            </button>
            <b>{account.institutionName}</b>
        </li>
    ));

    const totalAmount = transactions => {
        let total = 0;
        transactions.forEach(item => {
            if (item.category !== 'Transfer') {
                return (total += item.amount);
            }
        });
        return Math.round(total);
    };

    let transactionsData = [];
    transactions.forEach(function(account) {
        account.transactions.forEach(function(transaction) {
            transactionsData.push({
                account: account.accountName,
                date: transaction.date,
                category: transaction.category[0],
                name: transaction.name,
                amount: transaction.amount,
            });
        });
    });

    return (
        <div className="row">
            <div className="col s12">
                <button onClick={onLogoutClick} className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Log Out
                </button>
                <h4>
                    <b>Welcome!</b>
                </h4>

                <p className="grey-text text-darken-1">Hey there, {user.name.split(' ')[0]}</p>

                <h5>
                    <b>Linked Accounts</b>
                </h5>
                <p className="grey-text text-darken-1">Add or remove your bank accounts below</p>
                <ul>{accountItems}</ul>
                <PlaidLinkButton
                    buttonProps={{
                        className: 'btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn',
                    }}
                    plaidLinkProps={{
                        clientName: 'Spendr',
                        key: 'ae73a3cf3798574add046b11f92aba',
                        env: 'development',
                        product: ['transactions'],
                        onSuccess: handleOnSuccess,
                    }}
                    onScriptLoad={() => setLoaded(true)}>
                    Link Account
                </PlaidLinkButton>
                <button onClick={() => setSpendrLimit(userId, 6500)}>set new limit</button>

                <hr style={{ marginTop: '2rem', opacity: '.2' }} />
                <h5>
                    <b>Transactions</b>
                </h5>
                {transactionsLoading ? (
                    <p className="grey-text text-darken-1">Fetching transactions...</p>
                ) : (
                    <>
                        <p className="grey-text text-darken-1">
                            You have <b>{transactionsData.length}</b> transactions from your
                            <b> {accounts.length}</b> linked
                            {accounts.length > 1 ? <span> accounts </span> : <span> account </span>}
                            from the past 30 days
                        </p>

                        <h3> You have spent </h3>
                        <h4>{`$${totalAmount(transactionsData)}`}</h4>
                        <h3> You're monthly limit is </h3>
                        <h4>{`$${maxLimit}`}</h4>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '350px',
                                height: '200px',
                            }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ marginRight: '15px' }}>
                                    <CircleProgress
                                        value={totalAmount(transactionsData)}
                                        maxValue={maxLimit}
                                        text={`${Math.round((totalAmount(transactionsData) / maxLimit) * 100)}`}
                                    />
                                </div>
                                <div style={{ marginLeft: '15px' }}>
                                    <CircleProgress
                                        value={totalAmount(transactionsData)}
                                        maxValue={maxLimit}
                                        text={`${Math.round((totalAmount(transactionsData) / maxLimit) * 100)}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <TransactionsTable transactionsData={transactionsData} />
                    </>
                )}
            </div>
        </div>
    );
};
Accounts.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getTransactions: PropTypes.func.isRequired,
    addAccount: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
    plaid: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    plaid: state.plaid,
    userId: state.auth.user.id,
});
export default connect(
    mapStateToProps,
    { logoutUser, getTransactions, addAccount, deleteAccount, setSpendrLimit, getSpendrLimit }
)(Accounts);
