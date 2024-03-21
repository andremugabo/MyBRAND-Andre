const getToken = JSON.parse(window.localStorage.getItem("auth_token"));
const readLocalStorage = () => {
  let getData = window.localStorage.getItem("users");
  let db = JSON.parse(getData);
  return db;
};
const setLogged = (userId) => {
  let userIdText = JSON.stringify(userId);
  window.localStorage.setItem("loggedUser", userIdText);
};

const displayBlogger = () => {
  fetch("https://my-brand-andre-be.onrender.com/users", {
    headers: {
      Authorization: `bearer ${getToken}`,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      let num = 0;
      for (let getUsers of data) {
        num += 1;
        document.querySelector(".blogger_tbody").innerHTML += `
          <tr>
          <td>${num}</td>
          <td><div class="profile_image"><img src="${getUsers.picture}" alt=""></div></td>
          <td>${getUsers.FullName}</td>
          <td>${getUsers.email}</td>
          </tr>
          `;
      }
    });
};

displayBlogger();

// userData = readLocalStorage();
// console.log(userData);
// let num = 0;
// for (const getUsers of userData) {
//   // console.log(getUsers);
//   num += 1;
//   document.querySelector(".blogger_tbody").innerHTML += `
//     <tr>
//     <td>${num}</td>
//     <td><div class="profile_image"><img src="${getUsers.u_pic}" alt=""></div></td>
//     <td>${getUsers.u_name}</td>
//     <td>${getUsers.u_email}</td>
//     <td><button type="button"><img src="ASSETS/IMAGES/Delete_52px_1.png" alt="delete"></button></td>
//     </tr>
//     `;
// }
