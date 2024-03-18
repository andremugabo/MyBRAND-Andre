let blogData = [];
const getToken = JSON.parse(window.localStorage.getItem("auth_token"));
/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
const readLocalStorageBlog = () => {
  let getData = window.localStorage.getItem("blog");
  let db = JSON.parse(getData);
  return db;
};

const readLocalStorageUser = () => {
  let getData = window.localStorage.getItem("current_user");
  let db = JSON.parse(getData);
  return db;
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
    const userData = readLocalStorageUser();
    let userId = `${userData._id}`;
    console.log(userId);
    let blogTitle = document.querySelector("#admin_BloTitle").value;
    let blogCategoryId = document.querySelector("#admin_Category").value;
    let blogDescription = document.querySelector(
      "#admin_BlogDescription"
    ).value;
    let blogContent = document.querySelector("#admin_BlogContainer").value;
    let blogImg = document.querySelector("#admin_BlogPicture").value;
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    let blogDate = formattedDate;
    fetch("https://my-brand-andre-be.onrender.com/createBlogs", {
      method: "POST",
      headers: {
        Authorization: `bearer ${getToken}`,
      },
      body: JSON.stringify({
        userId,
        blogCategoryId,
        blogTitle,
        blogDescription,
        blogContent,
        blogImg,
        blogDate,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => console.log(data));
  }
};
displayBlog = readLocalStorageBlog();

if (displayBlog !== null) {
  deleteBlog = (b_id) => {
    let currentBlog = displayBlog.find((rec) => rec.b_id === b_id);
    let index = displayBlog.indexOf(currentBlog);
    window.sessionStorage.setItem("blogEdit", b_id);
    console.log(index);
    displayBlog.splice(index, 1);
    updateLocalStorage(displayBlog);
    window.sessionStorage.clear();
    location.reload();
  };
}

// display blog

if (displayBlog !== null) {
  let displayUser = readLocalStorageUser();
  for (const items of displayBlog) {
    console.log(items);
    let user = displayUser.find((rec) => rec.u_id === items.u_id);
    console.log(user.u_name);
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
                    <button type="button"  onclick="deleteBlog(${items.b_id})">Delete</button>
                    
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
document.querySelector("#createBlog").addEventListener("submit", editBlog);
