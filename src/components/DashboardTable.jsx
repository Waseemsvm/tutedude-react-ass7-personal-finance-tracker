import { connect, useSelector } from "react-redux";
import DashboardPageStyles from "../styles/Dashboard.module.css";
import { filterByDate } from "../app_state/TransactionReducer";

function DashboardTable(props) {
  const {
    dateVal,
    expenses,
    updateDate,
    transactions,
    currency,
    symbol,
    rate,
  } = props;

  return (
    <div className={DashboardPageStyles["dash-table-cont"]}>
      <div className={DashboardPageStyles["dash-table-header"]}>
        <h3>Today's Expenses</h3>
        <input
          className={DashboardPageStyles["date-picker"]}
          type="date"
          value={dateVal}
          onChange={(e) => {
            updateDate(transactions, e.target.value);
          }}
        />
      </div>
      <table className={DashboardPageStyles["dash-table"]}>
        <thead>
          <tr>
            <th>Amount ( {symbol} )</th>
            <th>Category</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, idx) => (
            <tr key={idx}>
              <td>{Math.round(expense.amount * rate)}</td>
              <td>{expense.type}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dateVal: state.dashboard.filterDate,
    expenses: state.dashboard.expenses,
    transactions: state.transactions,
    currency: state.profile.currency,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? 1,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDate: (transactions, dateVal) => {
      dispatch(filterByDate(transactions, dateVal));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable);
