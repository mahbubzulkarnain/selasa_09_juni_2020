import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../../../stores/actions';

import './index.scss'

class QuantityEditor extends React.Component<any, any> {
  static propTypes = {
    carts   : PropTypes.objectOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    item    : PropTypes.shape({
      id      : PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props: any) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  componentDidMount() {
    const { item, carts } = this.props;
    this.setState({
      quantity: (carts[item.id] && carts[item.id].id) ? item.quantity : 0,
    });
  }

  onPressMin = () => {
    const { item, carts, dispatch } = this.props;
    const { id } = item;

    const result = carts;
    let qty = 0;
    if (carts[id]) {
      if (carts[id].quantity > 1) {
        result[id].quantity -= 1;
        qty = result[id].quantity;
      } else {
        delete result[id];
      }
    }
    this.setState({ quantity: qty });
    dispatch(actions.update(result));
  }

  onPressPlus = () => {
    const { item, carts, dispatch } = this.props;
    const { id } = item;

    const result = carts;
    if (result[id]) {
      result[id].quantity += 1;
    } else {
      result[id] = {
        ...item,
        quantity: 1,
      };
    }
    this.setState({ quantity: result[id].quantity });
    dispatch(actions.update(result));
  }

  render() {
    const { quantity } = this.state;

    return (
      <div className='quantity-editor'>
        <button
          className='quantity-editor__button'
          onClick={ this.onPressMin }
        >
          <span>-</span>
        </button>
        <p className='quantity-editor__text-quantity'>
          { quantity }
        </p>
        <button
          className='quantity-editor__button'
          onClick={ this.onPressPlus }
        >
          <span>+</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({
  carts: state.data.carts,
});

export default connect(mapStateToProps)(QuantityEditor);
