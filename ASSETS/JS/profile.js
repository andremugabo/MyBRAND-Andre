/*================================================================
                              PRELOADER START
==================================================================*/
// Create the preloader element
const preloader = document.createElement("div");
preloader.classList.add("preloader");
preloader.style.zIndex = "5";
preloader.innerHTML = `
    <img src="ASSETS/IMAGES/loading.gif" alt="preloader">
`;

document.body.appendChild(preloader);

const displayPreloader = () => {
  preloader.classList.add("show");
};

const hidePreloader = () => {
  preloader.classList.remove("show");
};

/*================================================================
                              PRELOADER END
==================================================================*/

/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
const readLocalStorage = () => {
  let getData = window.localStorage.getItem("current_user");
  let db = JSON.parse(getData);
  return db;
};

var image_link = "";
let userData;
let logged = "";
logged = window.localStorage.getItem("current_user");
let theLoggedUser = JSON.parse(logged);

userData = readLocalStorage();
// userData.picture = "";
console.log(userData.picture);
document.querySelector(".user_logo").innerHTML = `
<img src="${userData.picture}" alt="user"><span>${userData.FullName}</span>
`;
// userData.description = "";
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
                    <span>FullName : </span><span>${userData.FullName}</span>
                </div>
                <div class="inner_profile_details">
                    <span>Email : </span><span>${userData.email}</span>
                </div>
                <div class="inner_profile_details">
                    <span>Description : </span><span>${userData.description}</span>
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
    document.querySelector(".error13").classList.add("hide");
  }

  if (document.querySelector("#admin_pic").value.trim() === "") {
    setError("admin_pic_error", "Your profile Picture is required");
  } else {
    document.querySelector(".error14").classList.add("hide");
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
    const description = document.querySelector("#admin_desc").value;
    const picture = document.querySelector("#admin_pic").value;
    const getToken = JSON.parse(window.localStorage.getItem("auth_token"));
    displayPreloader();
    const url = `https://my-brand-andre-be.onrender.com/user/${userData._id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
      body: JSON.stringify({
        description,
        picture,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        hidePreloader();

        if (data.status === 200) {
          window.localStorage.setItem(
            "current_user",
            JSON.stringify(data.getUser)
          );
          window.location.href = "profile.html";
        } else {
          displayFailMessage(document.querySelector(".msgLogin"), data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const getAdmin = JSON.parse(window.localStorage.getItem("current_user"));
  if (getAdmin) {
    const profilePic = document.querySelector(".profile_pic");

    // Check if u_pic contains a valid URL
    if (getAdmin.picture && getAdmin.picture.startsWith("http")) {
      const img = new Image();
      img.src = getAdmin.picture;
      img.onload = () => {
        profilePic.style.backgroundImage = `url(${img.src})`;
      };
    } else {
      // Handle invalid URL or missing image
      console.error("Invalid image URL:", getAdmin.picture);
      // Set a default image or display an error message
    }
  }
});
document.querySelector("#edit_adminP").addEventListener("submit", editProfile);

/* ==================================================================
                                FUNCTIONS
====================================================================*/
