import DashboardPageStyles from "../styles/Dashboard.module.css";

export default function DashboardTable() {
  return (
    <div className={DashboardPageStyles["dash-table-cont"]}>
      <div className={DashboardPageStyles["dash-table-header"]}>
        <h3>Today's Expenses</h3>
        <input className={DashboardPageStyles["date-picker"]} type="date" />
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
          <tr>
            <td>$5000</td>
            <td>Groceries</td>
            <td>Vegetables</td>
          </tr>
          <tr>
            <td>$2000</td>
            <td>Fun</td>
            <td>Tour to Taj Mahal</td>
          </tr>
          <tr>
            <td>$1500</td>
            <td>Travel</td>
            <td>Travelling in bus</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
