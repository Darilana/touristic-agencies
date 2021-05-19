import * as React from 'react';
import { Agency } from '../../../src/agency/agency.entity';
import { Formik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import AgencyDetailsForm from './AgencyDetailsForm';

interface Props {
  agency?: Agency;
  setSnackbarState: ({ isOpen, alertText, alertSeverity }) => void;
}

export interface AgencyDetailsStepValues {
  name: string;
  description: string;
  phoneNumber: string;
}

const AgencyDetailsStep: React.FC<Props> = ({ agency, setSnackbarState }) => {
  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const initialValues = {
    name: agency?.name || '',
    description: agency?.description || '',
    phoneNumber: agency?.phoneNumber || '',
  };

  const onSubmit = (values: AgencyDetailsStepValues) => {
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <AgencyDetailsForm />
    </Formik>
  );
};

export default AgencyDetailsStep;
