let dataBase = [];
let loginUser = null;
let blogCategory = [];

/* ==============================================================
                      NAVBAR MODAL
=================================================================*/
document.getElementsByTagName("body")[0].innerHTML += `
<div class="hide modal_menu flex-center-center">
    <ul class="flex-center-center w-50">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="blog.html">Blogs</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="login.html">Login</a></li>
    </ul>
    <div class="close_modal flex-center-center"><img src="ASSETS/IMAGES/Close Window_52px.png" alt="close"></div>
</div>
`;
function display(element) {
  element.classList.remove("hide");
}

function hide(element) {
  element.classList.add("hide");
}

document.querySelector(".menu").addEventListener("click", function (e) {
  e.preventDefault();
  display(document.querySelector(".modal_menu"));
});

document.querySelector(".close_modal").addEventListener("click", function (e) {
  e.preventDefault();
  hide(document.querySelector(".modal_menu"));
});
/* ================================================================
                               FUNCTIONS 
===================================================================*/
// display a component
const displayElement = (element) => {
  element.classList.remove("hide");
};

// hide a component
const hideElement = (element) => {
  setTimeout(function () {
    element.classList.add("hide");
  }, 3000);
};

// change input border
const borderSuccess = (element) => {
  element.style.border = "2px solid green";
};

const borderFail = (element) => {
  element.style.border = "3px solid red";
};

// display msg
const displaySuccessMsg = (element, message) => {
  const header6 = document.createElement("h6");
  display(element);
  element.style.background = "#008000b5";
  element.appendChild(header6).innerText = `${message}`;
};

const displayFailMessage = (element, message) => {
  const header6 = document.createElement("h6");
  display(element);
  element.style.background = "#910000";
  element.appendChild(header6).innerText = `${message}`;
};

// check signup input errors

const signUpUserError = () => {
  if (document.querySelector("#setNames").value.trim() === "") {
    displayFailMessage(
      document.querySelector(".msgSignup"),
      "Fill out your Names !!!"
    );
    borderFail(document.querySelector("#names"));
  } else {
    borderSuccess(document.querySelector("#names"));
    hideElement(document.querySelector(".msgSignup"));
  }

  if (document.querySelector("#setUserEmail").value.trim() === "") {
    displayFailMessage(
      document.querySelector(".msgSignup"),
      "Fill out your Email !!"
    );
    borderFail(document.querySelector("#userEmail"));
  } else {
    borderSuccess(document.querySelector("#userEmail"));
    hideElement(document.querySelector(".msgSignup"));
  }

  if (document.querySelector("#setPassword").value.trim() === "") {
    displayFailMessage(
      document.querySelector(".msgSignup"),
      "Set a password !!!"
    );
    borderFail(document.querySelector("#userPassword"));
  } else {
    borderSuccess(document.querySelector("#userPassword"));
    hideElement(document.querySelector(".msgSignup"));
  }

  if (document.querySelector("#setCPassword").value.trim() === "") {
    displayFailMessage(
      document.querySelector(".msgSignup"),
      "Fill out your Email !!"
    );
    borderFail(document.querySelector("#userCPassword"));
  } else {
    borderSuccess(document.querySelector("#userCPassword"));
    hideElement(document.querySelector(".msgSignup"));
  }
};

/*----------------------------------------------------
                      SIGNUP 
------------------------------------------------------*/
//signup form event
const signUpFormEvent = (e) => {
  e.preventDefault();
  document.querySelector(".msgSignup").innerHTML = "";
  signUpUserError();
  signUP();
};

// login form event
const loginFormEvent = (e) => {
  e.preventDefault();
  document.querySelector(".msgLogin").innerHTML = "";
  let username = document.querySelector("#userName").value;
  let password = document.querySelector("#lPassword").value;

  loginUserError();
  checkIfUserExistForLogin(username, password);
};

//signup
const signUP = () => {
  let fullName = document.querySelector("#setNames").value;
  let email = document.querySelector("#setUserEmail").value;
  let password = document.querySelector("#setPassword").value;
  let cPassword = document.querySelector("#setCPassword").value;

  if (
    fullName.length >= 3 &&
    email.length >= 3 &&
    password.length >= 3 &&
    cPassword.length >= 3
  ) {
    if (password === cPassword) {
      loginUser = email;
      let user = createUser(fullName, email, password);
      checkIfUserExist(user, loginUser);
    } else {
      displayFailMessage(
        document.querySelector(".msgSignup"),
        "PASSWORD DON'T MATCH !!!!"
      );
    }
  } else {
    displayFailMessage(
      document.querySelector(".msgSignup"),
      "SOME OF THE ENTERED TEXT ARE TOO SHORT !!!!"
    );
  }
};

// check login  input errors

const loginUserError = () => {
  if (document.querySelector("#userName").value.trim() === "") {
    displayFailMessage(
      document.querySelector(".msgLogin"),
      "Enter a userName !!!"
    );
    borderFail(document.querySelector("#lUserName"));
  } else {
    borderSuccess(document.querySelector("#lUserName"));
    hideElement(document.querySelector(".msgLogin"));
  }

  if (document.querySelector("#lPassword").value.trim() === "") {
    displayFailMessage(
      document.querySelector(".msgLogin"),
      "Enter your password !!!"
    );
    borderFail(document.querySelector("#passwordL"));
    return;
  } else {
    borderSuccess(document.querySelector("#passwordL"));
    hideElement(document.querySelector(".msgLogin"));
  }
};

/*=====================================================
                      create user
=======================================================*/
const createUser = (fullName, email, password) => {
  data = {
    userAccount: {
      fullName: fullName,
      email: email,
      password: password,
      picture: "",
      role: "Guest",
    },
    blogList: [],
  };
  return data;
};

const pushUser2Db = (user) => {
  dataBase.push(user);
};

const updateLocalStorage = () => {
  let dataBaseText = JSON.stringify(dataBase);
  localStorage.setItem("myBrandAndre", dataBaseText);
};

const readLocalStorage = () => {
  let getData = localStorage.getItem("myBrandAndre");
  let db = JSON.parse(getData);
  return db;
};

/*====================================================================
                          SIGNUP PROCESS
======================================================================*/

const checkIfUserExist = (user, userEmail) => {
  dataBase = readLocalStorage();
  if (dataBase === null) {
    pushUser2Db(user);
    updateLocalStorage();
    setTimeout(function () {
      displaySuccessMsg(
        document.querySelector(".msgSignup"),
        "USER REGISTERED SUCCESSFULLY !!!"
      );
    }, 3000);
    window.location.href = "login.html";
  } else {
    for (let userIn of dataBase) {
      if (userIn.userAccount.email === userEmail) {
        displayFailMessage(
          document.querySelector(".msgSignup"),
          "USER EXIST, LOGIN !!!!"
        );
        document.getElementById("#signUpForm").reset();
        document
          .querySelector(".right_login")
          .querySelectorAll("input")
          .forEach(function (d) {
            d.style.border = "1px solid #1058C3";
          });
        return;
      }
    }

    pushUser2Db(user);
    updateLocalStorage();
    document.getElementById("signUpForm").reset();
    document
      .querySelector(".right_login")
      .querySelectorAll("input")
      .forEach(function (d) {
        d.style.border = "1px solid #1058C3";
      });
    setTimeout(function () {
      displaySuccessMsg(
        document.querySelector(".msgSignup"),
        "USER REGISTERED SUCCESSFULLY !!!"
      );
    }, 3000);
    window.location.href = "login.html";
  }
};

/*=======================================================================
                         LOGIN PROCESS 
=========================================================================*/

const checkIfUserExistForLogin = (userEmail, userPassword) => {
  dataBase = readLocalStorage();
  if (dataBase !== null) {
    // console.log(dataBase[0]);
    for (let lUser of dataBase) {
      if (lUser.userAccount.email === userEmail) {
        // console.log(lUser);
        if (
          lUser.userAccount.email === userEmail &&
          lUser.userAccount.password === userPassword
        ) {
          if (lUser.userAccount.role === "Admin") {
            window.location.href = "adminDashboard.html";
          } else if (lUser.userAccount.role === "Guest") {
            window.location.href = "guestDashboard.html";
          } else {
            displayFailMessage(
              document.querySelector(".msgLogin"),
              "  WRONG CREDENTIAL  !!!! "
            );
            return;
          }
        } else {
          displayFailMessage(
            document.querySelector(".msgLogin"),
            "  WRONG CREDENTIAL  !!!! "
          );
        }
      } else {
        displayFailMessage(
          document.querySelector(".msgLogin"),
          "  THERE IS NO USER WITH THIS EMAIL  !!!! "
        );
        return;
      }
    }
  } else {
    displayFailMessage(
      document.querySelector(".msgLogin"),
      "  FIRST REGISTER  !!!! "
    );
    return;
  }
};

/* =======================================================================
                                 EVENT FUNCTIONS
==========================================================================*/
const eventFunction = () => {
  if (document.getElementById("signUpForm")) {
    document
      .getElementById("signUpForm")
      .addEventListener("submit", signUpFormEvent);
  }

  if (document.getElementById("loginForm")) {
    document
      .getElementById("loginForm")
      .addEventListener("submit", loginFormEvent);
  }
};
eventFunction();
