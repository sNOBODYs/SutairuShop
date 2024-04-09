import React from 'react'
import SalesOverviewGraph from '../../components/salesOverviewGraph';
import ProductComponentAdmin from '../../components/ProductComponentAdmin';



export default function AdminView() {
  return (
    <div>
      <section className ="page-header">
        <h1>Admin-Products</h1>
    </section>
      <ProductComponentAdmin/>
      {/*<SalesOverviewGraph />*/}
    </div>
  );
}