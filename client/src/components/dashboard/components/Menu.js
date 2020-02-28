import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{
            width: '85%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            fontFamily: "monospace"
        }}>
            <Button style={{ width: '100px', fontSize: '16px' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Menu
      </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/settings">
                    <MenuItem onClick={handleClose}>My Account Settings</MenuItem>
                </Link>
                <Link to="/dashboard">
                    <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                </Link>
            </Menu>
        </div>
    );
}