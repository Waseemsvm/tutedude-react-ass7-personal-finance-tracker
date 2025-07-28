import ProgressIndItemStyles from "../styles/ProgressIndItem.module.css";

export default function ProgressIndItem({ title, budget, amount }) {
  return (
    <div className={ProgressIndItemStyles["prog-ind-cont"]}>
      <div className={ProgressIndItemStyles["prog-ind-title"]}>
        <p>Title</p>
        <p>₹7400 / 10000</p>
      </div>
      <div className={ProgressIndItemStyles["progress-bar"]}>
        <div id="progress" className={ProgressIndItemStyles["progress"]}></div>
      </div>
    </div>
  );
}
