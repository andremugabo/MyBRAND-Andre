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
  const userEmail = document.querySelector("#userName").value;
  const userPassword = document.querySelector("#lPassword").value;
  let getData = readLocalStorage();
  if (getData === null) {
    displayFailMessage(
      document.querySelector(".msgLogin"),
      "REGISTER FIRST !!"
    );
  } else {
    for (const items of getData) {
      console.log(items);
      if (items.u_email === document.querySelector("#userName").value) {
        if (
          items.u_email === document.querySelector("#userName").value &&
          items.u_password === document.querySelector("#lPassword").value
        ) {
          if (document.querySelector("#userName").value === "andre@gmail.com") {
            loggedId = items.u_id;
            setLogged(loggedId);
            hide_login();
            window.location.href = "adminDashboard.html";
            return;
          } else {
            loggedId = items.u_id;
            setLogged(loggedId);
            hide_login();
            window.location.href = "index.html";
            return;
          }
        } else {
          displayFailMessage(
            document.querySelector(".msgLogin"),
            "WRONG CREDENTIAL !!!"
          );
          return;
        }
      } else {
        document.querySelector(".msgLogin").innerHTML = "";
        displayFailMessage(
          document.querySelector(".msgLogin"),
          "YOUR ARE NOT REGISTERED !!!"
        );
      }
    }
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
