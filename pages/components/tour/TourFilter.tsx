import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { Tour } from '../../../src/tour/tour.entity';

interface TourFilterProps {
  options: { name: string; id: number }[];
  label: string;
  onChange: (toursToDisplay: Tour[], params) => void;
  fieldType: string;
  requestParams: { category?: string | null; direction?: string | null };
}

export const TourFilter: React.FC<TourFilterProps> = ({
  options,
  label,
  onChange,
  fieldType,
  requestParams,
}) => {
  const handleChange = async (_e: React.ChangeEvent<{}>, value: Tour) => {
    const params = {
      [fieldType]: value?.name,
    };

    const filteredTours = await axios.get('http://localhost:3000/api/tour', {
      params: pickBy({ ...requestParams, ...params }, identity),
    });

    onChange(filteredTours.data, params);
  };

  return (
    <Autocomplete
      id={fieldType}
      options={options}
      style={{ width: 300 }}
      noOptionsText="No available options"
      onChange={handleChange}
      getOptionLabel={(option) => {
        return option?.name ? option.name : '';
      }}
      getOptionSelected={(option, value) => {
        return option?.name === value?.name;
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};
