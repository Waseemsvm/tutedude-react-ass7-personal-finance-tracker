import { Route, Routes } from "react-router";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import TransactionPage from "../pages/TransactionPage";
import BudgetsPage from "../pages/BudgetsPage";
import ProfilePage from "../pages/ProfilePage";
export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
