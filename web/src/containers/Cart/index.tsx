import * as React from 'react'
import { connect } from 'react-redux'

import MenuBottom from "./components/MenuBottom";

import './index.scss'

class CartContainer extends React.Component<any, any> {
  render() {
    const { carts } = this.props
    return (
      <div className='cart'>
        <ul className='cart__list'>
          {
            Object.values(carts) && Object.values(carts)?.map((item: any) => (
              <li key={ item?.id } className='cart__list__item'>
                <p className='cart__list__item__title'>{ item.title }</p>
                <p className='cart__list__item__quantity'>{ item.quantity }</p>
              </li>
            ))
          }
        </ul>
        <MenuBottom />
      </div>
    );
  }
}

const mapStateToProps = ({ data: { carts } }: any) => ({
  carts,
})

export default connect(mapStateToProps)(CartContainer)
