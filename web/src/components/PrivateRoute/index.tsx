import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({ totalQuantity, ...props }: any) => {
  if (totalQuantity < 1) return <Redirect to={ { pathname: '/' } }/>

  return (
    <Route { ...props }/>
  )
}

const mapStateToProps = ({ data: { totalQuantity } }: any) => ({
  totalQuantity
})

export default connect(mapStateToProps)(PrivateRoute)
