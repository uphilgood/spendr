import React, { useState, useEffect } from 'react';
import PlaidLinkButton from 'react-plaid-link-button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getAccounts, addAccount } from '../../actions/accountActions';
import Accounts from './Accounts';
import Spinner from './Spinner';

const Dashboard = ({ getAccounts, logoutUser, auth, plaid }) => {
    const [loaded, setLoaded] = useState();
    const { user } = auth;
    const { accounts, accountsLoading } = plaid;

    useEffect(() => {
        getAccounts();
    }, []);

    // Logout
    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    };

    // Add account
    const handleOnSuccess = (token, metadata) => {
        const plaidData = {
            public_token: token,
            metadata: metadata,
        };
        addAccount(plaidData);
    };

    let dashboardContent;

    if (accounts === null || accountsLoading) {
        dashboardContent = <Spinner />;
    } else if (accounts.length > 0) {
        // User has accounts linked
        dashboardContent = <Accounts user={user} accounts={accounts} />;
    } else {
        // User has no accounts linked
        dashboardContent = (
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b>Welcome,</b> {user.name.split(' ')[0]}
                    </h4>
                    <p className="flow-text grey-text text-darken-1">
                        To get started, link your first bank account below
                    </p>
                    <div>
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
                    </div>
                    <button
                        onClick={onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn">
                        Logout
                    </button>
                </div>
            </div>
        );
    }
    return <div className="container">{dashboardContent}</div>;
};
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getAccounts: PropTypes.func.isRequired,
    addAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    plaid: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    plaid: state.plaid,
});
export default connect(
    mapStateToProps,
    { logoutUser, getAccounts, addAccount }
)(Dashboard);
