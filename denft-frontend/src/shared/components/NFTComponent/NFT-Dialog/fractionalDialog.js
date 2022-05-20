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
import { FRACTIONAL_DIALOGUE } from './DialogNames';
import { closeDialog } from '../../../../modules/dashboard/redux/actions';
import { noop } from '../../../../utils';
import { Button, DialogActions, TextField } from '@mui/material';

const CreatePoolDialog = props => (
  <Dialog
    open={props.currentDialogNames.includes(FRACTIONAL_DIALOGUE)}
    onClose={() => {
      props.closeDialog(FRACTIONAL_DIALOGUE);
      props.updateToken(undefined);
    }}
    className="custom-dialog"
  >
    <DialogTitle className="dialog-title">
      <div className='heading-button'>
        Fractional NFT#{props.ID}
        <IconButton
          onClick={() => {
            props.closeDialog(FRACTIONAL_DIALOGUE);
            props.updateToken(undefined);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </DialogTitle>
    <DialogContent className='content-container'>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        required
        label="Token Name"
        type="text"
        className='fractional-textfield'
        variant="standard"
        onChange={props.handleName}
      />
      <TextField
        margin="dense"
        id="symbol"
        required
        label="Symbol"
        type="text"
        className='fractional-textfield'
        variant="standard"
        onChange={props.handleSymbol}
      />
      <TextField
        margin="dense"
        id="totalSupply"
        required
        label="Total Supply"
        type="number"
        fullWidth
        variant="standard"
        onChange={props.handleSupply}
      />
      <TextField
        autoFocus
        margin="dense"
        id="price"
        required
        label="List Price"
        type="number"
        fullWidth
        variant="standard"
        onChange={props.handleListPrice}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        props.closeDialog(FRACTIONAL_DIALOGUE);
        props.updateToken(undefined);
      }}>Cancel</Button>
      <Button onClick={props.FractionalNFT}>Fractional</Button>
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
