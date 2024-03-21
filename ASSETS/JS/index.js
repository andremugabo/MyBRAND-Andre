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
        <li class="btn_login"><a href="login.html">Login</a></li>
        <li><button class="logoutDash btn_logout hide" >Logout</button></li>

    </ul>
    <div class="close_modal flex-center-center"><img src="ASSETS/IMAGES/Close Window_52px.png" alt="close"></div>
</div>
`;
// console.log(document.querySelectorAll(".btn_logout"));
let logged = window.localStorage.getItem("current_user");
console.log(logged);
if (logged !== null) {
  hide_login = () => {
    const loginButtons = document.querySelectorAll(".btn_login");
    loginButtons.forEach((button) => {
      button.classList.add("hide");
    });
    const logoutButtons = document.querySelectorAll(".btn_logout");
    logoutButtons.forEach((button) => {
      button.classList.remove("hide");
    });
  };
  hide_login();
}

function display(element) {
  element.classList.remove("hide");
}

function hide(element) {
  element.classList.add("hide");
}

if (document.querySelector(".menu") || document.querySelector(".close_modal")) {
  document.querySelector(".menu").addEventListener("click", function (e) {
    e.preventDefault();
    display(document.querySelector(".modal_menu"));
  });

  document
    .querySelector(".close_modal")
    .addEventListener("click", function (e) {
      e.preventDefault();
      hide(document.querySelector(".modal_menu"));
    });
}

document.querySelector(".btn_logout").addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.removeItem("current_user");
  window.localStorage.removeItem("auth_token");
  // Hide logout buttons
  document.querySelectorAll(".btn_logout").forEach((button) => {
    button.classList.add("hide");
  });

  // Show login buttons
  document.querySelectorAll(".btn_login").forEach((button) => {
    button.classList.remove("hide");
  });
});
