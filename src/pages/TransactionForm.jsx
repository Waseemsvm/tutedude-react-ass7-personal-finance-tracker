import { connect } from "react-redux";
import Button from "../components/Button";
import { useModal } from "../components/TransactionProvider";
import TransactionPageStyles from "../styles/TransactionPage.module.css";

function TransactionForm(props) {
  const { categories, types } = props;
  const { showModal } = useModal();
  return (
    <div>
      <div>
        <h1>Create Transaction</h1>
        <div className={TransactionPageStyles["form-data"]}>
          <select name="" id="">
            {types.map((t) => (
              <option key={t.key}>{t.value}</option>
            ))}
          </select>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <select name="" id="">
            {categories.map((c) => (
              <option key={c.key}>{c.value}</option>
            ))}
          </select>
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <input type="date" placeholder="Enter the date" />
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <input type="text" placeholder="Enter the Amount" />
        </div>
        <div className={TransactionPageStyles["form-data"]}>
          <textarea
            name=""
            id=""
            placeholder="Enter the description"
          ></textarea>
        </div>
      </div>
      <div className={TransactionPageStyles["form-data"]}>
        <Button
          className={TransactionPageStyles["save-btn"]}
          text={"Save"}
          onClick={(e) => {
            showModal(false);
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.profile.categories,
    types: state.profile.types,
  };
};

export default connect(mapStateToProps)(TransactionForm);
