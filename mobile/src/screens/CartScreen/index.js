import React, { Component } from 'react';
import {
  FlatList, SafeAreaView, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BadgeText from '../../components/BadgeText';
import CheckoutButton from './components/CheckoutButton';

import styles from './styles';

const navigationOptions = ({ totalQuantity }) => ({
  headerRight: () => <BadgeText total={totalQuantity} />,
});

class CartScreen extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      headerBackTitle: 'Back',
      title: 'My Cart',
      ...navigationOptions(props),
    });
  }

  componentDidUpdate(prevProps) {
    const { totalQuantity, navigation } = this.props;
    if (prevProps.totalQuantity !== totalQuantity) {
      navigation.setOptions(navigationOptions(this.props));
    }
  }

  renderItem = ({ item }) => (
    <View key={item.id} style={styles.productItem}>
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={styles.productItemTitle}
      >
        { item.title }
      </Text>
      <View style={styles.productItemInfo}>
        <Text style={styles.productItemInfoPrice}>
          Rp. 100.000
        </Text>
        <Text style={styles.productItemInfoQuantity}>
          { ` x ${item.quantity}` }
        </Text>
      </View>
    </View>
  )

  render() {
    const { carts, navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Object.values(carts)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.props}
        />
        <CheckoutButton navigation={navigation} />
      </SafeAreaView>
    );
  }
}

CartScreen.propTypes = {
  carts: PropTypes.objectOf(PropTypes.object).isRequired,
  totalQuantity: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  carts: state.data.carts,
  totalQuantity: state.data.totalQuantity,
});

export default connect(mapStateToProps)(CartScreen);
