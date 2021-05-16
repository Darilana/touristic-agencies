import * as React from 'react';
import { Agency } from '../../src/agency/agency.entity';
import { Formik, Field, Form } from 'formik';
import { Button, Box, Typography } from '@material-ui/core';
import FormInput from './FormInput';
import axios from 'axios';
import SnackbarMessage from './SnackBarMessage';
import { useRouter } from 'next/router';

interface Props {
  agency?: Agency;
}

const AgencyDetailsForm: React.FC<Props> = ({ agency }) => {
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
    name: agency?.name || '',
    description: agency?.description || '',
    phoneNumber: agency?.phoneNumber || undefined,
  };

  const onSubmit = (values) => {
    const operation = agency
      ? axios.put(`http://localhost:3000/api/agency/${agency.id}`, {
          ...values,
          id: agency.id,
        })
      : axios.post(`http://localhost:3000/api/agency`, {
          ...values,
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
    <Box>
      <Box mt={4} mb={2} display="flex" justifyContent="center">
        <Typography variant="h5" color="textSecondary">
          Деталі
        </Typography>
      </Box>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                />
              </Box>
              <Box mb={2}>
                <Typography variant="h6">Номер телефону</Typography>
                <Field
                  required
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Номер телефону агенції"
                  component={FormInput}
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
              >
                Зберегти зміни
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

export default AgencyDetailsForm;
