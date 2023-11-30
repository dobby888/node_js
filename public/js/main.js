// const userList = document.getElementById('userList');
// const userName = document.getElementById('userName');
// const userEmail = document.getElementById('userEmail');
// const userPhone = document.getElementById('userPhone');
// const form = document.querySelector('form');

// form.addEventListener('submit', submitForm);

// // Attach onClick function to handle click events
// document.addEventListener('click', onClick);

// function showOutput(response) {
//     console.log("response data: ",response.data);
//     const userData = response.data;

//     // Clear the existing user list
//     userList.innerHTML = "";

//     userData.forEach((user, index) => {
//         const listItem = document.createElement('li');
//         listItem.className = 'list-group-item';

//         listItem.innerHTML = `
//             <span class="fw-bold">${index + 1}</span>
//             <span class="fw-bold mx-2">${user.uName}</span>
//             <span class="mx-2">${user.emailId}</span>
//             <span class="mx-2">${user.phoneNo}</span>
//             <a href="/user/appointments/?id=${user.id}&edit=true" class="btn btn-outline-success m-2 e-btn">Edit</a>
//             <button class="btn btn-outline-danger del-btn" data-id="${user.id}">Delete</button>
//         `;

//         userList.appendChild(listItem);
//     });
// }

// async function submitForm(event) {
//     console.log('form submitted');
//     event.preventDefault();

//     const formData = new FormData(form);

//     try {
//         await axios.post('http://localhost:8000/user/appointments', formData);
//         refresh();
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function onClick(e) {
//     e.preventDefault();

//     if (e.target && e.target.classList.contains("del-btn")) {
//         const dID = e.target.dataset.id;

//         try {
//             await axios.get(`http://localhost:8000/user/appointments/delete/${dID}`);
//             refresh();
//         } catch (err) {
//             console.log(err);
//         }
//     } else if (e.target && e.target.classList.contains('edit-btn')) {
//         e.preventDefault();
//         const eID = e.target.id;

//         try {
//             const response = await axios.get(`http://localhost:8000/user/appointments/edit/${eID}`);
//             const { uName, emailId, phoneNo } = response.data;
//             userName.value = uName;
//             userEmail.value = emailId;
//             userPhone.value = phoneNo;

//             await axios.get(`http://localhost:8000/user/appointments/delete/${eID}`);
//             refresh();
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }

// async function refresh() {
//     try {
//         const response = await axios.get('http://localhost:8000/user/appointments/data');
//         showOutput(response);
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Initial load
// refresh();








// const userList = document.querySelector('#userList');
// const userName = document.querySelector('#userName');
// const userEmail = document.querySelector('#userEmail');
// const userPhone = document.querySelector('#userPhone');

// // Assuming totappointment is declared and initialized somewhere in your code
// let totappointment = 0;

// userList.addEventListener('click', onClick);

// function showOutput(response) {
//     userList.innerHTML = "";

//     response.data.forEach((ele, index) => {
//         totappointment++;
//         const listItem = document.createElement('li');
//         listItem.className = 'list-group-item';

//         listItem.innerHTML = `
//             <span class="fw-bold">${index + 1}</span>
//             <span class="fw-bold mx-2">${ele.uName}</span>
//             <span class="mx-2">${ele.emailId}</span>
//             <span class="mx-2">${ele.phoneNo}</span>
//             <a href="/user/appointments/?id=${ele.id}&edit=true" class="btn btn-outline-success m-2 e-btn">Edit</a>
//             <button class="btn btn-outline-danger del-btn" data-id="${ele.id}">Delete</button>
//         `;

//         userList.appendChild(listItem);
//     });
// }

// async function onClick(e) {
//     e.preventDefault();

//     if (e.target && e.target.classList.contains("del-btn")) {
//         const dID = e.target.dataset.id;

//         try {
//             await axios.get(`http://localhost:8000/user/appointments/delete/${dID}`);
//             refresh();
//         } catch (err) {
//             console.log(err);
//         }
//     } else if (e.target && e.target.classList.contains('edit-btn')) {
//         e.preventDefault();
//         const eID = e.target.id;

//         try {
//             const response = await axios.get(`http://localhost:8000/user/appointments/edit/${eID}`);
//             const { uName, emailId, phoneNo } = response.data;
//             userName.value = uName;
//             userEmail.value = emailId;
//             userPhone.value = phoneNo;

//             await axios.get(`http://localhost:8000/user/appointments/delete/${eID}`);
//             refresh();
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }

// async function refresh() {
//     try {
//         const response = await axios.get('http://localhost:8000/user/appointments/data');
//         showOutput(response);
//     } catch (error) {
//         console.log(error);
//     }
// }

// refresh();








const placeholder = document.getElementById('placeholder');
const uName = document.getElementById('uName');
const emailId = document.getElementById('emailId');
const phoneNo = document.getElementById('phoneNo');

placeholder.addEventListener('click', onClick);

function showOutput(response) {
  placeholder.innerHTML = '';
  response.data.forEach((ele, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    listItem.innerHTML = `
        <div class="index">${index + 1}</div>
        <div class="uName">${ele.uName}</div>
        <div class="emailId">${ele.emailId}</div>
        <div class="phoneNo">${ele.phoneNo}</div>
        <a href="/user/appointments/?id=${ele.id}&edit=true" class="btn btn-outline-success m-2 e-btn" data-id="${ele.id}">Edit</a>
        <button class="btn btn-outline-danger del-btn" data-id="${ele.id}">Delete</button>
        `;

    placeholder.appendChild(listItem);
  });
}

async function onClick(e) {
  e.preventDefault();
  if (e.target && e.target.classList.contains('del-btn')) {
    const dID = e.target.dataset.id;
    try {
      await axios.get(`http://localhost:8000/user/appointments/delete/${dID}`);
      refresh();
    } catch (err) {
      console.log(err);
    }
  } else if (e.target && e.target.classList.contains('edit-btn')) {
    e.preventDefault();
    const eID = e.target.getAttribute('data-id');
    console.log("edit button clicked");
    try {
        const response = await axios.get(`http://localhost:8000/user/appointments/edit/${eID}`);
        //console.log(response.data)
        console.log('Edit Button Click Response:', response.data); 
  
        const { uName: userName, emailId: userEmail, phoneNo: userPhone } = response.data;
        uName.innerHTML = userName;
        emailId.innerHTML = userEmail;
        phoneNo.innerHTML = userPhone;
      await axios.get(`http://localhost:8000/user/appointments/delete/${eID}`);
      refresh();
    } catch (err) {
        console.log('Error in Edit Button Click:', err); 
      console.log(err);
    }
  }
}

async function refresh() {
  try {
    const response = await axios.get('http://localhost:8000/user/appointments/data');
    showOutput(response);
  } catch (error) {
    console.log(error);
  }
}

refresh();




