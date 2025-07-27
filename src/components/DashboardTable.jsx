import { connect, useSelector } from "react-redux";
import DashboardPageStyles from "../styles/Dashboard.module.css";
import { filterByDate } from "../app_state/TransactionReducer";

function DashboardTable(props) {
  const { dateVal, expenses, updateDate, transactions } = props;

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
            <th>Amount</th>
            <th>Category</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, idx) => (
            <tr key={idx}>
              <td>{expense.amount}</td>
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
