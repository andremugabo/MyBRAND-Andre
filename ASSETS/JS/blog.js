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
// display blog
const blogCreator = readLocalStorageUser();
console.log(blogCreator);
const fetchBlogs = () => {
  const url = "https://my-brand-andre-be.onrender.com/fetchBlogs";
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data.blogs);
      let num = 0;
      for (const items of data.blogs) {
        num += 1;
        let blog_id = items._id;

        document.querySelector(".blog_container").innerHTML += `
            <div class="blog_items">
            <div class="blog1_items_img" id="blog_picture">
                 <img src="${items.blogImg}" alt="like">
            </div>
            <div class="blog1_item_details">
                <div class="item_title">
                    <div class="left_item_title">
                        <img src="${blogCreator.picture}" alt="blog_pic" id="user_pic">
                        <span>${blogCreator.FullName}</span>
                    </div>
                    <div class="right_item_title">
                        <img src="ASSETS/IMAGES/Grid 2_48px.png" alt="blog_title">
                        <span>${items.blogCategoryId}</span>

                    </div>
                </div>
                <h1>${items.blogTitle}</h1>
                <p>${items.blogDescription}</p>
                <button class="blog_btn"  onclick="viewBlog('${items._id}')">Learn More</button>
            </div>
        </div>
    `;
      }
    });
};
fetchBlogs();
let loggedId = window.localStorage.getItem("current_user");
if (loggedId !== null) {
  console.log(loggedId);
  viewBlog = (b_id) => {
    window.sessionStorage.setItem("blogDetails", JSON.stringify(b_id));
    window.location.href = "blogDetail.html";
    console.log(b_id);
  };
}
