/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
const readLocalStorage = () => {
  let getData = window.localStorage.getItem("users");
  let db = JSON.parse(getData);
  return db;
};
const setLogged = (userId) => {
  let userIdText = JSON.stringify(userId);
  window.localStorage.setItem("loggedUser", userIdText);
};

let upLoaded_image = "";
let userData;
let logged = "";
logged = window.localStorage.getItem("loggedUser");
let id = JSON.parse(logged);
userData = readLocalStorage();
console.log(id);
console.log(userData);
let userObject = userData.find((rec) => rec.u_id === id);
console.log(userObject.u_name);
document.querySelector(".inner_profile_section").innerHTML = `
          <div class="real_profile">
          <div class="left_real_profile flex-center-items">
              <h5>Blogger&nbsp;Profile</h5>
              <div class="profile_pic">
              </div>
          </div>
          <div class="right_real_profile">
              <div class="edit_notification">
                  <button type="button" class="edit_model"><img src="ASSETS/IMAGES/Edit_52px.png" alt="edit">Edit&nbsp;Profile</button>
                  <div class="notifocation flex-center-items">
                      <img src="ASSETS/IMAGES/Bell_52px.png" alt="notifocation"><span class="flex-center-center">3</span> <h6>New&nbsp;Comment</h6>
                  </div>
              </div>
              <div class="profile_details">
                  <div class="inner_profile_details">
                      <span>FullName : </span><span>${userObject.u_name}</span>
                  </div>
                  <div class="inner_profile_details">
                      <span>Email : </span><span>${userObject.u_email}</span>
                  </div>
                  <div class="inner_profile_details">
                      <span>Description : </span><span>${userObject.u_dec}</span>
                  </div>
  
              </div>
          </div>
  
          </div>
  
  `;

const setError = (idError, message) => {
  document.getElementById(idError).classList.remove("hide");
  document.getElementById(idError).innerText = message;
};
const resetError = (idError) => {
  document.getElementById(idError).classList.add("hide");
};
const displaySuccessMsg = (element, message) => {
  const header6 = document.createElement("h6");
  element.classList.remove("hide");
  element.style.background = "#4cb54cb5";
  element.appendChild(header6).innerText = `${message}`;
  setTimeout(() => {
    element.classList.add("hide");
  }, 2000);
};

const displayFailMessage = (element, message) => {
  const header6 = document.createElement("h6");
  element.classList.remove("hide");
  element.style.background = "#770a0afc";
  element.appendChild(header6).innerText = `${message}`;
  setTimeout(() => {
    element.classList.add("hide");
  }, 2000);
};
const validateProfile = () => {
  if (document.querySelector("#admin_desc").value.trim() === "") {
    setError("admim_desc_error", "Your short description is required");
  } else {
    document.querySelector(".error15").classList.add("hide");
  }

  if (document.querySelector("#admin_pic").value.trim() === "") {
    setError("admin_pic_error", "Your profile Picture is required");
  } else {
    document.querySelector(".error16").classList.add("hide");
  }
};

const editProfile = (e) => {
  e.preventDefault();
  document.querySelector(".msgEditProfile").innerHTML = "";
  validateProfile();
  if (document.querySelector("#admin_desc").value === "") {
    displayFailMessage(
      document.querySelector(".msgEditProfile"),
      "PLEASE FILL OUT A SHORT DESCRIPTION OF YOURS"
    );
    return;
  } else {
  }
};

document.querySelector("#edit_adminP").addEventListener("submit", editProfile);

/* ==================================================================
                                  FUNCTIONS
  ====================================================================*/
document.querySelector("#admin_pic").addEventListener("change", () => {
  let fReader = new FileReader();
  fReader.addEventListener("load", () => {
    upLoaded_image = fReader.result;
  });
  fReader.readAsDataURL(this.files[0]);
});
