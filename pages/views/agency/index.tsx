import * as React from 'react';
import { Agency } from '../../../src/agency/agency.entity';
import axios from 'axios';
import { NextPage } from 'next';

interface Props {
  agencies: Agency[]
}

const AgencyList: NextPage<Props> = ({ agencies }) => {
  console.log({ agencies })
  return (
    <div>
      <h1>AgencyList</h1>
      <pre>{JSON.stringify(agencies, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps() {
  const props: Props = {
    agencies: (await axios.get('http://localhost:3000/api/agency')).data
  };

  return { props };
}

export default AgencyList;
