import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../../components/Button';
import actions from '../../../stores/actions';

const CheckoutButton = ({ navigation, dispatch }) => (
  <View>
    <Button
      title="Checkout"
      type="outline"
      onPress={() => {
        dispatch(actions.reset());
        const reset = CommonActions.reset({
          key: null,
          index: 0,
          routes: [{ name: 'Home' }],
        });
        navigation.dispatch(reset);
      }}
    />
  </View>
);

CheckoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(CheckoutButton);
