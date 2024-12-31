import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, message, title = "Xác nhận" }) => {
    return (
        <Dialog open={open} onClose={onClose} style={{top: "-80%"}}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
