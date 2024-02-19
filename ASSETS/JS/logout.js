/** ========================================================
 *                        LOGOUT
 ========================================================== */
const logoutFunction = (e) => {
  e.preventDefault();
  window.localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
};

if (document.querySelectorAll(".logoutDash")) {
  document.querySelectorAll(".logoutDash").forEach((btn) => {
    btn.addEventListener("click", logoutFunction);
  });
}
