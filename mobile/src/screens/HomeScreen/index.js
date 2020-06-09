import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BadgeText from '../../components/BadgeText';
import ProductList from './components/ProductList';

import actions from '../../stores/actions';

import styles from './styles';

const navigationOptions = ({ navigation, totalQuantity }) => ({
  headerRight: () => (
    <TouchableOpacity
      disabled={totalQuantity === 0}
      onPress={() => {
        navigation.navigate('Cart');
      }}
    >
      <BadgeText total={totalQuantity} />
    </TouchableOpacity>
  ),
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      headerTitleAlign: 'left',
      title: 'Mahbub Zulkarnain',
      ...navigationOptions(props),
    });
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchProducts());
  }

  componentDidUpdate(prevProps) {
    const { totalQuantity, navigation } = this.props;
    if (prevProps.totalQuantity !== totalQuantity) {
      navigation.setOptions(navigationOptions(this.props));
    }
  }

  render() {
    const { products } = this.props;
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <ProductList products={products} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

HomeScreen.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalQuantity: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.data.list,
  totalQuantity: state.data.totalQuantity,
});

export default connect(mapStateToProps)(HomeScreen);
