import { connect } from "react-redux";
import Button from "../components/Button";
import { useModal } from "../components/TransactionProvider";
import TransactionPageStyles from "../styles/TransactionPage.module.css";
import { useEffect, useState } from "react";
import {
  addTransaction,
  editTransaction,
} from "../app_state/TransactionReducer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function TransactionForm(props) {
  const {
    categories,
    types,
    addTxn,
    state,
    symbol,
    isModalOpen,
    setIsModalOpen,
    updateTxn,
    rate,
  } = props;
  const { showModal } = useModal();
  const notify = (message) => toast.success(message, { autoClose: 800 });

  let initialFormData = {
    type: types[0].value,
    category: categories[0].value,
    date: new Date().toISOString().substr(0, 10),
    amount: undefined,
    description: "",
  };

  const [formData, setFormData] = useState(() => ({ ...initialFormData }));
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(
    (e) => {
      if (isModalOpen) {
        const data_to_edit = localStorage.getItem("data_to_edit");
        if (data_to_edit) {
          const data = JSON.parse(data_to_edit);
          setFormData({ ...data, amount: data.amount * rate });
          setIsEditMode(true);
        } else {
          setFormData({ ...initialFormData });
        }
      }
      return (e) => {
        if (isEditMode) {
          localStorage.removeItem("data_to_edit");
        }
        setIsEditMode(false);
      };
    },
    [isModalOpen]
  );

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

          if (
            !formData.type ||
            !formData.amount ||
            !formData.category ||
            !formData.date
          ) {
            toast.error("Please update valid values", {
              autoClose: 500,
            });
            return;
          }

          formData.amount = formData.amount / rate;

          if (isEditMode) {
            updateTxn(formData);
            setIsEditMode(false);
            localStorage.removeItem("data_to_edit");
            notify("Transaction Updated Successfully!");
          } else {
            addTxn({ ...formData, id: uuidv4() });
            notify("Transaction Added Successfully!");
          }
          setIsModalOpen(false);
          showModal(false);
        }}
      >
        <h1>{isEditMode ? "Edit" : "Create"} Transaction</h1>
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
          {!formData.type && (
            <p className={TransactionPageStyles.error}>
              Please select the income field
            </p>
          )}
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <select name="category" id="category" onChange={updateFormdata}>
            {categories.map((c) => (
              <option key={c.key}>{c.value}</option>
            ))}
          </select>
          {!formData.category && (
            <p className={TransactionPageStyles.error}>
              Please select the category
            </p>
          )}
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
          {!formData.date && (
            <p className={TransactionPageStyles.error}>
              Please select the date
            </p>
          )}
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <p className={TransactionPageStyles.symbol}>{symbol}</p>
          <input
            name="amount"
            id="amount"
            type="text"
            placeholder="Enter the Amount"
            value={isNaN(formData.amount) ? 0 : formData.amount}
            onChange={updateFormdata}
          />
          {formData.amount <= 0 && (
            <p className={TransactionPageStyles.error}>
              Please update the amount
            </p>
          )}
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
              setIsEditMode(false);
              setIsModalOpen(false);
              showModal(false);
              localStorage.removeItem("data_to_edit");
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
    addTxn: (transaction) => {
      dispatch(addTransaction(transaction));
    },
    updateTxn: (transaction) => {
      dispatch(editTransaction(transaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
