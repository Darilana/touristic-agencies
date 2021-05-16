import * as React from 'react';
import { Agency } from '../../../src/agency/agency.entity';
import axios from 'axios';
import { NextPage } from 'next';
import {
  makeStyles,
  TableContainer,
  Link,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  Box, Accordion, AccordionSummary, AccordionDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OfficeForm from "../../components/OfficeForm";
import AgencyDetailsForm from "../../components/AgencyDetailsForm";

interface Props {
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
});

const AgencyList: NextPage<Props> = ({ agencies }) => {
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h4" color="textSecondary">
          Список агенцій
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Додати агенцію</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgencyDetailsForm />
          </AccordionDetails>
        </Accordion>
      </Box>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Назва</TableCell>
              <TableCell>Номер телефону</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {agencies.map((agency) => (
              <TableRow key={agency.name}>
                <TableCell component="th" scope="row">
                  {agency.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {agency.phoneNumber}
                </TableCell>
                <TableCell>
                  <Link href={`agency/${agency.id}`}>Детальніше</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const props: Props = {
    agencies: (await axios.get('http://localhost:3000/api/agency', {
      headers: {
        Authorization: ctx.req.headers.authorization
      }
    })).data,
  };

  return { props };
}

export default AgencyList;
