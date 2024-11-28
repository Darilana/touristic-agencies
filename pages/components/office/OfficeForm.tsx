import * as React from 'react';
import { Field, Form, useFormikContext } from 'formik';
import { Button, Box, Typography } from '@material-ui/core';
import FormInput from '../common/FormInput';
import { Office } from '../../../src/office/office.entity';
import isEmpty from 'lodash/isEmpty';

interface OfficeFormProps {
  deleteOffice: (office: Office) => void;
  office?: Office;
}

const OfficeForm: React.FC<OfficeFormProps> = ({ office, deleteOffice }) => {
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
            <Typography variant="h6">Address</Typography>
            <Field
              required
              id="address"
              name="address"
              placeholder="Office address"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Working hours</Typography>
            <Field
              required
              id="workingHours"
              name="workingHours"
              placeholder="Office availability hours"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Phone number</Typography>
            <Field
              required
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Office phone number"
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
            {office ? 'Save changes' : 'Add office'}
          </Button>
          {office && (
            <>
              <Box mt={3} />
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={() => deleteOffice(office)}
              >
                Delete office
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Form>
  );
};

export default OfficeForm;
