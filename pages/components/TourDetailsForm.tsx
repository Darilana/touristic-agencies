import * as React from 'react';
import { Field, Form, FieldArray, useFormikContext } from 'formik';
import {
  Button,
  Box,
  Typography,
  Chip,
  makeStyles,
  Link,
} from '@material-ui/core';
import FormInput from './FormInput';
import { Tour } from '../../src/tour/tour.entity';
import ChipInput from 'material-ui-chip-input';
import moment from "moment";

interface Props {
  tour?: Tour;
}

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TourDetailsForm: React.FC<Props> = ({ tour }) => {
  const classes = useStyles();
  const { values } = useFormikContext();

  return (
    <Form>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" width={600}>
          <Box mb={2}>
            <Typography variant="h6">Назва</Typography>
            <Field
              required
              id="name"
              name="name"
              placeholder="Назва туру"
              component={FormInput}
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
            />
          </Box>
          <Box mb={2}>
            <Link href={`/agency/${tour.agency.id}`}>
              Агенція, що продає тур
            </Link>
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Напрямки</Typography>
            <FieldArray
              name="directions"
              render={(arrayHelpers) => (
                <Field
                  required
                  id="directions"
                  name="directions"
                  placeholder="Напрямки туру"
                  component={({ field, form }) => (
                    <ChipInput
                      fullWidth
                      value={values.directions}
                      onAdd={(chip) => arrayHelpers.push(chip)}
                      onDelete={(chip) => arrayHelpers.remove(chip)}
                    />
                  )}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Категорії</Typography>
            <FieldArray
              name="categories"
              render={(arrayHelpers) => (
                <Field
                  required
                  id="categories"
                  name="categories"
                  placeholder="Напрямки туру"
                  component={({ field, form }) => (
                    <ChipInput
                      fullWidth
                      value={values.categories}
                      onAdd={(chip) => arrayHelpers.push(chip)}
                      onDelete={(chip) => arrayHelpers.remove(chip)}
                    />
                  )}
                />
              )}
            />
          </Box>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            size="large"
          >
            Зберегти зміни
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default TourDetailsForm;
