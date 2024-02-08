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
