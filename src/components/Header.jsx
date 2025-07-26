import { Link, NavLink } from "react-router";
import HeaderStyles from "../styles/Header.module.css";
import financeImg from "../assets/global-finance.png";

export default function Header() {
  const aLinks = [
    {
      route: "/",
      text: "Dashboard",
    },
    {
      route: "/transactions",
      text: "Transactions",
    },
    {
      route: "/budgets",
      text: "Budgets",
    },
    {
      route: "/profile",
      text: "Profile",
    },
  ];

  return (
    <nav className={HeaderStyles.header}>
      <img src={financeImg} alt="global finance" />
      <ul>
        {aLinks.map((link) => (
          <li key={link.route.slice(1)}>
            <NavLink
              className={({ isActive }) => {
                return isActive ? HeaderStyles["link-active"] : null;
              }}
              to={link.route}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
