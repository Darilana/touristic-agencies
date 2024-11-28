import * as React from 'react';
import { Formik } from 'formik';
import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import SnackbarMessage, { SnackbarState } from '../common/SnackBarMessage';
import { useRouter } from 'next/router';
import OfficeForm from './OfficeForm';
import { Office } from 'src/office/office.entity';

interface OfficeStepProps {
  office?: Office;
  index?: number;
  agencyId?: number;
}

const OfficeStep: React.FC<OfficeStepProps> = ({ office, index, agencyId }) => {
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    isOpen: false,
    alertText: '',
  });

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  const deleteOffice = (office: Office) => {
    axios.delete(`http://localhost:3000/api/office/${office.id}`);
    refreshData();
  };

  const initialValues = {
    address: office?.address || '',
    workingHours: office?.workingHours || '',
    phoneNumber: office?.phoneNumber || '',
  };

  const onSubmit = (
    values: Pick<Office, 'address' | 'workingHours' | 'phoneNumber'>,
  ) => {
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
          alertText: 'Changes were successfully saved',
          alertSeverity: 'success',
        });
        refreshData();
      })
      .catch(() => {
        setSnackbarState({
          isOpen: true,
          alertText: 'An error occurred while saving changes',
          alertSeverity: 'error',
        });
      });
  };

  return (
    <Box mt={4}>
      {typeof index === 'number' && (
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">Office №{index + 1}</Typography>
        </Box>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <OfficeForm office={office} deleteOffice={deleteOffice} />
      </Formik>
      <SnackbarMessage
        snackbarState={snackbarState}
        onClose={onSnackbarClose}
      />
    </Box>
  );
};

export default OfficeStep;
