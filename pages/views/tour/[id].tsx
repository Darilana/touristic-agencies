import * as React from 'react';
import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import { Tour } from '../../../src/tour/tour.entity';
import TourDetailsForm from '../../components/TourDetailsForm';
import { Box, Typography } from '@material-ui/core';
import SnackbarMessage from '../../components/SnackBarMessage';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import moment from 'moment';

interface Props {
  tour: Tour;
}

const TourDetails: NextPage<Props> = ({ tour }) => {
  const [snackbarState, setSnackbarState] = React.useState({
    isOpen: false,
    alertText: '',
    alertSeverity: '',
  });

  const initialValues = {
    name: tour?.name || '',
    description: tour?.description || '',
    duration: moment.duration(tour?.duration).asDays() || 0,
    price: tour?.price || undefined,
    directions: tour?.directions.map((direction) => direction.name) || [],
    categories: tour?.categories.map((category) => category.name) || [],
  };

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const onSubmit = (values) => {
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

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  return (
    <Box mb={4}>
      <Box mt={4} mb={2} display="flex" justifyContent="center">
        <Typography variant="h5" color="textSecondary">
          Деталі туру
        </Typography>
      </Box>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TourDetailsForm tour={tour} />
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

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.req.params;
  console.log(ctx.req.headers.authorization);
  const props: Props = {
    tour: (
      await axios.get(`http://localhost:3000/api/tour/${id}`, {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
  };

  return { props };
}

export default TourDetails;
