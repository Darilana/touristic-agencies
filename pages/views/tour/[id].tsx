import * as React from 'react';
import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import { Tour } from '../../../src/tour/tour.entity';
import TourDetailsStep from '../../components/tour/TourDetailsStep';
import { Box, Typography } from '@material-ui/core';
import SnackbarMessage, {
  SnackbarState,
} from '../../components/common/SnackBarMessage';

interface TourDetailsProps {
  tour: Tour;
}

const TourDetails: NextPage<TourDetailsProps> = ({ tour }) => {
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    isOpen: false,
    alertText: '',
  });

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  return (
    <Box mb={4}>
      <Box mt={4} mb={2} display="flex" justifyContent="center">
        <Typography variant="h5" color="textSecondary">
          Tour details
        </Typography>
      </Box>
      <TourDetailsStep tour={tour} setSnackbarState={setSnackbarState} />
      <SnackbarMessage
        snackbarState={snackbarState}
        onClose={onSnackbarClose}
      />
    </Box>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const params = Reflect.get(ctx.req, 'params');
  const props: TourDetailsProps = {
    tour: (
      await axios.get(`http://localhost:3000/api/tour/${params.id}`, {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
  };

  return { props };
}

export default TourDetails;
