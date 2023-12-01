const placeholder = document.getElementById('placeholder');

placeholder.addEventListener('click', onClick);

function showOutput(response) {
    placeholder.innerHTML = '';
    response.data.forEach((ele, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        // Include user details directly in the li
        listItem.textContent = `${index + 1}: ${ele.expName}: ${ele.expCtgry}: ${ele.expAmt}`;

        // Add Edit and Delete buttons
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-outline-success m-2 e-btn';
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('data-id', ele.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger del-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-id', ele.id);

        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        placeholder.appendChild(listItem);
    });
}

async function onClick(e) {
    e.preventDefault();
    if (e.target && e.target.classList.contains('del-btn')) {
        const dID = e.target.dataset.id;
        try {
            await axios.get(`http://localhost:8000/user/expenses/delete/${dID}`);
            refresh();
        } catch (err) {
            console.log("error while deleting: ",err);
        }
    } else if (e.target && e.target.classList.contains('e-btn')) {
        e.preventDefault();
        const eID = e.target.getAttribute('data-id');
        try {
            const response = await axios.get(`http://localhost:8000/user/expenses/edit/${eID}`);
            console.log('Edit Button Click Response:', response.data);

            // Assuming these are input elements, update them accordingly
            document.getElementById('expName').value = response.data.expName;
            document.getElementById('expCtgry').value = response.data.expCtgry;
            document.getElementById('expAmt').value = response.data.expAmt;
        
            await axios.get(`http://localhost:8000/user/expenses/delete/${eID}`);
             refresh();
        } catch (err) {
            console.log("error while editing: ",err);
        }
    }
}


async function refresh() {
    try {
        const response = await axios.get('http://localhost:8000/user/expenses/data');
        showOutput(response);
    } catch (error) {
        console.log("error while refereshing: ", error);
    }
}

refresh();
