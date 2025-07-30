import { connect, useSelector } from "react-redux";
import Button from "../components/Button";
import TransactionPageStyles from "../styles/TransactionPage.module.css";
import TransactionForm from "./TransactionForm";
import { useModal } from "../components/TransactionProvider";
import Modal from "../components/Modal";
import { deleteTransaction } from "../app_state/TransactionReducer";
import { useState } from "react";
import { toast } from "react-toastify";

function TransactionPage(props) {
  const { showModal } = useModal();
  const { currencyList, currency, symbol, transactions, deleteTxn } = props;
  const rate = currencyList.find((c) => c.key === currency)?.rate ?? 1;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = (message) => toast(message, { autoClose: 1000 });

  return (
    <div className={TransactionPageStyles["trans-page-cont"]}>
      <div className={TransactionPageStyles["trans-page-toolbar"]}>
        <h1>Transactions</h1>
        <Button
          text={"Add"}
          onClick={(e) => {
            localStorage.removeItem("data_to_edit");
            showModal(true);
            setIsModalOpen(true);
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
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.type}</td>
                <td>{Math.round(txn.amount * rate)}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td>
                  <Button
                    text={"Edit"}
                    onClick={(e) => {
                      localStorage.setItem("data_to_edit", JSON.stringify(txn));
                      showModal(true);
                      setIsModalOpen(true);
                    }}
                  />
                </td>
                <td>
                  <Button
                    text={"Delete"}
                    onClick={(e) => {
                      deleteTxn(txn.id);
                      notify("Transaction deleted Successfully?");
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal>
        <TransactionForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTxn: (id) => {
      dispatch(deleteTransaction(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
