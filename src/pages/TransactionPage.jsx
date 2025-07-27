import { connect, useSelector } from "react-redux";
import Button from "../components/Button";
import TransactionPageStyles from "../styles/TransactionPage.module.css";
import TransactionForm from "./TransactionForm";
import { useModal } from "../components/TransactionProvider";
import Modal from "../components/Modal";

function TransactionPage(props) {
  const transactions = useSelector((state) => state.transactions);
  const { showModal } = useModal();
  const { currencyList, currency, symbol } = props;
  const rate = currencyList.find((c) => c.key === currency)?.rate ?? 1;

  return (
    <div className={TransactionPageStyles["trans-page-cont"]}>
      <div className={TransactionPageStyles["trans-page-toolbar"]}>
        <h1>Transactions</h1>
        <Button
          text={"Add"}
          onClick={(e) => {
            showModal(true);
          }}
        />
      </div>
      <div className={TransactionPageStyles["trans-page-table-cont"]}>
        <table className={TransactionPageStyles["trans-page-table"]}>
          <thead>
            <tr>
              <th>Type</th>
              <th style={{ minWidth: "2.5rem" }}>Amount ( {symbol} )</th>
              <th>Category</th>
              <th>Date</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => (
              <tr key={idx}>
                <td>{txn.type}</td>
                <td>{Math.round(txn.amount * rate)}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td>
                  <Button
                    text={"Edit"}
                    onClick={(e) => {
                      showModal(true);
                    }}
                  />
                </td>
                <td>
                  <Button text={"Delete"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal>
        <TransactionForm />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.profile.currency,
    currencyList: state.profile.currencyList,
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? 1,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
  };
};

export default connect(mapStateToProps)(TransactionPage);
