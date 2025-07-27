import { useEffect } from "react";
import AmountCard from "../components/AmountCard";
import DashboardChart from "../components/DashboardChart";
import DashboardPageStyles from "../styles/Dashboard.module.css";
import ApexCharts from "apexcharts";
import DashboardTable from "../components/DashboardTable";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  calculateCatWiseData,
  calculateDashboardData,
  calculateMonthlySpend,
} from "../app_state/TransactionReducer";

function DashboardPage(props) {
  const {
    transactions,
    dashboardData,
    mCat,
    mMonths,
    calculateDashboardData,
    calculateCatWiseData,
    calculateMonthlySpend,
    symbol,
  } = props;

  useEffect((e) => {
    calculateDashboardData(transactions);
    calculateCatWiseData(transactions);
    calculateMonthlySpend(transactions);
  }, []);

  useEffect(
    (e) => {
      const chart1Opts = {
        chart: {
          type: "bar",
        },
        series: barChartSeries,
      };

      const chart2Opts = {
        chart: {
          type: "pie",
        },
        series: Object.values(mCat),
        labels: Object.keys(mCat),
      };

      const chart1 = new ApexCharts(
        document.querySelector("#chart1"),
        chart1Opts
      );
      const chart2 = new ApexCharts(
        document.querySelector("#chart2"),
        chart2Opts
      );
      chart1.render();
      chart2.render();

      return () => {
        chart1.destroy();
        chart2.destroy();
      };
    },
    [mCat, mMonths]
  );

  const barChartSeries = [
    {
      data: [],
    },
  ];
  for (let m in mMonths) {
    barChartSeries[0].data.push({
      x: m,
      y: mMonths[m],
    });
  }

  const summary = [
    {
      title: "Total Income",
      // amount: totalIncome,
      amount: dashboardData.totalIncome,
    },
    {
      title: "Total Expenses",
      // amount: totalExpenses,
      amount: dashboardData.totalExpenses,
    },
    {
      title: "Remaining Budget",
      // amount: remBudget,
      amount: dashboardData.remBudget,
    },
    {
      title: "Savings",
      // amount: savings,
      amount: dashboardData.savings,
    },
  ];

  return (
    <div className={DashboardPageStyles.dashboard}>
      <h1>Dashboard</h1>
      <div className={DashboardPageStyles["amount-card-cont"]}>
        {summary.map((s, idx) => (
          <AmountCard key={idx} title={s.title} amount={s.amount} />
        ))}
      </div>
      <div className={DashboardPageStyles["dash-chart-cont"]}>
        <DashboardChart
          id={"chart1"}
          chartTitle={"Monthly spending trend (" + symbol + ")"}
        />
        <DashboardChart
          id={"chart2"}
          chartTitle={"Category-wise expense split"}
        />
      </div>
      <div>
        <DashboardTable />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    calculateMonthlySpend: (transactions) => {
      dispatch(calculateMonthlySpend(transactions));
    },
    calculateCatWiseData: (transactions) => {
      dispatch(calculateCatWiseData(transactions));
    },
    calculateDashboardData: (transactions) => {
      dispatch(calculateDashboardData(transactions));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.map((t) => ({
      ...t,
      amount: Math.round(
        t.amount *
          (state.profile.currencyList.find(
            (c) => c.key === state.profile.currency
          )?.rate ?? 1)
      ),
    })),
    dashboardData: state.dashboard,
    mCat: state.dashboard.mCat,
    mMonths: state.dashboard.mMonths,
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? 1,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
