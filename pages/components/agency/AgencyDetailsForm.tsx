import * as React from 'react';
import { Field, Form, useFormikContext } from 'formik';
import { Button, Box, Typography } from '@material-ui/core';
import FormInput from '../common/FormInput';
import isEmpty from 'lodash/isEmpty';

const AgencyDetailsForm: React.FC = () => {
  const { dirty, isValid } = useFormikContext();

  const validateRequiredField = (value) => {
    if (!value || (Array.isArray(value) && isEmpty(value))) {
      return (
        <Box>
          <Typography color="error">Обов'язкове поле</Typography>
        </Box>
      );
    }
  };

  return (
    <Form>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" width={600}>
          <Box mb={2}>
            <Typography variant="h6">Назва</Typography>
            <Field
              required
              id="name"
              name="name"
              placeholder="Назва агенції"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Опис</Typography>
            <Field
              required
              id="description"
              name="description"
              placeholder="Опис агенції"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Номер телефону</Typography>
            <Field
              required
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Номер телефону агенції"
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
            Зберегти зміни
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default AgencyDetailsForm;
