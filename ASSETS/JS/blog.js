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

// display blog

const displayBlog = readLocalStorageBlog();

if (displayBlog !== null) {
  let displayUser = readLocalStorageUser();
  for (const items of displayBlog) {
    console.log(items);
    let user = displayUser.find((rec) => rec.u_id === items.u_id);
    console.log(user.u_name);
    document.querySelector(".blog_container").innerHTML += `
            <div class="blog_items">
            <div class="blog1_items_img" id="blog_picture">
                 <img src="${items.b_pic}" alt="like">
            </div>
            <div class="blog1_item_details">
                <div class="item_title">
                    <div class="left_item_title">
                        <img src="${user.u_pic}" alt="blog_title" id="user_pic">
                        <span>${user.u_name}</span>
                    </div>
                    <div class="right_item_title">
                        <img src="ASSETS/IMAGES/Grid 2_48px.png" alt="blog_title">
                        <span>${items.b_category}</span>

                    </div>
                </div>
                <h1>${items.b_title}</h1>
                <p>${items.b_desc}</p>
                <button class="blog_btn"  onclick="window.location.href='blogDetail.html'">Learn More</button>
            </div>
        </div>
    `;
    // document.querySelector(
    //   ".blog_img"
    // ).style.backgroundImage = `url(${items.b_pic})`;
  }
}
