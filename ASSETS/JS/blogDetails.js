let blogId = window.sessionStorage.getItem("blogDetails");
let bId = JSON.parse(blogId);
console.log(blogId);
let currentBlog;
let getBlogDetails = window.localStorage.getItem("blog");
let dataBase = JSON.parse(getBlogDetails);
if (dataBase !== null) {
  console.log(dataBase);
  currentBlog = dataBase.find((rec) => rec.b_id === bId);
  console.log(currentBlog);

  document.querySelector(".blog_details_to_display").innerHTML = `

            <div class="individual_blog_category">
            <h2>${currentBlog.b_title}</h2>
            </div>
            <div class="individual_blog_title">
            <h4>${currentBlog.b_desc}</h4>
            </div>
            <div class="item_title">
            <div class="left_item_title">
                <img src="ASSETS/IMAGES/Circled User Male_50px.png" alt="blog_title">
                <span>UX ACTION</span>
            </div>
            <div class="right_item_title">
                <img src="ASSETS/IMAGES/Grid 2_48px.png" alt="blog_title">
                <span>${currentBlog.b_category}</span>
            </div>
            </div>
            <div class="proper_blog_image">
            <img src="${currentBlog.b_pic}" alt="blog_image">  
            </div>
            <div class="blog_description">
            <p>${currentBlog.b_container}</p>
            </div>
            
       
        `;
}

const readLocalStorageUser = () => {
  let getData = window.localStorage.getItem("users");
  let db = JSON.parse(getData);
  return db;
};
let getComments = window.localStorage.getItem("comment");
let dataComment = JSON.parse(getComments);
console.log(dataComment);
let dataLike = [];
let dataDLike = [];

const likeC = (id) => {
  let getCountLike = readLocalStorageLike();
  let getCurrentComment = dataComment.find((rec) => rec.c_id === id);
  // console.log(typeof getCurrentComment.l_count);

  if (getCountLike === null) {
    let l_id = 1;
    getCurrentComment.l_count = 1;
    window.localStorage.setItem("comment", JSON.stringify(dataComment));
    let setLike = createLike(l_id, getCurrentComment.u_id, id);
    dataLike.push(setLike);
    updateLocalStorageLike(dataLike);
    location.reload();
  } else {
    let countL = getCountLike.length;
    let l_id = countL + 1;

    for (let keys of getCountLike) {
      console.log(getCurrentComment.u_id);

      if (
        keys.u_id === getCurrentComment.u_id &&
        keys.c_id === getCurrentComment.c_id
      ) {
        getCurrentComment.l_count = getCurrentComment.l_count - 1;
        window.localStorage.setItem("comment", JSON.stringify(dataComment));
        let commentToDelete = getCountLike.find(
          (rec) => rec.u_id === getCurrentComment.u_id
        );
        let index = getCountLike.indexOf(commentToDelete);
        console.log(index);
        getCountLike.splice(index, 1);
        updateLocalStorageLike(getCountLike);
        let setLike = createLike(l_id, getCurrentComment.u_id, id);
        dataLike.push(setLike);
        updateLocalStorageLike(dataLike);
        location.reload();
      } else {
        getCurrentComment.l_count = getCurrentComment.l_count + 1;
        window.localStorage.setItem("comment", JSON.stringify(dataComment));
        let setLike = createLike(l_id, getCurrentComment.u_id, id);
        dataLike.push(setLike);
        updateLocalStorageLike(dataLike);
        console.log("jjjjjjjj");
        location.reload();
      }
    }
  }
};

if (dataComment !== null) {
  console.log(dataComment);
  let displayUser = readLocalStorageUser();
  for (const items of dataComment) {
    // console.log(items.b_id);
    let user = displayUser.find((rec) => rec.u_id === items.u_id);
    console.log(user.u_name);
    if (items.b_id === bId) {
      //   console.log(items.b_id);

      document.querySelector(".comment_section").innerHTML += `
                    <div class="main_comment flex-center-items">
                    <div class="right_main_comment flex-center-center">
                        <img src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" alt="comment_pic">
                    </div>
                    <div class="left_main_comment">
                        <div class="main_comment_content">
                            <div class="comment_title">
                                <span class="bloger_name">${user.u_name}</span>
                                <span class="comment_like flex-center-items"><img src="ASSETS/IMAGES/Thumb Up_52px.png" alt="like" onclick="likeC(${items.c_id})"><div class="like_comm flex-center-center">${items.l_count}</div></span>
                            </div>
                            <div class="comment_date flex-center-items">
                                <img src="ASSETS/IMAGES/Tear Off Calendar_50px.png" alt="Calender"><span>${items.c_date}</span>
                            </div>
                            <div class="comment_text">
                                <p>${items.c_msg}</p>
                            </div>
                        </div>
                    </div>
                    </div>
            `;
    }
  }
}

const createLike = (l_id, u_id, c_id) => {
  like = {
    l_id: l_id,
    u_id: u_id,
    c_id: c_id,
  };
  return like;
};

const createDLike = (dl_id, u_id, c_id) => {
  dLike = {
    dl_id: dl_id,
    u_id: u_id,
    c_id: c_id,
  };
  return dLike;
};

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
