import { connect } from "react-redux";
import ProgressIndItemStyles from "../styles/ProgressIndItem.module.css";

function ProgressIndItem(props) {
  const { title, budget, amount, symbol, rate } = props;

  const width =
    Math.round(amount * rate) / Math.round(budget * rate) > 1
      ? 100
      : (Math.round(amount * rate) / Math.round(budget * rate)) * 100;
  console.log(width);
  return (
    <div className={ProgressIndItemStyles["prog-ind-cont"]}>
      <div className={ProgressIndItemStyles["prog-ind-title"]}>
        <p>{title}</p>
        <p>
          {symbol} {Math.round(amount * rate)} / {Math.round(budget * rate)}
        </p>
      </div>
      <div className={ProgressIndItemStyles["progress-bar"]}>
        <div
          id="progress"
          style={{
            width: `${width}%`,
          }}
          className={`${ProgressIndItemStyles["progress"]} ${
            Math.round(amount * rate) / Math.round(budget * rate) > 1
              ? ProgressIndItemStyles.overspent
              : ""
          }`}
        ></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.profile.currency,
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? 1,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
  };
};

export default connect(mapStateToProps)(ProgressIndItem);
