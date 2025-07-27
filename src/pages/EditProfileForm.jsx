export default function EditProfileForm() {
  return (
    <form action="">
      <div>
        <input type="file" />
        <input type="text" placeholder="Enter you Name" />
        <input type="email" placeholder="Enter your email" />
        <input type="dob" placeholder="Enter your DOB" />
        <select name="" id="">
          <option key="in">₹ ( Indian Rupee )</option>
          <option key="us">$ ( US Dollar )</option>
          <option key="eu">€ ( Euro )</option>
          <option key="po">£ ( British Pound Sterling )</option>
        </select>
      </div>
    </form>
  );
}

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