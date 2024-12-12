import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Notification = ({
                          open,
                          message,
                          onClose,
                          autoHideDuration = 3000,
                          anchorOrigin = {vertical: 'top', horizontal: 'right'},
                          error = true
                      }) => {
    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            onClose={onClose}
            autoHideDuration={autoHideDuration}
        >
            {error ? (<Alert severity="success" onClose={onClose}>
                {message}
            </Alert>) : (<Alert severity="error" onClose={onClose}>
                {message}
            </Alert>)}
        </Snackbar>
    );
};

export default Notification;
