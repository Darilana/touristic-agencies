import * as React from 'react';
import { Field, Form, useFormikContext } from 'formik';
import { Button, Box, Typography } from '@material-ui/core';
import FormInput from '../common/FormInput';
import isEmpty from 'lodash/isEmpty';

const AgencyDetailsForm: React.FC = () => {
  const { dirty, isValid } = useFormikContext();

  const validateRequiredField = (value: string | string[]) => {
    if (isEmpty(value)) {
      return (
        <div>
          <Typography color="error">This field is required</Typography>
        </div>
      );
    }
  };

  return (
    <Form>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" width={600}>
          <Box mb={2}>
            <Typography variant="h6">Name</Typography>
            <Field
              required
              id="name"
              name="name"
              placeholder="Agency name"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Description</Typography>
            <Field
              required
              id="description"
              name="description"
              placeholder="Agency description"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Phone number</Typography>
            <Field
              required
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Agency phone number"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            disabled={!dirty || !isValid}
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default AgencyDetailsForm;
