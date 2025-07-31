import ProfileStyles from "../styles/Profile.module.css";
import Button from "../components/Button";
import { connect } from "react-redux";
import { useModal } from "../components/TransactionProvider";
import { updateCurrency, updateProfile } from "../app_state/TransactionReducer";
import { toast } from "react-toastify";
import profilePic from "../assets/profile-pic.jpg";

function EditProfileForm(props) {
  const {
    name,
    currency,
    dob,
    email,
    avatar,
    updateProfile,
    currencyList,
    updateCurrency,
  } = props;
  const { showModal } = useModal();
  const notify = (e) =>
    toast("Profile Updated Successfully", { autoClose: 800 });

  const updateData = async (e) => {
    if (e.target.id === "avatar") {
      const fileData = await fileToDataURL(e.target.files[0]);
      if (fileData) return updateProfile(e.target.id, fileData);
    }

    updateProfile(e.target.id, e.target.value);
    if (e.target.id === "currency") {
      // const rate = currencyList.find((c) => c.key === e.target.value)?.rate;
      updateCurrency(e.target.value);
    }
  };

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }

  return (
    <form
      action=""
      className={ProfileStyles["form"]}
      onSubmit={(e) => {
        notify();
        e.preventDefault();
        showModal(false);
      }}
    >
      <div className={ProfileStyles["form-cont"]}>
        <div className={ProfileStyles["form-data"]}>
          <img src={avatar || profilePic} className={ProfileStyles["avatar"]} />
          <input type="file" id="avatar" onChange={updateData} />
        </div>
        <div className={ProfileStyles["form-data"]}>
          <input
            id="name"
            type="text"
            placeholder="Enter you Name"
            value={name}
            onChange={updateData}
          />
        </div>
        <div className={ProfileStyles["form-data"]}>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={updateData}
          />
        </div>
        <div className={ProfileStyles["form-data"]}>
          <input
            id="dob"
            type="date"
            placeholder="Enter your DOB"
            value={dob}
            onChange={updateData}
          />
        </div>
        <div className={ProfileStyles["form-data"]}>
          <select
            name="currency"
            id="currency"
            value={currency}
            onChange={updateData}
          >
            {currencyList.map((c) => (
              <option key={c.key} value={c.key}>
                {c.value}
              </option>
            ))}
          </select>
        </div>

        <div className={ProfileStyles["form-data"]}>
          <Button
            type="submit"
            text={"Close"}
            className={ProfileStyles["save-btn"]}
            onClick={(e) => showModal(false)}
          />
        </div>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (id, val) => {
      dispatch(updateProfile(id, val));
    },
    updateCurrency: (currency) => {
      dispatch(updateCurrency(currency));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    profilepic: state.profile.src,
    name: state.profile.name,
    avatar: state.profile.avatar,
    currency: state.profile.currency,
    dob: state.profile.dob,
    email: state.profile.email,
    currencyList: state.profile.currencyList,
    org_transactions: state.profile.orgTransactions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);

// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     var dataURL = canvas.toDataURL("image/png");

//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

// bannerImage = document.getElementById('bannerImg');
// imgData = getBase64Image(bannerImage);
// localStorage.setItem("imgData", imgData);

// var dataImage = localStorage.getItem('imgData');
// bannerImg = document.getElementById('tableBanner');
// bannerImg.src = "data:image/png;base64," + dataImage;
