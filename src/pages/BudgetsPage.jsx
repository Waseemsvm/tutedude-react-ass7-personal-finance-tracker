import { connect } from "react-redux";
import Button from "../components/Button";
import ProgressIndItem from "../components/ProgressIndItem";
import BudgetsPageStyles from "../styles/BudgetsPage.module.css";
import { toast } from "react-toastify";

function BudgetsPage(props) {
  const { categories, budget, rate, symbol } = props;

  const dateVal = new Date().toISOString().substr(0, 10);
  const notify = (e) => toast("Budget Updated Successfully");

  return (
    <div className={BudgetsPageStyles["budgets-page-cont"]}>
      <div className={BudgetsPageStyles["budgets-page"]}>
        <div className={BudgetsPageStyles["budgets-page-section1"]}>
          <div className={BudgetsPageStyles["budgets-page-header"]}>
            <h1>Budgets</h1>
            <input type="date" value={dateVal} onChange={(e) => {}} />
          </div>
          <div className={BudgetsPageStyles["budgets-page-budget-setter"]}>
            <select name="" id="">
              {categories.map((c) => (
                <option key={c.key}>{c.value}</option>
              ))}
            </select>
            <div className={BudgetsPageStyles['budget-cont']}>
              <p className={BudgetsPageStyles.symbol}>{symbol}</p>
              <input
                type="text"
                placeholder="Set your Budget"
                value={budget}
                onChange={(e) => {}}
              />
            </div>
          </div>
          <div className={BudgetsPageStyles["budgets-page-save-btn"]}>
            <Button
              text={"Save"}
              onClick={(e) => {
                notify();
              }}
            />
          </div>
        </div>
        <hr />
        <div className={BudgetsPageStyles["progress-cont"]}>
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
          <ProgressIndItem title={"Title"} amount={7400} budget={10000} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.profile.currency,
    categories: state.profile.categories,
    budget: state.profile.budget,
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? 1,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
  };
};

export default connect(mapStateToProps)(BudgetsPage);
