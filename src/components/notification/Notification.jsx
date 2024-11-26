import React from 'react';
import Snackbar from '@mui/material/Snackbar';

const Notification = ({ open, message, onClose, autoHideDuration = 3000, anchorOrigin = { vertical: 'top', horizontal: 'right' } }) => {
    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            onClose={onClose}
            message={message}
            autoHideDuration={autoHideDuration}
        />
    );
};

export default Notification;
