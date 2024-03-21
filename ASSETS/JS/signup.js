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
      const FullName = document.getElementById("setNames").value;
      const email = document.querySelector("#setUserEmail").value;
      const password = document.querySelector("#setPassword").value;
      displayPreloader();
      fetch("https://my-brand-andre-be.onrender.com/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          FullName,
          email,
          password,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          hidePreloader();

          console.log(data);
          if (data.status === 200) {
            displaySuccessMsg(
              document.querySelector(".msgSignup"),
              "YOU ARE REGISTERED SUCCESSFULLY!! YOU CAN LOGIN "
            );
            setTimeout(() => {
              window.location.href = "login.html";
            }, 2000);
          } else if (data.status === 400) {
            displayFailMessage(
              document.querySelector(".msgSignup"),
              "VALIDATION ERROR CHECK YOUR INPUT !!"
            );
            setTimeout(() => {
              window.location.href = "signup.html";
            }, 2000);
          } else if (data.status === 422) {
            displayFailMessage(
              document.querySelector(".msgSignup"),
              "THIS EMAIL IS ALREADY REGISTERED !!"
            );
            setTimeout(() => {
              window.location.href = "login.html";
            }, 2000);
          }
        });
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
