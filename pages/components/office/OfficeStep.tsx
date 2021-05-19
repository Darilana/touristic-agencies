import * as React from 'react';
import { Formik } from 'formik';
import { Box, Typography } from '@material-ui/core';
import { Office } from '../../../src/office/office.entity';
import axios from 'axios';
import SnackbarMessage from '../common/SnackBarMessage';
import { useRouter } from 'next/router';
import OfficeForm from './OfficeForm';

interface OfficeStepProps {
  office?: Office;
  index?: number;
  agencyId?: number;
}

interface OfficeStepValues {
  address: string;
  workingHours: string;
  phoneNumber: string;
}

const OfficeStep: React.FC<OfficeStepProps> = ({ office, index, agencyId }) => {
  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    alertText: '',
    alertSeverity: '',
  });

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  const deleteOffice = (office) => {
    axios.delete(`http://localhost:3000/api/office/${office.id}`);
    refreshData();
  };

  const initialValues = {
    address: office?.address || '',
    workingHours: office?.workingHours || '',
    phoneNumber: office?.phoneNumber || '',
  };

  const onSubmit = (values: OfficeStepValues) => {
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
      {typeof index === 'number' && (
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">Офіс №{index + 1}</Typography>
        </Box>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <OfficeForm office={office} deleteOffice={deleteOffice} />
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

export default OfficeStep;
