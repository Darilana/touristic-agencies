import * as React from 'react';
import axios from 'axios';
import { Agency } from '../../../src/agency/agency.entity';
import { NextPage, NextPageContext } from 'next';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import OfficeStep from '../../components/office/OfficeStep';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AgencyDetailsStep from '../../components/agency/AgencyDetailsStep';
import SnackbarMessage, {
  SnackbarState,
} from '../../components/common/SnackBarMessage';

interface AgencyDetailsProps {
  agency: Agency;
}

const AgencyDetails: NextPage<AgencyDetailsProps> = ({ agency }) => {
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    isOpen: false,
    alertText: '',
  });

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  return (
    <Box mb={4}>
      <Box mb={2} mt={4} display="flex" justifyContent="center">
        <Typography variant="h5" color="textSecondary">
          Agency details
        </Typography>
      </Box>
      <AgencyDetailsStep agency={agency} setSnackbarState={setSnackbarState} />
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h5" color="textSecondary">
          Offices
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add office</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OfficeStep agencyId={agency.id} />
          </AccordionDetails>
        </Accordion>
      </Box>
      {agency.offices.map((office, index) => (
        <OfficeStep key={office.id} office={office} index={index} />
      ))}
      <SnackbarMessage
        snackbarState={snackbarState}
        onClose={onSnackbarClose}
      />
    </Box>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const params = Reflect.get(ctx.req, 'params');
  const props: AgencyDetailsProps = {
    agency: (
      await axios.get(`http://localhost:3000/api/agency/${params.id}`, {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
  };

  return { props };
}

export default AgencyDetails;
