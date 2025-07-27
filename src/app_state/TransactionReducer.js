import { __DO_NOT_USE__ActionTypes, combineReducers, createStore } from "redux";
import { loadState, saveState } from "./localStorage";
import { createSlice } from "@reduxjs/toolkit";

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
  return state;
};

const profileReducer = (state = preloadedState.profile, action) => {
  state = { ...state };
  if (action.type === UPDATE_PROFILE_DATA) {
    const { id, val } = action.payload;
    state = { ...state, [id]: val };
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
