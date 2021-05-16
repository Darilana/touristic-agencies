import * as React from 'react';
import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import { Tour } from '../../../src/tour/tour.entity';

interface Props {
  tour: Tour;
}

const TourDetails: NextPage<Props> = ({ tour }) => {
  return (
    <div>
      <h1>TourDetails</h1>
      <pre>{JSON.stringify(tour, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.req.params
  console.log(ctx.req.headers.authorization)
  const props: Props = {
    tour: (await axios.get(`http://localhost:3000/api/tour/${id}`, {
      headers: {
        Authorization: ctx.req.headers.authorization
      }
    })).data
  };

  return { props };
}

export default TourDetails;
