import ProfilePageStyles from "../styles/Profile.module.css";
import profilePic from "../assets/profile-pic.jpg";
import AmountCard from "../components/AmountCard";
import Button from "../components/Button";
import { useModal } from "../components/TransactionProvider";
import Modal from "../components/Modal";
import EditProfileForm from "./EditProfileForm";
import { connect } from "react-redux";
import { calculateDashboardData } from "../app_state/TransactionReducer";
import { useEffect } from "react";

function ProfilePage(props) {
  const { showModal } = useModal();

  const {
    savings,
    totalExpenses,
    transactions,
    calculateDashboardData,
    dob,
    email,
    name,
    currency,
    rate,
    categories,
  } = props;

  useEffect((e) => {
    calculateDashboardData(transactions, categories);
  }, []);

  console.log(transactions, totalExpenses, savings);

  return (
    <div className={ProfilePageStyles.profile}>
      <div className={ProfilePageStyles["profile-card"]}>
        <div className={ProfilePageStyles["profile-card-header"]}>
          <img src={profilePic} alt="profile picture" />
          <div>
            <h1>Profile</h1>
            <h3>{name}</h3>
            <p className={ProfilePageStyles.email}>{email}</p>
          </div>
        </div>
        <div className={ProfilePageStyles["currency-cont"]}>
          <p>
            {" "}
            {/* <strong>Default Currency:</strong> ₹ ( Indian Rupee ) */}
            <strong>Default Currency:</strong> {currency}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dob}
          </p>
        </div>
        <div className={ProfilePageStyles["amount-card-cont"]}>
          <AmountCard
            amount={Math.round(totalExpenses * rate)}
            title={"Total Expenses"}
          />
          <AmountCard
            amount={Math.round(savings * rate)}
            title={"Total Savings"}
          />
        </div>
        <div className={ProfilePageStyles["profile-card-footer"]}>
          <Button
            text={"Edit"}
            onClick={(e) => {
              showModal(true);
            }}
          />
        </div>
      </div>
      <Modal>
        <EditProfileForm />
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    calculateDashboardData: (transactions, categories) => {
      dispatch(calculateDashboardData(transactions, categories));
    },
  };
};

const mapStateToProps = (state) => {
  console.log(state.dashboard);
  return {
    savings: state.dashboard.savings,
    totalExpenses: state.dashboard.totalExpenses,
    categories: state.profile.categories,
    transactions: state.transactions,
    dob: state.profile.dob,
    email: state.profile.email,
    name: state.profile.name,
    currency: state.profile.currency,
    rate:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.rate ?? 1,
    symbol:
      state.profile.currencyList.find((c) => c.key === state.profile.currency)
        ?.symbol ?? "₹",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
