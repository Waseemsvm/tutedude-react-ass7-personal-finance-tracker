import data from "../app_state/data.json";

const dashboardInitialState = {
  isLoading: false,
  totalIncome: 0,
  totalExpenses: 0,
  remBudget: 0,
  savings: 0,
  mCat: {},
  mMonths: {},
  expenses: [],
  filterDate: new Date().toISOString().substr(0, 10),
};

export const loadState = () => {
  try {
    const serialized = localStorage.getItem("app_state"); // fetch state from the localstorage
    if (serialized === null) {
      data.dashboardInitialState = dashboardInitialState;
      return data;
    } // if laoding first time return intial/default data

    return JSON.parse(serialized); //return the parsed data from local storage
  } catch (ex) {
    console.error("Could not load data from local storage", ex);
    return data;
  }
};

//update state to the local storage
export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state); //stringify and store that json data in local storage
    localStorage.setItem("app_state", serialized);
  } catch (ex) {
    console.error("Could not save state in local storage", ex);
  }
};
