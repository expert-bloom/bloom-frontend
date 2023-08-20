import React from 'react';

import DashboardScene from 'src/scenes/Company/DashboardCompany';

// get static props
export async function getStaticProps() {
  return {
    props: {
      title: 'Dashboard',
    },
  };
}

const Dashboard = () => {
  return <DashboardScene />;
};

export default Dashboard;
