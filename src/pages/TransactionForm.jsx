import Button from "../components/Button";
import { useModal } from "../components/TransactionProvider";
import TransactionPageStyles from "../styles/TransactionPage.module.css";

export default function TransactionForm() {

  const {showModal} = useModal();
  return (
    <div>
      <div>
        <h1>Create Transaction</h1>
        <div className={TransactionPageStyles["form-data"]}>
          <select name="" id="">
            <option value="">Income </option>
            <option value="">Expense </option>
          </select>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <select name="" id="">
            <option value="">Groceries</option>
            <option value="">Groceries</option>
            <option value="">Groceries</option>
            <option value="">Groceries</option>
          </select>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <input type="date" placeholder="Enter the date" />
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <input type="text" placeholder="Enter the Amount" />
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <textarea
            name=""
            id=""
            placeholder="Enter the description"
          ></textarea>
        </div>
      </div>
      <div className={TransactionPageStyles["form-data"]}>
        <Button
          className={TransactionPageStyles["save-btn"]}
          text={"Save"}
          onClick={(e) => {
            showModal(false);
          }}
        />
      </div>
    </div>
  );
}
