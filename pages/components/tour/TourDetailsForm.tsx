import * as React from 'react';
import { Field, Form, useFormikContext } from 'formik';
import { Button, Box, Typography, Link, TextField } from '@material-ui/core';
import FormInput from '../common/FormInput';
import { Tour } from '../../../src/tour/tour.entity';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { TourDetailsStepValues } from './TourDetailsStep';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import { Agency } from '../../../src/agency/agency.entity';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FieldArrayInput } from './FieldArrayInput';

interface TourDetailsFormProps {
  tour?: Tour;
  agencies?: Agency[];
}

const TourDetailsForm: React.FC<TourDetailsFormProps> = ({
  tour,
  agencies,
}) => {
  const { values, isValid, errors, initialValues, setFieldValue } =
    useFormikContext<TourDetailsStepValues>();

  const isFormDirty = !isEqual(initialValues, values);

  const validateRequiredField = (value: string | number | string[]) => {
    if ((!value && value !== 0) || (Array.isArray(value) && isEmpty(value))) {
      return (
        <div>
          <Typography color="error">This field is required</Typography>
        </div>
      );
    }
  };

  const handleFileUpload = async ([file]) => {
    if (!file) {
      setFieldValue('image', null);
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(
      'http://localhost:3000/api/asset/upload-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    setFieldValue('image', response.data.filename);
  };

  const initialFile = values.image
    ? `http://localhost:3000/static/${values.image}`
    : '';

  const agenciesOptions = agencies?.map((agency: Agency) => ({
    name: agency.name,
  }));

  const handleAgencyChange = (_e: React.ChangeEvent, value: Agency) => {
    const agencyId = agencies?.find(
      (agency: Agency) => agency?.name === value?.name,
    )?.id;
    setFieldValue('agencyId', agencyId);
  };

  return (
    <Form>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" width={600}>
          {values.image && (
            <Box mb={2}>
              <img height={200} src={initialFile} />
            </Box>
          )}
          <Box mb={2}>
            <Typography variant="h6">Name</Typography>
            <Field
              required
              id="name"
              name="name"
              placeholder="Tour name"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Description</Typography>
            <Field
              required
              id="description"
              name="description"
              placeholder="Tour description"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Duration</Typography>
            <Field
              required
              id="duration"
              name="duration"
              placeholder="Number of days the tour lasts"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Price</Typography>
            <Field
              required
              type="number"
              id="price"
              name="price"
              placeholder="How much the tour costs"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>

          <Box mb={2}>
            {tour ? (
              <Link href={`/agency/${tour.agency.id}`}>
                Agency that sells the tour
              </Link>
            ) : (
              <>
                <Typography variant="h6">Agency that sells the tour</Typography>
                <Field
                  required
                  type="number"
                  id="agencyId"
                  name="agencyId"
                  placeholder="Agency where a tour can be bought"
                  component={() => (
                    <Autocomplete
                      id="agencyId"
                      value={{
                        name:
                          agencies.find(
                            (agency: Agency) => agency.id === values.agencyId,
                          )?.name || '',
                      }}
                      fullWidth
                      options={agenciesOptions}
                      getOptionLabel={(option) => option?.name}
                      noOptionsText="No available options"
                      onChange={handleAgencyChange}
                      getOptionSelected={(option, value) => {
                        return option?.name === value?.name;
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  )}
                />
              </>
            )}
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Directions</Typography>
            <FieldArrayInput
              id="directions"
              name="directions"
              placeholder="Tour directions"
              values={values?.directions}
              initialValues={initialValues?.directions}
              errors={errors}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Categories</Typography>
            <FieldArrayInput
              id="categories"
              name="categories"
              placeholder="Categories related to the tour"
              values={values?.categories}
              initialValues={initialValues?.categories}
              errors={errors}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Photos</Typography>
            <DropzoneArea
              onChange={handleFileUpload}
              filesLimit={1}
              acceptedFiles={['image/jpeg', 'image/png']}
              initialFiles={initialFile ? [initialFile] : []}
            />
          </Box>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            disabled={!isValid || !isFormDirty}
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default TourDetailsForm;
