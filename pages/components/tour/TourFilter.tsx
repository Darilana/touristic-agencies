import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { Tour } from '../../../src/tour/tour.entity';

interface TourFilterProps {
  options: { name: string; id: number }[];
  label: string;
  onChange: React.Dispatch<React.SetStateAction<Tour[]>>;
  fieldType: string;
}

export const TourFilter: React.FC<TourFilterProps> = ({
  options,
  label,
  onChange,
  fieldType,
}) => {
  const handleChange = async (event, value) => {
    const params = value
      ? {
          [fieldType]: value.name,
        }
      : {};
    const filteredTours = await axios.get('http://localhost:3000/api/tour', {
      params,
    });

    onChange(filteredTours.data);
  };

  return (
    <Autocomplete
      id={fieldType}
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      noOptionsText="Немає варіантів"
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};
