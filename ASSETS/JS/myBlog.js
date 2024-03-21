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
        "content-type": "application/json",
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
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          displaySuccessMsg(document.querySelector(".msgBlog"), data.message);
          setTimeout(() => {
            window.location.href = "myBlogs.html";
          }, 2000);
        } else {
          displayFailMessage(document.querySelector(".msgBlog"), data.message);
        }
      });
  }
};

deleteBlog = (b_id) => {
  const url = `https://my-brand-andre-be.onrender.com/deleteBlogById/${b_id}`;
  fetch(url, {
    method: "delete",
    headers: {
      Authorization: `bearer ${getToken}`,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      setTimeout(() => {
        window.location.href = "myBlogs.html";
      }, 500);
    });
};

// display blog
const blogCreator = readLocalStorageUser();
console.log(blogCreator.FullName);
const fetchBlogs = () => {
  const url = "https://my-brand-andre-be.onrender.com/fetchBlogs";
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      let num = 0;
      for (const items of data.blogs) {
        num += 1;
        let blog_id = items._id;

        document.querySelector(".blog_creation").innerHTML += `
            <div class="blogSelf">
            <h4>Title: ${items.blogTitle}&nbsp;|&nbsp;Category: ${items.blogCategoryId}</h4> 
            <div class="innerBlogSelf">
                <div class="left_selfBlog">
                <div class="blog_img"><img src="${items.blogImg}" alt="like"></div>
                <div class="blog_desciption">
                    <p>${items.blogDescription}</p>
                    <h5 class="blog_author">Author :${blogCreator.FullName}</h5>
                    <h6>Published : ${items.blogDate}</h6>
                </div>
                </div>
                <div class="right_selfBlog">
                    <button type="button"  onclick="deleteBlog('${items._id}')">Delete</button>
                    <button type="button"  onclick="editBlog('${items._id}')">Edit</button>
                    
                </div>
               
             </div>
             </div>
    `;
      }
    });
};
fetchBlogs();

const editBlog = (blogId) => {
  const _id = JSON.stringify(blogId);
  console.log(_id);
  window.sessionStorage.setItem("blogToEdit", _id);
  window.location.href = "blogEdit.html";
};

/*================================================================
                                EVENT 
==================================================================*/
document.querySelector("#createBlog").addEventListener("submit", createBlog);
// document.querySelector("#createBlog").addEventListener("submit", editBlog);
