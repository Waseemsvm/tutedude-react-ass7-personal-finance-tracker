import { Link, NavLink, useNavigate } from "react-router";
import HeaderStyles from "../styles/Header.module.css";
import financeImg from "../assets/global-finance.png";
import hamMenuIcn from "../assets/ham-menu.svg";
import closeIcn from "../assets/close-icon.svg";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className={`${HeaderStyles["lead-cont"]}`}>
        <img
          src={menuOpen ? closeIcn : hamMenuIcn}
          alt=""
          className={HeaderStyles["menu-btn"]}
          onClick={(e) => {
            setMenuOpen(!menuOpen);
          }}
        />
        <img src={financeImg} alt="global finance" />
      </div>
      <ul className={menuOpen ? HeaderStyles.open : HeaderStyles.close}>
        {aLinks.map((link) => (
          <li
            key={link.route.slice(1)}
            onClick={(e) => {
              navigate(link.route);
              setMenuOpen(!menuOpen);
            }}
          >
            <NavLink
              className={({ isActive }) => {
                return isActive ? HeaderStyles["link-active"] : null;
              }}
              to={link.route}
              onClick={(e) => {
                setMenuOpen(!menuOpen);
              }}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
