let dataBase = [];
let loginUser = null;
let blogCategory = [];
const signUpForm = document.getElementById("signUpForm");
const fullName = document.getElementById("setNames");
const SEmail = document.getElementById("setUserEmail");
const SPassword = document.getElementById("setPassword");
const CSpassword = document.getElementById("setCPassword");

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
const setError = (idError, message) => {
  document.getElementById(idError).classList.remove("hide");
  document.getElementById(idError).innerText = message;
};
const resetError = (idError) => {
  document.getElementById(idError).classList.add("hide");
};

// const resetError = (element, idError) => {
//   document.getElementById(idError).innerText = "";
//   element.parentElement.style.border = "1px solid #1058C3";
//   document.getElementById(idError).classList.toggle("hide");
// };
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
//validate contact form

const validateContactInput = () => {
  if (document.querySelector("#contact_name").value.trim() === "") {
    setError("contact_name_error", "Your name is require");
  } else {
    document.querySelector(".error8").classList.add("hide");
  }

  if (document.querySelector("#contact_email").value.trim() === "") {
    setError("contact_email_error", "Your Email require");
  } else {
    document.querySelector(".error9").classList.add("hide");
  }

  if (document.querySelector("#contact_msg").value.trim() === "") {
    setError("contact_msg_error", "Your Message require");
  } else {
    document.querySelector(".error10").classList.add("hide");
  }
};

//validate blog comment

const validateCommentInput = () => {
  if (document.querySelector("#comment_msg").value.trim() === "") {
    setError("comment_msg_error", "Your Comment is require");
  } else {
    document.querySelector(".error11").classList.add("hide");
  }
};
// SIGNUP EVENT
const signUpFormEvent = (e) => {
  e.preventDefault();
  document.querySelector(".msgSignup").innerHTML = "";
  validateSignUpInput();
  const fullName = document.querySelector("#setNames").value;
  const SEmail = document.querySelector("#setUserEmail").value;
  const SPassword = document.querySelector("#setPassword").value;
  const CSpassword = document.querySelector("#setCPassword").value;

  if (
    document.getElementById("setNames").value.length >= 3 &&
    document.querySelector("#setUserEmail").value.length >= 3 &&
    document.querySelector("#setPassword").value.length >= 3 &&
    document.querySelector("#setCPassword").value.length >= 3
  ) {
    if (SPassword === CSpassword) {
      const userData = readLocalStorage();
      if (userData !== null) {
        for (let userIn of userData) {
          // console.log(userIn.userAccount.email);
          if (userIn.userAccount.email === SEmail) {
            displayFailMessage(
              document.querySelector(".msgSignup"),
              "THIS EMAIL IS REGISTERED !!!"
            );
            return;
          }
        }
        dataBase = userData;
        let user = createUser(fullName, SEmail, SPassword);
        dataBase.push(user);
        updateLocalStorage(dataBase);
        displaySuccessMsg(
          document.querySelector(".msgSignup"),
          "YOU ARE REGISTERED SUCCESSFULLY!! YOU CAN LOGIN "
        );
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        dataBase = userData;
        let user = createUser(fullName, SEmail, SPassword);
        // dataBase.push(user);
        updateLocalStorage(user);
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
      "TEXT FILL ARE EMPTY OR TOO SHORT TEXT"
    );
  }
};

//LOGIN EVENT
const loginFormEvent = (e) => {
  e.preventDefault();
  document.querySelector(".msgLogin").innerHTML = "";

  validateLoginInput();
  const userEmail = document.querySelector("#userName").value;
  const userPassword = document.querySelector("#lPassword").value;
  ifLoginExit(userEmail, userPassword);
};

function ifLoginExit(email, password) {
  let array = readLocalStorage();

  if (array === null) {
    displayFailMessage(
      document.querySelector(".msgLogin"),
      "REGISTER FIRST !!"
    );
    return;
  } else {
    console.log(email);
    console.log(password);
    for (let user of array) {
      if (
        user.userAccount.email === email &&
        user.userAccount.password === password
      ) {
        displaySuccessMsg(
          document.querySelector(".msgLogin"),
          "YOU ARE WELCOME AGAIN !! "
        );
        setTimeout(() => {
          window.location.href = "guestDashboard.html";
        }, 2000);
      } else {
      }
    }
  }
}

//CONTACT EVENT
const contactFormEvent = (e) => {
  e.preventDefault();
  validateContactInput();
};

//COMMENT EVENT
const commentFormEvent = (e) => {
  e.preventDefault();
  validateCommentInput();
};

/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
//CREATE A USER
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

//UPDATE LOCAL STORAGE

const updateLocalStorage = (db) => {
  let dataBaseText = JSON.stringify(db);
  window.localStorage.setItem("myBrandAndre", dataBaseText);
};

// READ LOCAL STORAGE

const readLocalStorage = () => {
  let getData = window.localStorage.getItem("myBrandAndre");
  let db = JSON.parse(getData);
  return db;
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

  if (document.getElementById("contactForm")) {
    document
      .getElementById("contactForm")
      .addEventListener("submit", contactFormEvent);
  }

  if (document.getElementById("commentForm")) {
    document
      .getElementById("commentForm")
      .addEventListener("submit", commentFormEvent);
  }
};
eventFunction();
