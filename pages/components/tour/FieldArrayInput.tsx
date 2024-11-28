import * as React from 'react';
import { Field, FieldArray, FormikErrors } from 'formik';
import ChipInput from 'material-ui-chip-input';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEqual';
import { Typography } from '@material-ui/core';
import { TourDetailsStepValues } from './TourDetailsStep';

interface FieldArrayInputProps {
  id: string;
  name: string;
  placeholder: string;
  initialValues: string[];
  values: string[];
  errors: FormikErrors<TourDetailsStepValues>;
}

export const FieldArrayInput: React.FC<FieldArrayInputProps> = ({
  id,
  name,
  placeholder,
  initialValues,
  values,
  errors,
}) => {
  const validateRequiredField = (value: string | number | string[]) => {
    if (isEmpty(value)) {
      return (
        <div>
          <Typography color="error">This field is required</Typography>
        </div>
      );
    }
  };

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <>
          <Field
            required
            id={id}
            name={name}
            placeholder={placeholder}
            validate={validateRequiredField}
            onBlur={validateRequiredField}
            component={() => (
              <ChipInput
                fullWidth
                value={values}
                onAdd={(chip) => arrayHelpers.push(chip)}
                onDelete={(chip) => arrayHelpers.remove(chip)}
              />
            )}
          />
          {errors[id] && !isEqual(initialValues, values) ? (
            <div>{errors[id]}</div>
          ) : null}
        </>
      )}
    />
  );
};
