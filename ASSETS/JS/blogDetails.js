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
const getToken = JSON.parse(window.localStorage.getItem("auth_token"));
let blogId = window.sessionStorage.getItem("blogDetails");
let bId = JSON.parse(blogId);
console.log(blogId);
console.log(bId);
console.log(getToken);
const fetchOneBlog = () => {
  displayPreloader();

  const url = `https://my-brand-andre-be.onrender.com/fetchBlogById/${bId}`;
  fetch(url, {
    headers: {
      Authorization: `bearer ${getToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      hidePreloader();

      document.querySelector(".blog_details_to_display").innerHTML = `

            <div class="individual_blog_category">
            <h2>${data.blogTitle}</h2>
            </div>
            <div class="individual_blog_title">
            <h4>${data.blogDescription}</h4>
            </div>
            <div class="item_title">
            <div class="left_item_title">
                <img src="ASSETS/IMAGES/Circled User Male_50px.png" alt="blog_title">
                <span>UX ACTION</span>
            </div>
            <div class="right_item_title">
                <img src="ASSETS/IMAGES/Grid 2_48px.png" alt="blog_title">
                <span>${data.blogCategoryId}</span>
            </div>
            </div>
            <div class="proper_blog_image">
            <img src="${data.blogImg}" alt="blog_image">  
            </div>
            <div class="blog_description">
            <p>${data.blogContent}</p>
            </div>
            
       
        `;
    })
    .catch((error) => console.error("Error fetching blog:", error));
};
fetchOneBlog();

const readLocalStorageUser = () => {
  let getUserData = window.localStorage.getItem("current_user");
  let db = JSON.parse(getUserData);
  return db;
};
let getComments = window.localStorage.getItem("comment");
let dataComment = JSON.parse(getComments);
console.log(dataComment);
let dataLike = [];
let dataDLike = [];

const likeC = (id) => {
  displayPreloader();

  const url = `https://my-brand-andre-be.onrender.com/commentLike/${id}`;
  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `bearer ${getToken}`,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      hidePreloader();

      console.log(data);
      window.location.href = "blogDetail.html";
    });
};

const fetchComment = () => {
  displayPreloader();

  const url = `https://my-brand-andre-be.onrender.com/comment/${bId}`;
  fetch(url, {
    headers: {
      Authorization: `bearer ${getToken}`,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      hidePreloader();

      console.log(data);

      let num = 0;
      if (data.length > 0) {
        for (const items of data) {
          num += 1;
          document.querySelector(".comment_section").innerHTML += `
            <div class="main_comment flex-center-items">
            <div class="right_main_comment flex-center-center">
                <img src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" alt="comment_pic">
            </div>
            <div class="left_main_comment">
                <div class="main_comment_content">
                    <div class="comment_title">
                        <span class="bloger_name">${items.userId}</span>
                        <span class="comment_like flex-center-items"><img src="ASSETS/IMAGES/Thumb Up_52px.png" alt="like" onclick="likeC('${items._id}')"><div class="like_comm flex-center-center">${items.commentLike.length}</div></span>
                    </div>
                    <div class="comment_date flex-center-items">
                        <img src="ASSETS/IMAGES/Tear Off Calendar_50px.png" alt="Calender"><span>${items.commentDate}</span>
                    </div>
                    <div class="comment_text">
                        <p>${items.commentMsg}</p>
                    </div>
                </div>
            </div>
            </div>
    `;
        }
      }
    });
};
fetchComment();

const updateLocalStorageLike = (data) => {
  let dataBaseText = JSON.stringify(data);
  window.localStorage.setItem("like", dataBaseText);
};

const updateLocalStorageDLike = (data) => {
  let dataBaseText = JSON.stringify(data);
  window.localStorage.setItem("dLike", dataBaseText);
};

const readLocalStorageLike = () => {
  let getData = window.localStorage.getItem("like");
  let db = JSON.parse(getData);
  return db;
};

const readLocalStorageDLike = () => {
  let getData = window.localStorage.getItem("dLike");
  let db = JSON.parse(getData);
  return db;
};
