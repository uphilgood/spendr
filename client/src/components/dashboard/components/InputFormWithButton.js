import React, { useState } from 'react';
import { InputLabel, Input, InputAdornment, FormControl, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const InputFormWithButton = ({ userId, handleClick, placeholder, inputLabel, buttonText, buttonIcon }) => {
    const [inputValue, setInputValue] = useState('');
    const classes = useStyles();
    return (
        <div style={{ display: 'inline-grid', marginTop: '25px', maxWidth: '300px' }}>
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
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>{buttonIcon}</Icon>}
                onClick={() => handleClick(userId, inputValue)}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default InputFormWithButton;