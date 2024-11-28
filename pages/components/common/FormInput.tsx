import { TextField } from '@material-ui/core';
import * as React from 'react';

const FormInput = ({ field, form: { touched, errors }, ...props }) => {
  const isErrorDisplayed = Boolean(errors[field.name] && touched[field.name]);

  return (
    <div>
      <TextField
        error={isErrorDisplayed}
        fullWidth
        id={field.name}
        variant="outlined"
        {...field}
        {...props}
      />

      {isErrorDisplayed && <div className="error">{errors[field.name]}</div>}
    </div>
  );
};

export default FormInput;
