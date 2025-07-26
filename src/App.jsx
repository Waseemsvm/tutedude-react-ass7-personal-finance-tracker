import { BrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import store from "./app_state/TransactionReducer";

export default function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Provider store={store}>
          <Layout />
        </Provider>
      </BrowserRouter>
    </div>
  );
}
