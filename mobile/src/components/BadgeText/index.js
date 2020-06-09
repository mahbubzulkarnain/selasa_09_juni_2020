import React from 'react';
import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

const BadgeText = ({ total = 0, style }) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={[styles.text, style]}>{total}</Text>
    </View>
  </View>
);

BadgeText.defaultProps = {
  style: {},
};

BadgeText.propTypes = {
  total: PropTypes.number.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};


export default BadgeText;
