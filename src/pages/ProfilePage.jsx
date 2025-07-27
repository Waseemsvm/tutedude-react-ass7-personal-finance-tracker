import ProfilePageStyles from "../styles/Profile.module.css";
import profilePic from "../assets/profile-pic.jpg";
import AmountCard from "../components/AmountCard";
import Button from "../components/Button";
import { useModal } from "../components/TransactionProvider";
import Modal from "../components/Modal";
import EditProfileForm from "./EditProfileForm";

export default function ProfilePage() {
  const { showModal } = useModal();
  return (
    <div className={ProfilePageStyles.profile}>
      <div className={ProfilePageStyles["profile-card"]}>
        <div className={ProfilePageStyles["profile-card-header"]}>
          <img src={profilePic} alt="profile picture" />
          <div>
            <h1>Profile</h1>
            <h3>Waseem Akram P</h3>
            <p className={ProfilePageStyles.email}>waseemsvm14@gmail.com</p>
          </div>
        </div>
        <div className={ProfilePageStyles["currency-cont"]}>
          <p>Default Currency</p>
          <select name="" id="">
            <option key="in">₹ ( Indian Rupee )</option>
            <option key="us">$ ( US Dollar )</option>
            <option key="eu">€ ( Euro )</option>
            <option key="po">£ ( British Pound Sterling )</option>
          </select>
        </div>
        <div className={ProfilePageStyles["amount-card-cont"]}>
          <AmountCard amount={12000} title={"Total Expenses"} />
          <AmountCard amount={12000} title={"Total Savings"} />
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
        <Button text={"Save"} onClick={(e) => showModal(false)} />
      </Modal>
    </div>
  );
}
