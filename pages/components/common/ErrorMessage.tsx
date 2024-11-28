import { Typography } from '@material-ui/core';
import * as React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>
      <Typography color="error">{message}</Typography>
    </div>
  );
};
