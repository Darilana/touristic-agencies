import { Snackbar } from '@material-ui/core';
import * as React from 'react';
import MuiAlert, { Color } from '@material-ui/lab/Alert';

export interface SnackbarState {
  isOpen: boolean;
  alertText: string;
  alertSeverity?: Color;
}

interface SnackbarMessageProps {
  snackbarState: SnackbarState;
  onClose: () => void;
}

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  snackbarState,
  onClose,
}) => {
  const { isOpen, alertSeverity, alertText } = snackbarState;

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={alertSeverity}
      >
        {alertText}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarMessage;
