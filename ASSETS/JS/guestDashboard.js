let blogData = [];
/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
const readLocalStorageBlog = () => {
  let getData = window.localStorage.getItem("blog");
  let db = JSON.parse(getData);
  return db;
};

const readLocalStorageUser = () => {
  let getData = window.localStorage.getItem("users");
  let db = JSON.parse(getData);
  return db;
};

const updateLocalStorage = (data) => {
  let dataBaseText = JSON.stringify(data);
  window.localStorage.setItem("blog", dataBaseText);
};

/*#####################################################################
                      BLOG CATEGORY FUNCTIONALITY
#######################################################################*/

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

const createBlogContent = (
  b_id,
  u_id,
  b_title,
  b_category,
  b_desc,
  b_container,
  b_pic,
  b_date
) => {
  blog = {
    b_id: b_id,
    u_id: u_id,
    b_title: b_title,
    b_category: b_category,
    b_desc: b_desc,
    b_container: b_container,
    b_pic: b_pic,
    b_date: b_date,
  };
  return blog;
};
// validate blog form

const validateInsertBlogForm = () => {
  if (document.querySelector("#admin_BloTitle").value.trim() === "") {
    setError("admin_BlogTitle_error", "Blog Title  is required !!!");
  } else {
    document.querySelector(".error20").classList.add("hide");
  }

  if (document.querySelector("#admin_Category").value.trim() === "") {
    setError("admin_BlogCategory_error", "Blog Category is required !!!");
  } else {
    document.querySelector(".error21").classList.add("hide");
  }

  if (document.querySelector("#admin_BlogDescription").value.trim() === "") {
    setError("admin_BlogDesc_error", "Blog Description is required !!!");
  } else {
    document.querySelector(".error22").classList.add("hide");
  }

  if (document.querySelector("#admin_BlogContainer").value.trim() === "") {
    setError("admin_BlogContainer_error", "Blog is required !!!");
  } else {
    document.querySelector(".error23").classList.add("hide");
  }

  if (document.querySelector("#admin_BlogPicture").value.trim() === "") {
    setError("admin_BlogPic_error", "Blog is required !!!");
  } else {
    document.querySelector(".error24").classList.add("hide");
  }
};

const createBlog = (e) => {
  e.preventDefault();
  document.querySelector(".msgBlog").innerHTML = "";
  validateInsertBlogForm();

  if (
    document.querySelector("#admin_BloTitle").value.trim() === "" ||
    document.querySelector("#admin_Category").value.trim() === "" ||
    document.querySelector("#admin_BlogDescription").value.trim() === "" ||
    document.querySelector("#admin_BlogContainer").value.trim() === "" ||
    document.querySelector("#admin_BlogPicture").value.trim() === ""
  ) {
    displayFailMessage(
      document.querySelector(".msgBlog"),
      "FILL OUT CATEGORY ALL FIELD !!!"
    );
    return;
  } else {
    let u_idText = window.localStorage.getItem("loggedUser");
    let u_id = JSON.parse(u_idText);
    console.log(u_id);
    let objectBlog = readLocalStorageBlog();
    if (objectBlog === null) {
      let b_id = 1;
      let b_title = document.querySelector("#admin_BloTitle").value;
      let b_category = document.querySelector("#admin_Category").value;
      let b_desc = document.querySelector("#admin_BlogDescription").value;
      let b_container = document.querySelector("#admin_BlogContainer").value;
      let b_pic = document.querySelector("#admin_BlogPicture").value;
      const today = new Date();
      const formattedDate = today.toLocaleDateString();
      console.log(formattedDate);
      let b_date = formattedDate;
      let getBlog = createBlogContent(
        b_id,
        u_id,
        b_title,
        b_category,
        b_desc,
        b_container,
        b_pic,
        b_date
      );
      blogData.push(getBlog);
      updateLocalStorage(blogData);
      displaySuccessMsg(
        document.querySelector(".msgBlog"),
        "BLOG REGISTERED !!!"
      );
      setTimeout(() => {
        window.location.href = "guestDashboard.html";
      }, 2000);
    } else {
      blogData = objectBlog;
      let blogDataLength = blogData.length;
      let b_id = blogDataLength + 1;
      let b_title = document.querySelector("#admin_BloTitle").value;
      let b_category = document.querySelector("#admin_Category").value;
      let b_desc = document.querySelector("#admin_BlogDescription").value;
      let b_container = document.querySelector("#admin_BlogContainer").value;
      let b_pic = document.querySelector("#admin_BlogPicture").value;
      const today = new Date();
      const formattedDate = today.toLocaleDateString();
      let b_date = formattedDate;
      let getBlog = createBlogContent(
        b_id,
        u_id,
        b_title,
        b_category,
        b_desc,
        b_container,
        b_pic,
        b_date
      );
      blogData.push(getBlog);
      updateLocalStorage(blogData);
      displaySuccessMsg(
        document.querySelector(".msgBlog"),
        "BLOG REGISTERED !!!"
      );
      setTimeout(() => {
        window.location.href = "guestDashboard.html";
      }, 2000);
    }
  }
};

// display blog
let currentUser = window.localStorage.getItem("loggedUser");
let userId = JSON.parse(currentUser);

const displayBlog = readLocalStorageBlog();

if (displayBlog !== null) {
  let displayUser = readLocalStorageUser();
  let oneUser = displayBlog.filter((rec) => rec.u_id === userId);
  console.log(oneUser);
  for (const items of oneUser) {
    // console.log(items);
    // console.log(userId);
    let user = displayUser.find((rec) => rec.u_id === userId);
    // console.log(user);
    document.querySelector(".blog_creation").innerHTML += `
            <div class="blogSelf">
            <h4>Title: ${items.b_title}&nbsp;|&nbsp;Category: ${items.b_category}</h4> 
            <div class="innerBlogSelf">
                <div class="left_selfBlog">
                <div class="blog_img"><img src="${items.b_pic}" alt="like"></div>
                <div class="blog_desciption">
                    <p>${items.b_desc}</p>
                    <h5 class="blog_author">Author :${user.u_name}</h5>
                    <h6>Published : ${items.b_date}</h6>
                </div>
                </div>
                <div class="right_selfBlog">
                    <button>Edit</button>
                    <span  class="flex-center-center">Comments :&nbsp; 20</span>
                    <button>View&nbsp;Blog</button>
                    <span  class="flex-center-center"><img src="ASSETS/IMAGES/Thumb Up_52px.png" alt="like">&nbsp;10</span>
                    <span  class="flex-center-center"><img src="ASSETS/IMAGES/Thumbs Down_48px.png" alt="like">&nbsp;0</span>
                </div>
             </div>
             </div>
    `;
    // document.querySelector(
    //   ".blog_img"
    // ).style.backgroundImage = `url(${items.b_pic})`;
  }
}

/*================================================================
                                EVENT 
==================================================================*/
document.querySelector("#createBlog").addEventListener("submit", createBlog);
