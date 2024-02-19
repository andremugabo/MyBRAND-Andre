let userDB = [];
let loginUser = null;
const signUpForm = document.getElementById("signUpForm");
const fullName = document.getElementById("setNames");
const SEmail = document.getElementById("setUserEmail");
const SPassword = document.getElementById("setPassword");
const CSpassword = document.getElementById("setCPassword");

/* ================================================================
                               FUNCTIONS 
===================================================================*/
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
const validateSignUpInput = () => {
  if (document.querySelector("#setNames").value.trim() === "") {
    setError("name_error", "Your full name is require");
  } else {
    resetError("name_error");
  }

  if (document.querySelector("#setUserEmail").value.trim() === "") {
    setError("userEmail_error", "Your Email is require");
  } else {
    document.querySelector(".error2").classList.add("hide");
  }

  if (document.querySelector("#setPassword").value.trim() === "") {
    setError("pass_error", "Set a Password");
  } else {
    document.querySelector(".error3").classList.add("hide");
  }

  if (document.querySelector("#setCPassword").value.trim() === "") {
    setError("cpass_error", "Confirm your Password");
  } else {
    document.querySelector(".error4").classList.add("hide");
  }
};
// SIGNUP EVENT
const signUpFormEvent = (e) => {
  e.preventDefault();
  document.querySelector(".msgSignup").innerHTML = "";
  validateSignUpInput();
  // localStorage.removeItem("users");
  if (
    document.getElementById("setNames").value.length >= 3 &&
    document.querySelector("#setUserEmail").value.length >= 3 &&
    document.querySelector("#setPassword").value.length >= 3 &&
    document.querySelector("#setCPassword").value.length >= 3
  ) {
    if (
      document.querySelector("#setPassword").value ===
      document.querySelector("#setCPassword").value
    ) {
      let getData = readLocalStorage();
      if (getData === null) {
        let id = 1;
        let user = createUser(
          id,
          document.getElementById("setNames").value,
          document.querySelector("#setUserEmail").value,
          document.querySelector("#setPassword").value
        );
        userDB.push(user);
        updateLocalStorage(userDB);
        displaySuccessMsg(
          document.querySelector(".msgSignup"),
          "YOU ARE REGISTERED SUCCESSFULLY!! YOU CAN LOGIN "
        );
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        userDB = getData;
        for (const items of userDB) {
          if (items.u_email === document.querySelector("#setUserEmail").value) {
            displayFailMessage(
              document.querySelector(".msgSignup"),
              "THIS EMAIL IS ALREADY REGISTERED !!"
            );
            return;
          }
        }
        let currentDbLength = userDB.length;
        let id = currentDbLength + 1;
        let user = createUser(
          id,
          document.getElementById("setNames").value,
          document.querySelector("#setUserEmail").value,
          document.querySelector("#setPassword").value
        );
        userDB.push(user);
        updateLocalStorage(userDB);
        displaySuccessMsg(
          document.querySelector(".msgSignup"),
          "YOU ARE REGISTERED SUCCESSFULLY!! YOU CAN LOGIN "
        );
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    } else {
      displayFailMessage(
        document.querySelector(".msgSignup"),
        "PASSWORD DON'T MATCH !!!"
      );
    }
  } else {
    displayFailMessage(
      document.querySelector(".msgSignup"),
      "TEXT FIELD ARE EMPTY OR TOO SHORT TEXT"
    );
  }
};
if (document.getElementById("signUpForm")) {
  document
    .getElementById("signUpForm")
    .addEventListener("submit", signUpFormEvent);
}
/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
const createUser = (u_id, u_name, u_email, u_password) => {
  userAccount = {
    u_id: u_id,
    u_name: u_name,
    u_email: u_email,
    u_password: u_password,
    u_pic: "",
    u_dec: "",
  };

  return userAccount;
};

const readLocalStorage = () => {
  let getData = window.localStorage.getItem("users");
  let db = JSON.parse(getData);
  return db;
};

const updateLocalStorage = (data) => {
  let dataBaseText = JSON.stringify(data);
  window.localStorage.setItem("users", dataBaseText);
};
