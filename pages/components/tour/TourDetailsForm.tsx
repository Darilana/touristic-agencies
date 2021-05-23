import * as React from 'react';
import { Field, Form, FieldArray, useFormikContext } from 'formik';
import { Button, Box, Typography, Link } from '@material-ui/core';
import FormInput from '../common/FormInput';
import { Tour } from '../../../src/tour/tour.entity';
import ChipInput from 'material-ui-chip-input';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { TourDetailsStepValues } from './TourDetailsStep';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

interface Props {
  tour?: Tour;
}

const TourDetailsForm: React.FC<Props> = ({ tour }) => {
  const { values, isValid, errors, initialValues, dirty, touched, setFieldValue } =
    useFormikContext<TourDetailsStepValues>();
  const isFormDirty = !isEqual(initialValues, values);

  const validateRequiredField = (value) => {
    if ((!value && value !== 0) || (Array.isArray(value) && isEmpty(value))) {
      return (
        <Box>
          <Typography color="error">Обов'язкове поле</Typography>
        </Box>
      );
    }
  };

  const handleFileUpload = ([file]) => {
    if (!file) {
      setFieldValue('image', null);
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    return axios.post('http://localhost:3000/api/asset/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      setFieldValue('image', response.data.filename);
    });
  };

  const initialFile = values.image
      ? `http://localhost:3000/static/${values.image}`
      : '';

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
            <Typography variant="h6">Назва</Typography>
            <Field
              required
              id="name"
              name="name"
              placeholder="Назва туру"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Опис</Typography>
            <Field
              required
              id="description"
              name="description"
              placeholder="Опис туру"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Тривалість</Typography>
            <Field
              required
              id="duration"
              name="duration"
              placeholder="Тривалість туру"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Ціна</Typography>
            <Field
              required
              type="number"
              id="price"
              name="price"
              placeholder="Ціна туру"
              component={FormInput}
              validate={validateRequiredField}
            />
          </Box>

          <Box mb={2}>
            {tour ? (
              <Link href={`/agency/${tour.agency.id}`}>
                Агенція, що продає тур
              </Link>
            ) : (
              <>
                <Typography variant="h6">Агенція, що продає тур</Typography>
                <Field
                  required
                  type="number"
                  id="agencyId"
                  name="agencyId"
                  placeholder="Ідентифікатор агенції, що продає тур"
                  component={FormInput}
                  validate={validateRequiredField}
                />
              </>
            )}
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Напрямки</Typography>
            <FieldArray
              name="directions"
              render={(arrayHelpers) => (
                <>
                  <Field
                    required
                    id="directions"
                    name="directions"
                    placeholder="Напрямки туру"
                    validate={validateRequiredField}
                    onBlur={validateRequiredField}
                    component={() => (
                      <ChipInput
                        fullWidth
                        value={values?.directions}
                        onAdd={(chip) => arrayHelpers.push(chip)}
                        onDelete={(chip) => arrayHelpers.remove(chip)}
                      />
                    )}
                  />
                  {errors.directions &&
                  !isEqual(initialValues?.directions, values?.directions) ? (
                    <div>{errors.directions}</div>
                  ) : null}
                </>
              )}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Категорії</Typography>
            <FieldArray
              name="categories"
              render={(arrayHelpers) => (
                <>
                  <Field
                    required
                    id="categories"
                    name="categories"
                    placeholder="Напрямки туру"
                    validate={validateRequiredField}
                    component={() => (
                      <ChipInput
                        fullWidth
                        value={values?.categories}
                        onAdd={(chip) => {
                          arrayHelpers.push(chip);
                        }}
                        onDelete={(chip) => arrayHelpers.remove(chip)}
                      />
                    )}
                  />
                  {errors.categories &&
                  !isEqual(initialValues?.categories, values?.categories) ? (
                    <div>{errors.categories}</div>
                  ) : null}
                </>
              )}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Зображення</Typography>
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
            Зберегти зміни
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default TourDetailsForm;
