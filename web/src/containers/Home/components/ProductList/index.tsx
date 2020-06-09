import * as React from "react";
import QuantityEditor from "../QuantityEditor";

import PropTypes from 'prop-types'

import './index.scss'

const ProductList = ({ products }: any) => <ul className='product-list'>
  {
    products && products.map(
      (item: any) =>
        <li key={ item.id } className='product-list__item'>
          <p>{ item.title }</p>
          <QuantityEditor key={ item.id } item={ item }/>
        </li>
    )
  }
</ul>

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductList
