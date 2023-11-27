const userList = document.querySelector('#userList');
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const userPhone = document.querySelector('#userPhone');

userList.addEventListener('click', onClick);

function showOutput(response) {
    userList.innerHTML = "";

    response.data.forEach((ele, index) => {
        totAppointments++;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}</span>
            <span>${ele.name}</span>
            <span>${ele.email}</span>
            <span>${ele.phoneNum}</span>
            <button class="btn btn-outline-success edit-btn" data-id=${ele.id}>Edit</button>
            <button class="btn btn-outline-danger del-btn" data-id=${ele.id}>Delete</button>
        `;

        userList.appendChild(listItem);
    });
}

async function onClick(e) {
    e.preventDefault();

    if (e.target && e.target.classList.contains("del-btn")) {
        const userId = e.target.dataset.id;

        try {
            await axios.get(`http://192.168.29.221:8585/user/add-user/delete/${userId}`);
            refresh();
        } catch (err) {
            console.log(err);
        }
    } else if (e.target && e.target.classList.contains('edit-btn')) {
        const userId = e.target.dataset.id;

        try {
            const response = await axios.get(`http://192.168.29.221:8585/user/add-user/edit/${userId}`);
            const { name, email, phoneNum } = response.data;

            userName.value = name;
            userEmail.value = email;
            userPhone.value = phoneNum;

            await axios.get(`http://192.168.29.221:8585/user/add-user/delete/${userId}`);
            refresh();
        } catch (err) {
            console.log(err);
        }
    }
}

async function refresh() {
    try {
        const response = await axios.get('http://192.168.29.221:8585/user/add-user/data');
        showOutput(response);
    } catch (error) {
        console.log(error);
    }
}

refresh();
