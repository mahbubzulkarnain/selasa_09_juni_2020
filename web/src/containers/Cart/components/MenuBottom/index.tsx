import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import actions from "../../../../stores/actions";

import './index.scss'

const Footer = ({ history, dispatch }: any) => (
  <div className='menu-bottom'>
    <button className='menu-bottom__checkout' onClick={ (e) => {
      e.preventDefault()
      dispatch(actions.reset())
      history.replace('/')
    } }>Checkout</button>
  </div>
)

export default connect()(withRouter(Footer))
