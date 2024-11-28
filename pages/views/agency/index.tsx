import * as React from 'react';
import { Agency } from '../../../src/agency/agency.entity';
import axios from 'axios';
import { NextPage } from 'next';
import {
  makeStyles,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AgencyDetailsStep from '../../components/agency/AgencyDetailsStep';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from 'next/router';
import SnackbarMessage, {
  SnackbarState,
} from '../../components/common/SnackBarMessage';
import isEmpty from 'lodash/isEmpty';

interface AgencyListProps {
  agencies: Agency[];
}

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    width: 800,
  },
  accordion: {
    width: 800,
  },
});

const AgencyList: NextPage<AgencyListProps> = ({ agencies }) => {
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    isOpen: false,
    alertText: '',
  });

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  const classes = useStyles();

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const deleteAgency = (agency) => {
    axios.delete(`http://localhost:3000/api/agency/${agency.id}`);
    refreshData();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h4" color="textSecondary">
          List of the agencies
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add agency</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgencyDetailsStep setSnackbarState={setSnackbarState} />
          </AccordionDetails>
        </Accordion>
      </Box>
      {!isEmpty(agencies) && (
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th">Name</TableCell>
                <TableCell component="th">Phone number</TableCell>
                <TableCell component="th" />
                <TableCell align="right" component="th" />
              </TableRow>
            </TableHead>
            <TableBody>
              {agencies.map((agency) => (
                <TableRow key={agency.name}>
                  <TableCell scope="row">{agency.name}</TableCell>
                  <TableCell scope="row">{agency.phoneNumber}</TableCell>
                  <TableCell>
                    <Link href={`/agency/${agency.id}`}>More details...</Link>
                  </TableCell>
                  <TableCell scope="row">
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => deleteAgency(agency)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <SnackbarMessage
        snackbarState={snackbarState}
        onClose={onSnackbarClose}
      />
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const props: AgencyListProps = {
    agencies: (
      await axios.get('http://localhost:3000/api/agency', {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
  };

  return { props };
}

export default AgencyList;
