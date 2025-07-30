import { connect } from "react-redux";
import Button from "../components/Button";
import ProgressIndItem from "../components/ProgressIndItem";
import BudgetsPageStyles from "../styles/BudgetsPage.module.css";
import { toast } from "react-toastify";
import { updateBudget } from "../app_state/TransactionReducer";
import { useState } from "react";

function BudgetsPage(props) {
  const { categories, rate, symbol, updateBudgetVal, transactions } = props;

  // const dateVal = new Date().toISOString().substr(0, 10);
  const [dateVal, setDateVal] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const notify = (e) =>
    toast("Budget Updated Successfully", { autoClose: 800 });
  // const [budgetVal, setBudgetVal] = useState(budget);

  const [selectedCat, setSelectedCat] = useState(categories[0]);

  const filteredTxns = transactions.filter(
    (txn) => txn.date === dateVal && txn.type === "Expense"
  );

  return (
    <div className={BudgetsPageStyles["budgets-page-cont"]}>
      <div className={BudgetsPageStyles["budgets-page"]}>
        <div className={BudgetsPageStyles["budgets-page-section1"]}>
          <div className={BudgetsPageStyles["budgets-page-header"]}>
            <h1>Budgets</h1>
            <input
              type="date"
              value={dateVal}
              onChange={(e) => {
                setDateVal(e.target.value);
              }}
            />
          </div>
          <div className={BudgetsPageStyles["budgets-page-budget-setter"]}>
            <select
              name=""
              id=""
              value={selectedCat.value}
              onChange={(e) => {
                const cat = categories.find(
                  // (cat) => cat.value === e.target.value
                  (cat) => cat.value === e.target.value
                );
                setSelectedCat(cat);
              }}
            >
              {categories.map((c) => (
                <option key={c.key}>{c.value}</option>
              ))}
            </select>
            <div className={BudgetsPageStyles["budget-cont"]}>
              <p className={BudgetsPageStyles.symbol}>{symbol}</p>
              <input
                type="text"
                placeholder="Set your Budget"
                value={Math.round(selectedCat.budget * rate)}
                onChange={(e) => {
                  const newselectedCat = { ...selectedCat };
                  newselectedCat.budget = Math.round(
                    Number(e.target.value) / rate
                  );
                  setSelectedCat(newselectedCat);
                }}
              />
            </div>
          </div>
          <div className={BudgetsPageStyles["budgets-page-save-btn"]}>
            <Button
              text={"Save"}
              onClick={(e) => {
                updateBudgetVal(selectedCat);
                notify();
              }}
            />
          </div>
        </div>
        <hr />
        <div className={BudgetsPageStyles["progress-cont"]}>
          {filteredTxns.map((t) => (
            <ProgressIndItem
              title={t.category}
              amount={t.amount}
              budget={categories.find((c) => c.value === t.category).budget}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.profile.currency,
    categories: state.profile.categories,
    transactions: state.transactions,
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
    updateBudgetVal: (budget) => {
      dispatch(updateBudget(budget));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetsPage);
