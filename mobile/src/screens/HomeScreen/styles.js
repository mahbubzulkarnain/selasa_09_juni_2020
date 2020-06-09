import styles from '../../styles';

const margin = 5;
const padding = 7;
const size = styles.dimensions.width / 3 - margin * 2;

export default {
  container: {},
  productList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    margin,
    padding,
    width: size,
  },
  productItemTitle: {
    fontSize: 16,
    textAlign: 'left',
  },
};
