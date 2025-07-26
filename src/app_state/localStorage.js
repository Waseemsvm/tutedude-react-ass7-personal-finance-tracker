import data from "../app_state/data.json";

export const loadState = () => {
  try {
    const serialized = localStorage.getItem("app_state"); // fetch state from the localstorage
    if (serialized === null) return data; // if laoding first time return intial/default data
    return JSON.parse(serialized);
  } catch (ex) {
    console.error("Could not load data from local storage", ex);
    return data;
  }
};

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("app_state", serialized);
  } catch (ex) {
    console.error("Could not save state in local storage", ex);
  }
};
