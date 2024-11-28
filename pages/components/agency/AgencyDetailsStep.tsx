import * as React from 'react';
import { Agency } from '../../../src/agency/agency.entity';
import { Formik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import AgencyDetailsForm from './AgencyDetailsForm';
import { SnackbarState } from '../common/SnackBarMessage';

interface AgencyDetailsStepProps {
  agency?: Agency;
  setSnackbarState: (snackbarState: SnackbarState) => void;
}

const AgencyDetailsStep: React.FC<AgencyDetailsStepProps> = ({
  agency,
  setSnackbarState,
}) => {
  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const initialValues = {
    name: agency?.name || '',
    description: agency?.description || '',
    phoneNumber: agency?.phoneNumber || '',
  };

  const onSubmit = (
    values: Pick<Agency, 'name' | 'description' | 'phoneNumber'>,
  ) => {
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <AgencyDetailsForm />
    </Formik>
  );
};

export default AgencyDetailsStep;
