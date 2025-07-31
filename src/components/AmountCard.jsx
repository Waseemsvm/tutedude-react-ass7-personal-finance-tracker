import { connect } from "react-redux";
import DashBoardPageStyles from "../styles/Dashboard.module.css";

function AmountCard(props) {
  const { title, amount, currency, symbol, rate } = props;
  return (
    <div className={DashBoardPageStyles["amount-card"]}>
      <h3 className={DashBoardPageStyles["amount-card-header"]}>{title}</h3>
      <h1 className={DashBoardPageStyles["amount-card-amount"]}>
        {symbol} {(amount * rate).toFixed(2)}
      </h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.profile.currency,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? "₹",
  };
};

export default connect(mapStateToProps)(AmountCard);
