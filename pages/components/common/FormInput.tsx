import { Box, TextField } from '@material-ui/core';
import * as React from 'react';

const FormInput = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <Box>
      <TextField
        error={!!(errors[field.name] && touched[field.name])}
        fullWidth
        id={field.name}
        variant="outlined"
        {...field}
        {...props}
      />

      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </Box>
  );
};

export default FormInput;
