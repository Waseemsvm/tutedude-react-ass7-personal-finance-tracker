import { __DO_NOT_USE__ActionTypes, combineReducers, createStore } from "redux";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

const FETCH_TRANSACTION_REQUEST = "FETCH_TRANSACTION_REQUEST";
const FETCH_TRANSACTION_SUCCESS = "FETCH_TRANSACTION_SUCCESS";
const FETCH_TRANSACTION_FAILURE = "FETCH_TRANSACTION_FAILURE";

const fetchTransaction = () => {
  return {
    type: FETCH_TRANSACTION_REQUEST,
  };
};

export const CALCULATE_DASHBOARD_DATA = "CALCULATE_DASHBOARD_DATA";
export const CALC_MONTHLY_SPEND = "CALC_MONTHLY_SPEND";
export const CALC_CAT_WISE_DATA = "CALC_CAT_WISE_DATA";
export const FILTER_BY_DATE = "FILTER_BY_DATE";
export const UPDATE_PROFILE_DATA = "UPDATE_PROFILE_DATA";
export const UPDATE_CURRENCY = "UPDATE_CURRENCY";
export const ADD_DATA_TO_TXN = "ADD_DATA_TO_TXN";
export const EDIT_TXN_DATA = "EDIT_TXN_DATA";
export const DELETE_TXN_DATA = "DELETE_TXN_DATA";

export const calculateDashboardData = (transactions) => {
  return {
    type: CALCULATE_DASHBOARD_DATA,
    payload: { transactions },
  };
};

export const calculateMonthlySpend = (transactions) => {
  return {
    type: CALC_MONTHLY_SPEND,
    payload: { transactions },
  };
};

export const calculateCatWiseData = (transactions) => {
  return {
    type: CALC_CAT_WISE_DATA,
    payload: { transactions },
  };
};

export const filterByDate = (transactions, dateVal) => {
  return {
    type: FILTER_BY_DATE,
    payload: { transactions, dateVal },
  };
};

export const updateProfile = (id, val) => {
  return {
    type: UPDATE_PROFILE_DATA,
    payload: { id, val },
  };
};

export const addTransaction = (transaction) => {
  return {
    type: ADD_DATA_TO_TXN,
    payload: { transaction },
  };
};

export const deleteTransaction = (id) => {
  return {
    type: DELETE_TXN_DATA,
    payload: id,
  };
};

// export const updateTransactions = (transactions, currency, rate) => {
//   return {
//     type: UPDATE_CURRENCY_IN_TXNS,
//     payload: { transactions, currency, rate },
//   };
// };

export const updateCurrency = (currency) => {
  return {
    type: UPDATE_CURRENCY,
    payload: currency,
  };
};

const dashBoardReducer = (state = preloadedState.dashboard, action) => {
  state = { ...state };
  let transactions = [...(action.payload?.transactions ?? [])];
  switch (action.type) {
    case CALCULATE_DASHBOARD_DATA:
      state.totalIncome = 0;
      state.totalExpenses = 0;
      state.savings = 0;
      state.remBudget = 0;
      transactions.forEach((i) => {
        if (i.type === "Income") state.totalIncome += i.amount;
        else if (i.type === "Expense") state.totalExpenses += i.amount;
      });

      state.savings = state.totalIncome - state.totalExpenses;
      state.remBudget = 0;
    case CALC_MONTHLY_SPEND:
      const mMonths = {};
      transactions.forEach((i) => {
        if (i.type === "Expense") {
          const month = new Date(i.date).toString().slice(4, 7);
          mMonths[month] ??= 0;
          mMonths[month] += i.amount;
        }
      });
      state.mMonths = mMonths;
    case CALC_CAT_WISE_DATA:
      const mCat = {};
      transactions.forEach((i) => {
        if (i.type === "Expense") {
          const cat = i.category;
          mCat[cat] ??= 0;
          mCat[cat] += i.amount;
        }
      });
      state.mCat = mCat;
      return state;
    case FILTER_BY_DATE:
      state.filterDate = action.payload.dateVal;
      state.expenses = transactions.filter(
        (txn) => txn.date === state.filterDate
      );
  }
  return state;
};

const transReducer = (state = preloadedState.transactions, action) => {
  state = [...state];
  if (action.type === ADD_DATA_TO_TXN)
    state.unshift(action.payload.transaction);
  if (action.type === DELETE_TXN_DATA) {
    const idx = state.findIndex((txn) => txn.id === action.payload);
    if (idx >= 0) state.splice(idx, 1);
  }

  return state;
};

const profileReducer = (state = preloadedState.profile, action) => {
  state = { ...state };
  if (action.type === UPDATE_PROFILE_DATA) {
    const { id, val } = action.payload;
    state = { ...state, [id]: val };
  }

  if (action.type === UPDATE_CURRENCY) {
    state = { ...state, currency: action.payload };
  }

  return state;
};

const rootReducer = combineReducers({
  transactions: transReducer,
  dashboard: dashBoardReducer,
  profile: profileReducer,
});

const store = createStore(rootReducer);

store.subscribe((e) => {
  saveState(store.getState());
});

export default store;
