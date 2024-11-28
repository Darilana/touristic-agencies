import * as React from 'react';
import axios from 'axios';
import { Tour } from '../../../src/tour/tour.entity';
import { NextPage } from 'next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from 'next/router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TourDetailsStep from '../../components/tour/TourDetailsStep';
import SnackbarMessage, {
  SnackbarState,
} from '../../components/common/SnackBarMessage';
import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import { TourFilter } from '../../components/tour/TourFilter';
import isEmpty from 'lodash/isEmpty';
import { Agency } from '../../../src/agency/agency.entity';
import { Direction } from 'src/direction/direction.entity';
import { Category } from 'src/category/category.entity';

interface TourListProps {
  tours: Tour[];
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

const TourList: NextPage<TourListProps> = ({ tours, agencies }) => {
  const [filteredTours, setFilteredTours] = React.useState(tours);
  const [requestParams, setRequestParams] = React.useState({});
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    isOpen: false,
    alertText: '',
  });

  const classes = useStyles();

  const onSnackbarClose = () =>
    setSnackbarState({ ...snackbarState, isOpen: false });

  const getAutocompleteOptions = (options: string) =>
    uniqBy(
      flatten(filteredTours.map((tour) => tour[options])),
      (option: Direction | Category) => option.name,
    );

  const directionsOptions = getAutocompleteOptions('directions');

  const categoriesOptions = getAutocompleteOptions('categories');

  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  const deleteTour = (tour: Tour) => {
    axios.delete(`http://localhost:3000/api/tour/${tour.id}`);
    refreshData();
  };

  const handleSort = (property: string) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);

    const compareFn = (i: Tour, j: Tour) => {
      if (i[property] < j[property]) {
        return order === 'asc' ? -1 : 1;
      } else {
        if (i[property] > j[property]) {
          return order === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }
    };

    const sortedItems = filteredTours.sort(compareFn);
    setFilteredTours(sortedItems);
  };

  const createSortHandler = (property: string) => () => {
    handleSort(property);
  };

  const onFilterChange = (
    toursToDisplay: Tour[],
    params: Record<string, string>,
  ) => {
    setFilteredTours(toursToDisplay);
    setRequestParams({ ...requestParams, ...params });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h4" color="textSecondary">
          List of tours
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add tour</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TourDetailsStep
              setSnackbarState={setSnackbarState}
              agencies={agencies}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
      {!isEmpty(tours) && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            mb={4}
            mt={4}
            display="flex"
            justifyContent="space-between"
            width={800}
          >
            <TourFilter
              options={directionsOptions}
              label="Directions"
              fieldType="direction"
              requestParams={requestParams}
              onChange={onFilterChange}
            />
            <TourFilter
              options={categoriesOptions}
              label="Categories"
              fieldType="category"
              requestParams={requestParams}
              onChange={onFilterChange}
            />
          </Box>
          <TableContainer className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">Name</TableCell>
                  <TableCell component="th">
                    <TableSortLabel
                      active={orderBy === 'price'}
                      direction={orderBy === 'price' ? order : 'asc'}
                      onClick={createSortHandler('price')}
                    >
                      Price (USD)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell component="th">
                    <TableSortLabel
                      active={orderBy === 'duration'}
                      direction={orderBy === 'duration' ? order : 'asc'}
                      onClick={createSortHandler('duration')}
                    >
                      Duration (days)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell component="th">Direction</TableCell>
                  <TableCell component="th">Category</TableCell>
                  <TableCell align="right" component="th" />
                  <TableCell align="right" component="th" />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTours.map((tour) => (
                  <TableRow key={tour.name}>
                    <TableCell scope="row">{tour.name}</TableCell>
                    <TableCell scope="row">{tour.price.toFixed(2)}</TableCell>
                    <TableCell scope="row">
                      {moment.duration(tour.duration).asDays()}
                    </TableCell>
                    <TableCell scope="row">
                      {tour.directions
                        .map((direction) => direction.name)
                        .join(', ')}
                    </TableCell>
                    <TableCell scope="row">
                      {tour.categories
                        .map((category) => category.name)
                        .join(', ')}
                    </TableCell>
                    <TableCell>
                      <Link href={`/tour/${tour.id}`}>More details...</Link>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => deleteTour(tour)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <SnackbarMessage
        snackbarState={snackbarState}
        onClose={onSnackbarClose}
      />
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const props: TourListProps = {
    tours: (
      await axios.get('http://localhost:3000/api/tour', {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
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

export default TourList;
