import { BrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import store from "./app_state/TransactionReducer";
import { TransactionProvider } from "./components/TransactionProvider";

export default function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Provider store={store}>
          <TransactionProvider>
            <Layout />
          </TransactionProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
