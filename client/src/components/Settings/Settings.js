import React, { useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import InputFormWithButton from '../dashboard/components/InputFormWithButton';
import {
    setSpendrLimit,
} from '../../actions/accountActions';

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
