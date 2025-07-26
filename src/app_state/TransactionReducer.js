import { createStore } from "redux";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

const reducer = (state = preloadedState, action) => {
  return state;
};

const store = createStore(reducer);

store.subscribe((e) => {
  saveState(store.getState());
});

export default store;
