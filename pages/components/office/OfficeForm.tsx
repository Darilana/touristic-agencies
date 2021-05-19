import * as React from 'react';
import { Field, Form, useFormikContext } from 'formik';
import { Button, Box, Typography } from '@material-ui/core';
import FormInput from '../common/FormInput';
import { Office } from '../../../src/office/office.entity';
import isEmpty from 'lodash/isEmpty';

interface Props {
  deleteOffice: (office: Office) => void;
  office?: Office;
}

const OfficeForm: React.FC<Props> = ({ office, deleteOffice }) => {
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
            <Typography variant="h6">Адреса</Typography>
            <Field
              required
              id="address"
              name="address"
              placeholder="Адреса офісу"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Час роботи</Typography>
            <Field
              required
              id="workingHours"
              name="workingHours"
              placeholder="Час роботи офісу"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Номер телефону</Typography>
            <Field
              required
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Номер телефону офісу"
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
            {office ? 'Зберегти зміни' : 'Додати'}
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
                Видалити офіс
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Form>
  );
};

export default OfficeForm;
