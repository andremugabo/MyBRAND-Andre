let categoryData = [];
const getToken = JSON.parse(window.localStorage.getItem("auth_token"));
/*#######################################################################
                          LOCALHOST FUNCTIONALITY
#########################################################################*/
const readLocalStorageCategory = () => {
  let getData = window.localStorage.getItem("category");
  let db = JSON.parse(getData);
  return db;
};

const updateLocalStorage = (data) => {
  let dataBaseText = JSON.stringify(data);
  window.localStorage.setItem("category", dataBaseText);
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

const createCategory = (id, name) => {
  category = {
    c_id: id,
    c_name: name,
  };
  return category;
};

//   validate blog category  form

const validateInsertBlogForm = () => {
  if (document.querySelector("#admin_Category").value.trim() === "") {
    setError("admim_CBlog_error", "Category is required !!!");
  } else {
    document.querySelector(".error15").classList.add("hide");
  }
};

//insert  blog category
const insertBlogCategory = (e) => {
  e.preventDefault();
  document.querySelector(".msgInsertBlog").innerHTML = "";
  validateInsertBlogForm();
  //   localStorage.removeItem("category");
  if (document.querySelector("#admin_Category").value === "") {
    displayFailMessage(
      document.querySelector(".msgInsertBlog"),
      "FILL OUT CATEGORY NAME"
    );
    return;
  } else {
    const category = document.querySelector("#admin_Category").value;
    fetch("https://my-brand-andre-be.onrender.com/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // corrected header name
        Authorization: `bearer ${getToken}`, // corrected authorization header format
      },
      body: JSON.stringify({
        category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.message);
        if (data.status === 200) {
          displaySuccessMsg(
            document.querySelector(".msgInsertBlog"),
            data.message
          );
          setTimeout(() => {
            window.location.href = "blogsCategory.html";
          }, 2000);
        } else {
          displayFailMessage(
            document.querySelector(".msgInsertBlog"),
            data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

const fetchCategory = () => {
  fetch("https://my-brand-andre-be.onrender.com/categories", {
    headers: {
      Authorization: `bearer ${getToken}`,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      // console.log(data);
      updateLocalStorage(data);
      let num = 0;
      if (data.length > 0) {
        for (const items of data) {
          num += 1;
          let c_id = items._id;
          document.querySelector(".category_body").innerHTML += `
          <tr>
          <td>${num}</td>
          <td>${items.category}</td>
          <td>
          <button type="button" 
          onclick="remove('${c_id}')">
          <img src="ASSETS/IMAGES/Delete_52px_1.png" alt="delete">
          </button></td>
          </tr>
          
          `;
        }
      }
    });
};
remove = (c_id) => {
  const url = `https://my-brand-andre-be.onrender.com/category/${c_id}`;
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
        window.location.href = "blogsCategory.html";
      }, 500);
    });
};

fetchCategory();

/*================================================================
                                EVENT 
==================================================================*/
document
  .querySelector("#insertBolgC")
  .addEventListener("submit", insertBlogCategory);
