// -- Constants ------------------------------------------------------------- //

const TRANSACTIONS_ADD_NEW = 'transactions/TRANSACTIONS_ADD_NEW';

// -- Actions --------------------------------------------------------------- //

export const transactionsAddNew = transaction => dispatch => ({ type: TRANSACTIONS_ADD_NEW, payload: transaction });

// -- Reducer --------------------------------------------------------------- //

const INITIAL_STATE = {
  transactions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRANSACTIONS_ADD_NEW:
    return {
      ...state,
      transactions: [...state.transactions, action.payload],
    };
  default:
    return state;
  }
};
