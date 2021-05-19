import { Snackbar } from '@material-ui/core';
import * as React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

interface SnackbarMessageProps {
  isOpen: boolean;
  onClose: () => void;
  alertText: string;
  alertSeverity: string;
}

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  isOpen,
  onClose,
  alertText,
  alertSeverity,
}) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={alertSeverity}>
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
