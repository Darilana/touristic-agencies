import * as React from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import isEmpty from 'lodash/isEmpty';
import { Typography, Box, Button, TextField } from '@material-ui/core';
import { width } from '@material-ui/system';

const QueryRunner: NextPage = () => {
  const [queryResult, setQueryResult] = React.useState<object>({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    axios
      .post('http://localhost:3000/api/statistics/query-runner', {
        query: event.target[0].value,
      })
      .then(({ data }) => {
        setQueryResult(data);
      });
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <Typography variant="h4" color="textSecondary">
          Виконувач SQL запитів
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        <form onSubmit={handleSubmit} style={{ width: '80%' }}>
          <TextField
            id="outlined-multiline-static"
            label="SQL"
            fullWidth={true}
            multiline
            rows={15}
            variant="outlined"
          />
          <Button type="submit">Виконати</Button>
        </form>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} mt={4}>
        {!isEmpty(queryResult) && (
          <pre>{JSON.stringify(queryResult, null, 2)}</pre>
        )}
      </Box>
    </div>
  );
};

export default QueryRunner;
