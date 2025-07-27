import { useSelector } from "react-redux";
import Button from "../components/Button";
import TransactionPageStyles from "../styles/TransactionPage.module.css";
import TransactionForm from "./TransactionForm";
import { useTransaction } from "../components/TransactionProvider";

export default function TransactionPage() {
  const transactions = useSelector((state) => state.transactions);
  const { showForm } = useTransaction();

  return (
    <div className={TransactionPageStyles["trans-page-cont"]}>
      <div className={TransactionPageStyles["trans-page-toolbar"]}>
        <h1>Transactions</h1>
        <Button
          text={"Add"}
          onClick={(e) => {
            showForm(true);
          }}
        />
      </div>
      <div className={TransactionPageStyles["trans-page-table-cont"]}>
        <table className={TransactionPageStyles["trans-page-table"]}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
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
                <td>{txn.amount}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td>
                  <Button
                    text={"Edit"}
                    onClick={(e) => {
                      showForm(true);
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
      <TransactionForm />
    </div>
  );
}
