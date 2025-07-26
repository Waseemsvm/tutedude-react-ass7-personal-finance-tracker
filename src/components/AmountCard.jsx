import DashBoardPageStyles from "../styles/Dashboard.module.css";

export default function AmountCard({ title, amount }) {
  return (
    <div className={DashBoardPageStyles["amount-card"]}>
      <h3 className={DashBoardPageStyles["amount-card-header"]}>{title}</h3>
      <h1 className={DashBoardPageStyles["amount-card-amount"]}>${amount}</h1>
    </div>
  );
}
