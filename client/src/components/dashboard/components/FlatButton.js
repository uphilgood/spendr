import React from 'react';


const FlatButton = ({ onClick, icon, text }) => {

    return (
        <button onClick={onClick} className="btn-flat waves-effect">
            <i className="material-icons left">{icon}</i>
            {text}
        </button>
    )
}

export default FlatButton;
