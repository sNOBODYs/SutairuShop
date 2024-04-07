import React from 'react'
import SalesOverviewGraph from '../../components/salesOverviewGraph';
import ProductComponentAdmin from '../../components/ProductComponentAdmin';



export default function AdminView() {
  return (
    <div>
      <h1>DashBoard - admin</h1>
      <ProductComponentAdmin/>
      {/*<SalesOverviewGraph />*/}
    </div>
  );
}