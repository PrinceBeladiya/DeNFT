import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import InfoDialogCointainer from './InfoDialogCointainer';
import { SELL_DIALOGUE } from './DialogNames';
import { closeDialog } from '../../../../modules/dashboard/redux/actions';
import { noop } from '../../../../utils';
import { Button, DialogActions, TextField } from '@mui/material';

const CreatePoolDialog = props => (
  <Dialog
    open={props.currentDialogNames.includes(SELL_DIALOGUE)}
    onClose={() => {
      props.closeDialog(SELL_DIALOGUE);
      props.updateToken(undefined);
    }}
    className="custom-dialog custom-content-style"
  >
    <DialogTitle className="dialog-title">
      <div className='heading-button'>
        Sell NFT#{props.ID}
        <IconButton
          onClick={() => {
            props.closeDialog(SELL_DIALOGUE);
            props.updateToken(undefined);
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
        label="Amount of NFT (Ether)"
        type="text"
        fullWidth
        variant="standard"
        onChange={props.handlePrice}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        props.closeDialog(SELL_DIALOGUE);
        props.updateToken(undefined);
      }}>Cancel</Button>
      <Button onClick={props.sellNFT}>Sell</Button>
    </DialogActions>
  </Dialog>
);

CreatePoolDialog.propTypes = {
  currentDialogNames: PropTypes.arrayOf(PropTypes.string),
  closeDialog: PropTypes.func,
};

CreatePoolDialog.defaultProps = {
  currentDialogNames: [],
  closeDialog: noop,
};

const mapStateToProps = state => ({
  currentDialogNames: state.dashboard.currentDialogNames,
});

const mapDispatchToProps = dispatch => ({
  submit: formName => dispatch(submit(formName)),
  closeDialog: dialogName => dispatch(closeDialog(dialogName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoolDialog);
