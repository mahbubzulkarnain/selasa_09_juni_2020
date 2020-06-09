const margin = 5;
const padding = 7;

export default {
  container: {
    flex: 1,
  },
  productItem: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    margin,
    padding,
  },
  productItemTitle: {
    fontSize: 16,
  },
  productItemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  productItemInfoPrice: {
    color: 'red',
  },
  productItemInfoQuantity: {

  },
};
