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
import AgencyDetailsForm from '../../components/AgencyDetailsForm';
import OfficeForm from '../../components/OfficeForm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  agency: Agency;
}

const AgencyDetails: NextPage<Props> = ({ agency }) => {
  return (
    <Box mb={4}>
      <AgencyDetailsForm agency={agency} />
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h5" color="textSecondary">Офіси</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Додати офіс</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OfficeForm agencyId={agency.id} />
          </AccordionDetails>
        </Accordion>
      </Box>
      {agency.offices.map((office, index) => (
        <OfficeForm key={office.id} office={office} index={index} />
      ))}
    </Box>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.req.params;
  const props: Props = {
    agency: (await axios.get(`http://localhost:3000/api/agency/${id}`)).data,
  };

  return { props };
}

export default AgencyDetails;
