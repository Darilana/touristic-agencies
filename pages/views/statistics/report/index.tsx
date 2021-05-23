import * as React from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import {
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  makeStyles,
} from '@material-ui/core';

interface Report {
  agencyCount: string;
  tourCount: string;
  categoryCount: string;
  directionCount: string;
  directionsByPopularity: {
    name: string;
    count: string;
  }[];
  categoriesByPopularity: {
    name: string;
    count: string;
  }[];
  agenciesByNumberOfOffices: {
    name: string;
    count: string;
  }[];
}

interface Props {
  report: Report;
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

const Report: NextPage<Props> = ({ report }) => {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h4" color="textSecondary">
          Статистика
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h6" color="textSecondary">
          Загальна кількість сутностей
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Агенції</TableCell>
                <TableCell align="right">Тури</TableCell>
                <TableCell align="right">Категорії</TableCell>
                <TableCell align="right">Напрямки</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">{report.agencyCount}</TableCell>
                <TableCell align="right">{report.tourCount}</TableCell>
                <TableCell align="right">{report.categoryCount}</TableCell>
                <TableCell align="right">{report.directionCount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h6" color="textSecondary">
          Напрямки за популярністю
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Напрямок</TableCell>
                <TableCell align="right">
                  Кількість турів за напрямком
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.directionsByPopularity.map((row) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h6" color="textSecondary">
          Категорії за популярністю
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Категорія</TableCell>
                <TableCell align="right">
                  Кількість турів що належать до категорії
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.categoriesByPopularity.map((row) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h6" color="textSecondary">
          Агенії за кільскістью офісів
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Агенція</TableCell>
                <TableCell align="right">
                  Кількість офісів що має агенція
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.agenciesByNumberOfOffices.map((row) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const props: Props = {
    report: (
      await axios.get('http://localhost:3000/api/statistics/report', {
        headers: {
          Authorization: ctx.req.headers.authorization,
        },
      })
    ).data,
  };

  return { props };
}
export default Report;
