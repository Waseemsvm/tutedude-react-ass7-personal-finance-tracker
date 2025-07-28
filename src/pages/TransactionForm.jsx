import { connect } from "react-redux";
import Button from "../components/Button";
import { useModal } from "../components/TransactionProvider";
import TransactionPageStyles from "../styles/TransactionPage.module.css";
import { useState } from "react";
import { addTransaction } from "../app_state/TransactionReducer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function TransactionForm(props) {
  const { categories, types, addTxn } = props;
  const { showModal } = useModal();

  const notify = (e) => toast("Transaction Created Successfully!");

  const initialFormData = {
    type: "Income",
    category: "Grocery",
    date: "",
    amount: 0,
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const updateFormdata = (e) => {
    const oData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(oData);
    console.log(oData);
  };

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          addTxn({ ...formData, id: uuidv4() });
          showModal(false);
          notify();
        }}
      >
        <h1>Create Transaction</h1>
        <div className={TransactionPageStyles["form-data"]}>
          <select
            name="type"
            id="type"
            onChange={updateFormdata}
            value={formData.type}
          >
            {types.map((t) => (
              <option key={t.key}>{t.value}</option>
            ))}
          </select>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <select name="category" id="category" onChange={updateFormdata}>
            {categories.map((c) => (
              <option key={c.key}>{c.value}</option>
            ))}
          </select>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <input
            name="date"
            id="date"
            type="date"
            placeholder="Enter the date"
            onChange={updateFormdata}
            value={formData.date}
          />
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <input
            name="amount"
            id="amount"
            type="text"
            placeholder="Enter the Amount"
            value={formData.amount}
            onChange={updateFormdata}
          />
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <textarea
            name="description"
            id="description"
            placeholder="Enter the description"
            value={formData.description}
            onChange={updateFormdata}
          ></textarea>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <Button
            type="reset"
            className={TransactionPageStyles["close-btn"]}
            onClick={(e) => {
              setFormData({ ...initialFormData });
              showModal(false);
            }}
            text={"Cancel"}
          />
          <Button
            className={TransactionPageStyles["save-btn"]}
            text={"Save"}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.profile.categories,
    types: state.profile.types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTxn: (transaction) => {
      dispatch(addTransaction(transaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
