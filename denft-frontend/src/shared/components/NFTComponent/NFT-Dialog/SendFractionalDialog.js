import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import InfoDialogCointainer from './InfoDialogCointainer';
import { SEND_FRACTIONAL_DIALOGUE } from './DialogNames';
import { Button, DialogActions, TextField } from '@mui/material';

const SendDialog = ({
  currentDialogNames,
  closeDialog,
  updateToken,
  ID,
  handleAddress,
  handlePrice,
  sendFractional,
  vaultID,
  index,
  submit
}) => (
  <Dialog
    open={currentDialogNames.includes(SEND_FRACTIONAL_DIALOGUE)}
    onClose={() => {
      closeDialog(SEND_FRACTIONAL_DIALOGUE);
    }}
    className="custom-dialog custom-content-style"
  >
    <DialogTitle className="dialog-title">
      <div className='heading-button'>
        Transfer NFT#{ID}
        <IconButton
          onClick={() => {
            closeDialog(SEND_FRACTIONAL_DIALOGUE);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="address"
        label="Receipient Address"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleAddress}
      />
      <TextField
        margin="dense"
        id="address"
        label="Amount"
        type="text"
        fullWidth
        variant="standard"
        onChange={handlePrice}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        closeDialog(SEND_FRACTIONAL_DIALOGUE);
        updateToken(undefined);
      }}>Cancel</Button>
      <Button onClick={() => {
        sendFractional(vaultID[index]);
      }}>Transfer</Button>
    </DialogActions>
  </Dialog>
);

export default SendDialog;
