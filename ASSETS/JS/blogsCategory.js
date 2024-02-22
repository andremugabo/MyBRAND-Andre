let categoryData = [];
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
    let categoryObject = readLocalStorageCategory();
    if (categoryObject === null) {
      let id = 1;
      let name = document.querySelector("#admin_Category").value.toUpperCase();
      let getCategory = createCategory(id, name);
      categoryData.push(getCategory);
      updateLocalStorage(categoryData);
      //   console.log(getCategory);
      displaySuccessMsg(
        document.querySelector(".msgInsertBlog"),
        "CATEGORY REGISTERED !!!"
      );
      setTimeout(() => {
        window.location.href = "blogsCategory.html";
      }, 2000);
    } else {
      categoryData = categoryObject;
      let categoryLength = categoryData.length;
      let id = categoryLength + 1;
      let name = document.querySelector("#admin_Category").value.toUpperCase();
      console.log(categoryData);
      for (const checkData of categoryData) {
        if (checkData.c_name === name) {
          displayFailMessage(
            document.querySelector(".msgInsertBlog"),
            "THIS CATEGORY IS ALREADY REGISTERED !!"
          );
          setTimeout(() => {
            window.location.href = "blogsCategory.html";
          }, 2000);
          return;
        }
      }
      let getCategory = createCategory(id, name);
      categoryData.push(getCategory);
      updateLocalStorage(categoryData);
      //   console.log(getCategory);
      displaySuccessMsg(
        document.querySelector(".msgInsertBlog"),
        "CATEGORY REGISTERED !!!"
      );
      setTimeout(() => {
        window.location.href = "blogsCategory.html";
      }, 2000);
    }
  }
};

let displayCategory = readLocalStorageCategory();
if (displayCategory !== null) {
  let num = 0;
  for (const items of displayCategory) {
    num += 1;
    console.log(items);
    document.querySelector(".category_body").innerHTML += `
        <tr>
        <td>${num}</td>
        <td>${items.c_name}</td>
        <td><button type="button" onclick="remove(${items.c_id})"><img src="ASSETS/IMAGES/Delete_52px_1.png" alt="delete"></button></td>
        </tr>
        
        `;
  }

  const filter = (c_id) => {
    displayCategory = displayCategory.filter((rec) => rec.c_id === c_id);
    console.log(displayCategory);
  };

  const remove = (c_id) => {
    const categoryToDelete = displayCategory.find((rec) => rec.c_id === c_id);
    console.log(categoryToDelete);
    const index = displayCategory.indexOf(categoryToDelete);
    console.log(index);
    displayCategory.splice(index, 1);
    updateLocalStorage(displayCategory);
    location.reload();
  };
}

/*================================================================
                                EVENT 
==================================================================*/
document
  .querySelector("#insertBolgC")
  .addEventListener("submit", insertBlogCategory);
