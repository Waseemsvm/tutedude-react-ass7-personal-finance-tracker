import ProfileStyles from "../styles/Profile.module.css";
import Button from "../components/Button";
import { connect } from "react-redux";
import { useModal } from "../components/TransactionProvider";
import { updateProfile } from "../app_state/TransactionReducer";

function EditProfileForm(props) {
  const { profilepic, name, currency, dob, email, updateProfile } = props;
  const { showModal } = useModal();

  const updateData = (e) => {
    updateProfile(e.target.id, e.target.value);
  };

  return (
    <form
      action=""
      className={ProfileStyles["form"]}
      onSubmit={(e) => {
        e.preventDefault();
        showModal(false);
      }}
    >
      <div className={ProfileStyles["form-cont"]}>
        <div className={ProfileStyles["form-data"]}>
          <img src={profilepic} className={ProfileStyles["avatar"]} />
          <input type="file" onChange={(e) => {}} />
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
        <div className={ProfileStyles["form-data"]} onChange={updateData}>
          <select name="" id="currency">
            <option key="in">₹ ( Indian Rupee )</option>
            <option key="us">$ ( US Dollar )</option>
            <option key="eu">€ ( Euro )</option>
            <option key="po">£ ( British Pound Sterling )</option>
          </select>
        </div>

        <div className={ProfileStyles["form-data"]}>
          <Button
            type="submit"
            text={"Save"}
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
  };
};

const mapStateToProps = (state) => {
  return {
    profilepic: state.profile.src,
    name: state.profile.name,
    currency: state.profile.currency,
    dob: state.profile.dob,
    email: state.profile.email,
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
