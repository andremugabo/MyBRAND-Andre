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

let loggedId = null;
const setError = (idError, message) => {
  document.getElementById(idError).classList.remove("hide");
  document.getElementById(idError).innerText = message;
};
const resetError = (idError) => {
  document.getElementById(idError).classList.add("hide");
};

// display msg
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

//validate login
const validateLoginInput = () => {
  if (document.querySelector("#userName").value.trim() === "") {
    setError("usernameL_error", "Your Username is require");
  } else {
    document.querySelector(".error6").classList.add("hide");
  }

  if (document.querySelector("#lPassword").value.trim() === "") {
    setError("passwordL_error", "Your Password require");
  } else {
    document.querySelector(".error7").classList.add("hide");
  }
};

//LOGIN EVENT
const loginFormEvent = (e) => {
  e.preventDefault();
  document.querySelector(".msgLogin").innerHTML = "";

  validateLoginInput();
  const email = document.querySelector("#userName").value;
  const password = document.querySelector("#lPassword").value;

  if (
    document.querySelector("#userName").value.length >= 4 &&
    document.querySelector("#lPassword").value.length >= 4
  ) {
    displayPreloader();

    fetch("https://my-brand-andre-be.onrender.com/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        hidePreloader();

        // console.log(data.token);
        window.localStorage.setItem("auth_token", JSON.stringify(data.token));
        window.localStorage.setItem(
          "current_user",
          JSON.stringify(data.loginUser)
        );
        if (data.loggedUser === true) {
          hide_login();
          window.location.href = "adminDashboard.html";
        } else if (data.loggedUser === false) {
          hide_login();
          window.location.href = "index.html";
        } else {
          displayFailMessage(document.querySelector(".msgLogin"), data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    displayFailMessage(
      document.querySelector(".msgLogin"),
      " NOT ENOUGH CHARACTER !!! "
    );
  }
};
hide_login = () => {
  document.querySelector(".btn_login").classList.add("hide");
  document.querySelector(".btn_logout").classList.remove("hide");
};
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
/* =======================================================================
                                 EVENT FUNCTIONS
==========================================================================*/
if (document.getElementById("loginForm")) {
  document
    .getElementById("loginForm")
    .addEventListener("submit", loginFormEvent);
}
