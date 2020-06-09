import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import BadgeText from "../BadgeText";

import './index.scss'

class Navbar extends React.Component<any, any> {
  render() {
    const { totalQuantity } = this.props
    return (
      <div className='navbar'>
        <Link to='/' className='navbar__brand'>
          Mahbub Zulkarnain
        </Link>
        <div className='navbar__cart'>
          <Link to='mycart' style={ { textDecoration: 'none' } }>
            <BadgeText value={ totalQuantity }/>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  totalQuantity: state.data.totalQuantity,
});

export default connect(mapStateToProps)(Navbar)
