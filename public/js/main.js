const placeholder = document.getElementById('placeholder');

placeholder.addEventListener('click', onClick);
function showOutput(response) {
    placeholder.innerHTML = '';
    response.data.forEach((ele, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        listItem.innerHTML = `
        <span class="index">${index + 1}</span>
        <span class="uName">${ele.uName}</span>
        <span class="emailId">${ele.emailId}</span>
        <span class="phoneNo">${ele.phoneNo}</span>
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
            console.log("error while deleting: ",err);
        }
    } else if (e.target && e.target.classList.contains('e-btn')) {
        e.preventDefault();
        const eID = e.target.getAttribute('data-id');
        try {
            const response = await axios.get(`http://localhost:8000/user/appointments/edit/${eID}`);
            console.log('Edit Button Click Response:', response.data);
            // Assuming these are input elements, update them accordingly
            document.getElementById('uName').value = response.data.uName;
            document.getElementById('emailId').value = response.data.emailId;
            document.getElementById('phoneNo').value = response.data.phoneNo;
        
            await axios.get(`http://localhost:8000/user/appointments/delete/${eID}`);
             refresh();
        } catch (err) {
            console.log("error while editing: ",err);
        }
    }
}
async function refresh() {
    try {
        const response = await axios.get('http://localhost:8000/user/appointments/data');
        showOutput(response);
    } catch (error) {
        console.log("error while refereshing: ",error);
    }
}

refresh();