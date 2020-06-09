import types from './types';

const initialState = {
  list         : [],
  carts        : {},
  totalQuantity: 0,
};

const sumQuantity = (carts = {}) => {
  const input = Object.values(carts);

  if (!input.length) return 0;
  return input.reduce((a, b: any) => a + (b.quantity || 0), 0);
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case types.UPDATE:
      return {
        ...state,
        ...payload,
        totalQuantity: sumQuantity(payload.carts),
      };
    case types.FETCH:
      return {
        ...state,
        list: payload,
      };
    case types.RESET:
      return {
        list         : [],
        carts        : {},
        totalQuantity: 0,
      };
    default:
      return state;
  }
};
