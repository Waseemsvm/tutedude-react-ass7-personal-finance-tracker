import DashboardPageStyles from "../styles/Dashboard.module.css";

export default function DashboardChart({ id, chartTitle }) {
  return (
    <div className={DashboardPageStyles["chart-card"]}>
      <h2>{chartTitle}</h2>
      <div id={id} className={DashboardPageStyles["chart-div"]}></div>
    </div>
  );
}
