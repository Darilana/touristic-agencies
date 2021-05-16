import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, Box, Typography } from '@material-ui/core';
import FormInput from './FormInput';
import { Office } from '../../src/office/office.entity';
import axios from 'axios';
import SnackbarMessage from './SnackBarMessage';
import { useRouter } from 'next/router';

interface Props {
  office?: Office;
  index?: number;
  agencyId?: number;
}

const OfficeForm: React.FC<Props> = ({ office, index, agencyId }) => {
  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    alertText: '',
    alertSeverity: '',
  });

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  const initialValues = {
    address: office?.address || '',
    workingHours: office?.workingHours || '',
    phoneNumber: office?.phoneNumber || undefined,
  };
  console.log('office', office);

  const onSubmit = (values) => {
    const operation = office
      ? axios.put(`http://localhost:3000/api/office/${office.id}`, {
          ...values,
          id: office.id,
        })
      : axios.post(`http://localhost:3000/api/office`, {
          ...values,
          agencyId: agencyId,
        });

    operation
      .then(() => {
        setSnackbarState({
          isOpen: true,
          alertText: 'Зміни було успішно збережено',
          alertSeverity: 'success',
        });
        refreshData();
      })
      .catch((e) => {
        setSnackbarState({
          isOpen: true,
          alertText: 'Сталася помилка',
          alertSeverity: 'error',
        });
      });
  };

  return (
    <Box mt={4}>
      {typeof index === "number" && (
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">Офіс №{index + 1}</Typography>
        </Box>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                />
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Номер телефону</Typography>
                <Field
                  required
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Номер телефону офісу"
                  component={FormInput}
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
              >
                {office ? 'Зберегти зміни' : 'Додати'}
              </Button>
            </Box>
          </Box>
        </Form>
      </Formik>
      <SnackbarMessage
        isOpen={snackbarState.isOpen}
        onClose={onSnackbarClose}
        alertText={snackbarState.alertText}
        alertSeverity={snackbarState.alertSeverity}
      />
    </Box>
  );
};

export default OfficeForm;
