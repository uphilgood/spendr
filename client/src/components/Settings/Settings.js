import React, { useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import InputFormWithButton from '../dashboard/components/InputFormWithButton';
import { Button, Icon } from '@material-ui/core';
import {
    setSpendrLimit,
} from '../../actions/accountActions';

// TODO:  
// 1. DONE - need to refactor this page, the InputFormWithButton component doesn't make sense.  whole page should be form
// 2.  need to wire up db schema to add start/end date for budget
// 3.  dashboard should fetch user start/end date when component mounts then use those dates to fetch transactions

const Settings = ({ userId, setSpendrLimit, plaid }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [inputValue, setInputValue] = useState('')
    const onChangeStart = date => setStartDate(date)
    const onEndStart = date => setEndDate(date)
    const { limit } = plaid;

    return (
        <div style={{ display: 'grid', marginLeft: 'auto', marginRight: 'auto', marginTop: '25px', maxWidth: '300px', textAlign: 'center' }}>
            <div style={{ maxWidth: '300px' }} >
                <span>
                    <b>Select beginning time frame</b>
                </span>
                <DatePicker
                    onChange={onChangeStart}
                    value={startDate}
                />
            </div>
            <div style={{ marginTop: '25px' }} >
                <span>
                    <b>Select End time frame</b>
                </span>
                <DatePicker
                    onChange={onEndStart}
                    value={endDate}
                />
            </div>

            <InputFormWithButton
                userId={userId}
                setInputValue={setInputValue}
                inputValue={inputValue}
                placeholder={limit ? limit : 'Set Max Limit'}
                buttonText={'Set Limit'}
            />
            <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>{'send'}</Icon>}
                onClick={() => setSpendrLimit(userId, inputValue)}
            >
                Set Limit
            </Button>

        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    plaid: state.plaid,
});
export default connect(
    mapStateToProps,
    { setSpendrLimit }
)(Settings);
