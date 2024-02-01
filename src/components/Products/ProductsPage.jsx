import React from 'react'
import './ProductsPage.css'
import Sidebar from './Sidebar'
import ProductList from './ProductList'

const ProductsPage = () => {
  return (
    <section className="products_page">
        <aside className="products_sidebar">
            <Sidebar/>
        </aside>

        <section className="products_list_section">
            <ProductList/>
        </section>
    </section>
  )
}

export default ProductsPage