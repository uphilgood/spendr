import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlaidLinkButton from 'react-plaid-link-button';
import { connect } from 'react-redux';
import TransactionsTable from './components/TransactionsTable';
import CircleProgress from './components/CircleProgress';
import FlatButton from './components/FlatButton';
import AccountItems from './components/AccountItems';
import CardImageRenderer from './components/CardImageRenderer';
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
        getSpendrLimit,
        dateRange,
    } = props;
    const { transactions, transactionsLoading, limit } = plaid;
    const [loaded, setLoaded] = useState();
    const [type, setType] = useState(accounts[0].institutionName);

    useEffect(() => {
        getTransactions(accounts, type, false, dateRange);
    }, [type]);

    useEffect(() => {
        getSpendrLimit(userId);
    }, [limit]);

    const maxLimit = limit;

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

    const totalAmount = transactions => {
        const total = transactions.reduce((acc, val) => acc + val.amount, 0);
        return total.toFixed(2);
    };

    let transactionsData = [];
    transactions.forEach(account => {
        account.transactions.forEach(transaction => {
            transaction.category[0] !== 'Transfer' &&
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
                <FlatButton onClick={onLogoutClick} icon={'keyboard_backspace'} text={'Log Out'} />
                <h4>
                    <b>Welcome!</b>
                </h4>

                <p className="grey-text text-darken-1">Hey there, {user.name.split(' ')[0]}</p>

                <h5>
                    <b>Linked Accounts</b>
                </h5>
                <p className="grey-text text-darken-1">Add or remove your bank accounts below</p>
                <ul>
                    <AccountItems accounts={accounts} callback={onDeleteClick} />
                </ul>
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

                <button

                    onClick={() => { }}
                    className="btn btn-large waves-effect waves-light hoverable light-green accent-3 ">
                    Track Manually
                    </button>

                <hr style={{ marginTop: '2rem', opacity: '.2' }} />
                <h5>
                    <b>Transactions</b>
                </h5>

                <p className="grey-text text-darken-1">
                    You have <b>{transactionsData.length}</b> transactions from your
                    <b> {accounts.length}</b> linked
                    {accounts.length > 1 ? <span> accounts </span> : <span> account </span>}
                    from the past 30 days
                </p>
                <p>
                    <span>
                        You have spent <b>{`$${totalAmount(transactionsData)}`}</b>
                    </span>
                </p>
                <p>
                    <span>
                        Your monthly limit is <b>{`$${maxLimit}`}</b>
                    </span>
                </p>
                <CardImageRenderer
                    accounts={accounts}
                    onClick={type => setType(type)}
                    transactions={transactionsData}
                />
                {/* <InputFormWithButton
                    userId={userId}
                    handleClick={setSpendrLimit}
                    inputLabel={'Set Max Limit'}
                    buttonText={'Set Limit'}
                    buttonIcon={'send'}
                /> */}
                {transactionsLoading ? (
                    <p className="grey-text text-darken-1">Fetching transactions...</p>
                ) : (
                        <>
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
                                    <CircleProgress
                                        value={totalAmount(transactionsData)}
                                        maxValue={maxLimit}
                                        text={`${Math.round((totalAmount(transactionsData) / maxLimit) * 100)}`}
                                    />
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
