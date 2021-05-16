import { Box, TextField } from '@material-ui/core';
import * as React from 'react';

const FormInput = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  console.log('field', field);
  return (
    <Box>
      <TextField
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
