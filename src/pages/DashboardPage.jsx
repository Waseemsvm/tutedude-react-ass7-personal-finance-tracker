import { useEffect } from "react";
import AmountCard from "../components/AmountCard";
import DashboardChart from "../components/DashboardChart";
import DashboardPageStyles from "../styles/Dashboard.module.css";
import ApexCharts from "apexcharts";
import DashboardTable from "../components/DashboardTable";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const transactions = useSelector((state) => state.transactions);

  let totalIncome = 0;
  let totalExpenses = 0;
  const mCat = {};
  const mMonths = {};
  transactions.forEach((i) => {
    if (i.type === "Income") totalIncome += i.amount;
    else if (i.type === "Expense") {
      totalExpenses += i.amount;
      const month = new Date(i.date).toString().slice(4, 7);
      mMonths[month] ??= 0;
      mMonths[month] += i.amount;
      const cat = i.category;
      mCat[cat] ??= 0;
      mCat[cat] += i.amount;
    }
    // (catMap[i.category] ??= []).push(i);
  });
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

  console.log(mMonths);
  let savings = totalIncome - totalExpenses;
  let remBudget = 0;

  const summary = [
    {
      title: "Total Income",
      amount: totalIncome,
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
    },
    {
      title: "Remaining Budget",
      amount: remBudget,
    },
    {
      title: "Savings",
      amount: savings,
    },
  ];
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

  useEffect((e) => {
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
  }, []);

  return (
    <div className={DashboardPageStyles.dashboard}>
      <h1>Dashboard</h1>
      <div className={DashboardPageStyles["amount-card-cont"]}>
        {summary.map((s, idx) => (
          <AmountCard key={idx} title={s.title} amount={s.amount} />
        ))}
      </div>
      <div className={DashboardPageStyles["dash-chart-cont"]}>
        <DashboardChart id={"chart1"} chartTitle={"Monthly spending trend"} />
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
