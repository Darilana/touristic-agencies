import * as React from 'react';
import axios from 'axios';
import { Tour } from '../../../src/tour/tour.entity';
import { NextPage } from 'next';

interface Props {
  tours: Tour[]
}

const TourList: NextPage<Props> = ({ tours }) => {
  return (
    <div>
      <h1>TourList</h1>
      <pre>{JSON.stringify(tours, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps() {
  const props: Props = {
    tours: (await axios.get('http://localhost:3000/api/tour')).data
  };

  return { props };
}

export default TourList;
