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

const profileState = {
  name: "Guest",
  dob: "1999-03-10",
  src: "/src/assets/profile-pic.jpg",
  currency: "INR",
  email: "",
  currencyList: [],
};

const currencyList = [
  {
    key: "INR",
    value: "₹ (Indian Rupee)",
    rate: 1,
    symbol: "₹",
  },
  {
    key: "USD",
    value: "$ (US Dollar)",
    rate: 0.01156,
    symbol: "$",
  },
  {
    key: "EUR",
    value: "€ (Euro)",
    rate: 0.00999,
    symbol: "€",
  },
  {
    key: "GBP",
    value: "£ (British Pound Sterling)",
    rate: 0.00859,
    symbol: "£",
  },
];

const categories = [
  {
    key: "groceries",
    value: "Groceries",
  },
  {
    key: "entertainment",
    value: "Entertainment",
  },
  {
    key: "transportation",
    value: "Transportation",
  },
  {
    key: "rent",
    value: "Rent",
  },
];

const types = [
  {
    key: "income",
    value: "Income",
  },
  {
    key: "expense",
    value: "Expense",
  },
];

export const loadState = () => {
  try {
    const serialized = localStorage.getItem("app_state"); // fetch state from the localstorage
    if (serialized === null) {
      data.dashboard = dashboardInitialState;
      data.profile = profileState;
      data.profile.currencyList = currencyList;
      data.profile.categories = categories;
      data.profile.types = types;
      data.profile.budget = 5000;
      data.profile.orgTransactions = JSON.parse(
        JSON.stringify(data.transactions)
      );
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
