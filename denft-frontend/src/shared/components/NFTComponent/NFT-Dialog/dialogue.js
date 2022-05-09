import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';

const dialogue = ({
    getdata,
    data,
    handleAddress,
    closeForm,
    transferNFT,
    handlePrice,
    SellNFT,
}) => {
    return (
        <Dialog open={data.open} onClose={closeForm}>
            <DialogTitle>{data.title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label={data.textLabel}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={data.textLabel === "Receipient Address" ? handleAddress : handlePrice}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeForm}>Cancel</Button>
                <Button onClick={data.textLabel === "Receipient Address" ? transferNFT : SellNFT}>{data.textLabel === "Receipient Address" ? 'Transfer' : 'Sell'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default dialogue;