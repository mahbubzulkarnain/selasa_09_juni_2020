import types from './types';

const updateProductsByCarts = (products: any, carts: any) => products.map((item: any) => {
  const result = item;
  if (typeof carts[item.id] === 'object') {
    result.quantity = carts[item.id]?.quantity;
  } else {
    result.quantity = 0;
  }
  return result;
})

const fetchProducts = () => async (dispatch: Function, getState: Function) => {
  const payload = await fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((data) => data.map(({ id, title }: any) => ({
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
    type   : types.FETCH,
    payload: updateProductsByCarts(payload, getState().data.carts),
  });
};

const update = (carts: any) => (dispatch: Function, getState: Function) => dispatch({
  type   : types.UPDATE,
  payload: {
    list: updateProductsByCarts(getState().data.list, carts),
    carts,
  },
});

const reset = () => (dispatch: Function) => dispatch({
  type: types.RESET,
});

export default { fetchProducts, update, reset };
