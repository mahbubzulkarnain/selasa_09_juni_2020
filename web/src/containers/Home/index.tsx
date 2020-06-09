import * as React from 'react'
import { connect } from 'react-redux';

import actions from "../../stores/actions";

import ProductList from "./components/ProductList";

import './index.scss'

class HomeContainer extends React.Component<any, any> {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchProducts());
  }

  render() {
    const { products } = this.props

    return (
      <div className='home'>
        <ProductList products={ products }/>
      </div>
    )
  }
}

const mapStateToProps = ({ data: state }: any) => ({
  products     : state?.list,
  totalQuantity: state?.totalQuantity,
});


export default connect(mapStateToProps)(HomeContainer)
