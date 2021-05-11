import * as React from 'react';
import axios from 'axios';
import { Agency } from '../../../src/agency/agency.entity';
import { NextPage, NextPageContext } from 'next';

interface Props {
  agency: Agency;
}

const AgencyDetails: NextPage<Props> = ({ agency }) => {
  return (
    <div>
      <h1>AgencyDetails</h1>
      <pre>{JSON.stringify(agency, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.req.params
  const props: Props = {
    agency: (await axios.get(`http://localhost:3000/api/agency/${id}`)).data
  };

  return { props };
}

export default AgencyDetails;
