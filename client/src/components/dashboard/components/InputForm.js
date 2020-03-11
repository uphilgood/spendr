import React from 'react';
import { InputLabel, Input, InputAdornment, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const InputForm = ({ placeholder, inputLabel, inputValue, setInputValue }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.margin} >
            <InputLabel htmlFor="standard-adornment-amount">{inputLabel}</InputLabel>
            <Input
                disableUnderline={true}
                placeholder={placeholder}
                id="standard-adornment-amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControl>
    )
}

export default InputForm;