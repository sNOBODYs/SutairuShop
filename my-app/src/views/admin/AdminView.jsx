import React from 'react'
import ProductComponentAdmin from '../../components/productComponents/ProductComponentAdmin';



export default function AdminView() {
  return (
    <div>
      <section className ="page-header">
        <h1>Admin-Products</h1>
    </section>
      <ProductComponentAdmin/>
    </div>
  );
}