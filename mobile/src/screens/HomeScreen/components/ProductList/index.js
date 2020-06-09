import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import QuantityEditor from '../QuantityEditor';

const ProductList = ({ products }) => (
  <View style={styles.productList}>
    { (products && products.length)
      ? products.map((item) => (
        <View key={item.id} style={styles.productItem}>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.productItemTitle}
          >
            { item.title }
          </Text>
          <QuantityEditor item={item} />
        </View>
      )) : null }
  </View>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
