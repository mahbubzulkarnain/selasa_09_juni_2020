import PropTypes from 'prop-types';

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const buttonType = (type) => {
  switch (type) {
    case 'outline': return styles.buttonOutline;
    default: return {};
  }
};

const buttonSize = (size) => {
  switch (size) {
    case 'fill': return { width: '100%' };
    default: return {};
  }
};

const buttonTextAlign = (align) => {
  switch (align) {
    case 'left': return styles.buttonTextAlignLeft;
    case 'right': return styles.buttonTextAlignRight;
    default: return styles.buttonTextAlignCenter;
  }
};

const Button = ({
  align,
  onPress,
  size,
  title,
  type,
}) => (
  <TouchableOpacity
    style={[
      styles.container,
      buttonType(type),
      buttonSize(size),
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.text,
        buttonTextAlign(align),
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  align: 'center',
  onPress: () => {},
  size: 'default',
  title: '',
  type: 'default',
};

Button.propTypes = {
  onPress: PropTypes.func,
  align: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
