import Button from "../components/Button";
import ProgressIndItem from "../components/ProgressIndItem";
import BudgetsPageStyles from "../styles/BudgetsPage.module.css";

export default function BudgetsPage() {
  return (
    <div className={BudgetsPageStyles["budgets-page-cont"]}>
      <div className={BudgetsPageStyles["budgets-page"]}>
        <div className={BudgetsPageStyles["budgets-page-section1"]}>
          <div className={BudgetsPageStyles["budgets-page-header"]}>
            <h1>Budgets</h1>
            <input type="date" />
          </div>
          <div className={BudgetsPageStyles["budgets-page-budget-setter"]}>
            <select name="" id="">
              <option value="">Groceries</option>
              <option value="">Groceries</option>
              <option value="">Groceries</option>
              <option value="">Groceries</option>
            </select>
            <input type="text" placeholder="Set your Budget" />
          </div>
          <div className={BudgetsPageStyles["budgets-page-save-btn"]}>
            <Button text={"Save"} />
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
