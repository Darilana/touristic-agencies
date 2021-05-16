import * as React from 'react';
import axios from 'axios';
import { Tour } from '../../../src/tour/tour.entity';
import { NextPage } from 'next';
import {
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import moment from 'moment';

interface Props {
  tours: Tour[];
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

const TourList: NextPage<Props> = ({ tours }) => {
  const classes = useStyles();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <div>
      <h1>TourList</h1>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Назва</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={createSortHandler('price')}
                >
                  Ціна (грн)
                </TableSortLabel>
              </TableCell>
              <TableCell>Тривалість (дні)</TableCell>
              <TableCell>Напрямок</TableCell>
              <TableCell>Категорія</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.name}>
                <TableCell component="th" scope="row">
                  {tour.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tour.price.toFixed(2)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment.duration(tour.duration).asDays()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tour.directions.map((direction) => direction.name).join(", ")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tour.categories.map((category) => category.name).join(", ")}
                </TableCell>
                <TableCell>
                  <Link href={`tour/${tour.id}`}>Детальніше</Link>
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
    tours: (
      await axios.get('http://localhost:3000/api/tour', {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
  };

  return { props };
}

export default TourList;
