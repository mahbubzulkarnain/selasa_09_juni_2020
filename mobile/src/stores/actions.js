import types from './types';

const fetchProducts = () => async (dispatch) => {
  const payload = await fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((data) => data.map(({ id, title }) => ({
      id,
      title,
      quantity: 0,
    })))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      return [];
    });

  return dispatch({
    type: types.FETCH,
    payload,
  });
};

const update = (carts) => (dispatch, getState) => dispatch({
  type: types.UPDATE,
  payload: {
    list: getState().data.list.map((item) => {
      const result = item;
      if (typeof carts[item.id] === 'object') {
        result.quantity = carts[item.id].quantity;
      } else {
        result.quantity = 0;
      }
      return result;
    }),
    carts,
  },
});

const reset = () => (dispatch) => dispatch({
  type: types.RESET,
});

export default { fetchProducts, update, reset };
