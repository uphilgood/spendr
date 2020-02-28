import React, { useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import InputFormWithButton from '../dashboard/components/InputFormWithButton';
import {
    setSpendrLimit,
} from '../../actions/accountActions';

// TODO:  
// 1.  need to refactor this page, the InputFormWithButton component doesn't make sense.  whole page should be form
// 2.  need to wire up db schema to add start/end date for budget
// 3.  dashboard should fetch user start/end date when component mounts then use those dates to fetch transactions

const Settings = ({ userId, setSpendrLimit }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const onChangeStart = date => setStartDate(date)
    const onEndStart = date => setEndDate(date)

    return (
        <div style={{ display: 'block', textAlign: 'center' }} >
            <div>
                <h4>
                    <b>Select beginning time frame</b>
                </h4>
                <DatePicker
                    onChange={onChangeStart}
                    value={startDate}
                />
            </div>
            <div>
                <h4>
                    <b>Select End time frame</b>
                </h4>
                <DatePicker
                    onChange={onEndStart}
                    value={endDate}
                />
            </div>

            <InputFormWithButton
                userId={userId}
                handleClick={setSpendrLimit}
                placeholder={'Set Max Limit'}
                buttonText={'Set Limit'}
                buttonIcon={'send'}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.auth.user.id,
});
export default connect(
    mapStateToProps,
    { setSpendrLimit }
)(Settings);
