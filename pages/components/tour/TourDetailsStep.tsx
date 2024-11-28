import * as React from 'react';
import axios from 'axios';
import { Tour } from '../../../src/tour/tour.entity';
import TourDetailsForm from './TourDetailsForm';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Agency } from '../../../src/agency/agency.entity';
import { SnackbarState } from '../common/SnackBarMessage';

interface TourDetailsStepProps {
  tour?: Tour;
  setSnackbarState: (snackbarState: SnackbarState) => void;
  agencies?: Agency[];
}

export interface TourDetailsStepValues {
  name: string;
  description: string;
  duration: number;
  price: number;
  directions: string[];
  categories: string[];
  image: string;
  agencyId: number;
}

const TourDetailsStep: React.FC<TourDetailsStepProps> = ({
  tour,
  setSnackbarState,
  agencies,
}) => {
  const initialValues = {
    name: tour?.name || '',
    description: tour?.description || '',
    duration: moment.duration(tour?.duration).asDays() || 0,
    price: tour?.price || 0,
    directions: tour?.directions.map((direction) => direction.name) || [],
    categories: tour?.categories.map((category) => category.name) || [],
    image: tour?.image || '',
  };

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const onSubmit = (values: TourDetailsStepValues) => {
    const directions = values.directions.map((direction) => ({
      name: direction,
    }));
    const categories = values.categories.map((category) => ({
      name: category,
    }));
    const duration = moment.duration(values.duration, 'days').toISOString();

    const operation = tour
      ? axios.put(`http://localhost:3000/api/tour/${tour.id}`, {
          ...values,
          id: tour.id,
          directions,
          categories,
          duration,
        })
      : axios.post(`http://localhost:3000/api/tour`, {
          ...values,
          directions,
          categories,
          duration,
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
      <TourDetailsForm tour={tour} agencies={agencies} />
    </Formik>
  );
};

export default TourDetailsStep;
