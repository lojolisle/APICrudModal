$(document).ready(function(){

	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	// var checkbox = $('table tbody input[type="checkbox"]');
	// $("#selectAll").click(function(){
	// 	if(this.checked){
	// 		checkbox.each(function(){
	// 			this.checked = true;                        
	// 		});
	// 	} else{
	// 		checkbox.each(function(){
	// 			this.checked = false;                        
	// 		});
	// 	} 
	// });
	// checkbox.click(function(){
	// 	if(!this.checked){
	// 		$("#selectAll").prop("checked", false);
	// 	}
	// });


    /* API calls */
    // get All
    const getAllUsers = async() => {
        const response = await fetch("http://localhost:23826/api/User/GetUsers");
        const usersJson = await response.json();
        if (usersJson) {
            console.log(usersJson)
            _displayItems(usersJson);
        }   
    }

    // get one user by Id
    const getUser = async(id) => {
        const response = await fetch("http://localhost:23826/api/User/GetUser/" + id);
        const user = await response.json();
        if (user) {
            document.getElementById("edit-id").value = user.id;
            document.getElementById("edit-name").value = user.userName;
            document.getElementById("edit-city").value = user.city;
            document.getElementById("edit-phone").value = user.phonenumber;
        }
    }

    // Update User
    const updateUserApiCall = async(item) => {
        console.log('item for update ', item)
        const response = await fetch('http://localhost:23826/api/User/UpdateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        const result = await response.json();
        console.log(result);
        getAllUsers();
    }

    // create an user
    const createUser = async(item) => {
        console.log(' add items ', JSON.stringify(item))
        const response = await fetch('http://localhost:23826/api/User/CreateUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });

        const result = await response.json();
        console.log(' REsult is ', result);
        getAllUsers();
    }

    // delete user 
    const deleteUser = async(id) => {
        console.log('delete user id ', id);
        const response = await fetch("http://localhost:23826/api/User/DeleteUser/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const user = await response.json();
        if (user) {
           
            getAllUsers();
        }
    }



    // on load call getAllUsers()
    getAllUsers();


    // Add form
    const addForm = document.getElementById('addForm');

    addForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const item = {
          //id: parseInt(105, 10),
          userName: document.getElementById("add-name").value.trim(),
          phonenumber: document.getElementById("add-phone").value.trim(),
          city: document.getElementById("add-city").value.trim(),
        };
        createUser(item);
       
    });


    // Edit form
    const editForm = document.getElementById('editForm');

    editForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const itemId = document.getElementById("edit-id").value.trim();
        const item = {
          id: parseInt(itemId, 10),
          userName: document.getElementById("edit-name").value.trim(),
          phonenumber: document.getElementById("edit-phone").value.trim(),
          city: document.getElementById("edit-city").value.trim(),
        };
        updateUserApiCall(item);
       
    });

  // Delete Form
  const deleteForm = document.getElementById('deleteForm');
  deleteForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const itemId = document.getElementById("delete-id").value.trim();
   
    deleteUser(itemId);
   
});



    function displayDeleteForm(id) {
        const item = users.find(item => item.id === id);
        document.getElementById("delete-id").value = item.id;
    }
      
    function displayEditForm(id) {
        getUser(id);
      
    }
      
    function _displayCount(itemCount) {
        const name = itemCount === 1 ? "entry" : "entries";
        document.getElementById(
        "counter"
        ).innerHTML = `Showing <b>${itemCount}</b> ${name}`;
    }

    function _displayItems(data) {
        const tBody = document.getElementById("users");
        tBody.innerHTML = "";
        _displayCount(data.length);
        const button = document.createElement("button");

        data.forEach(item => {
            console.log(item)
            let editButton = document.createElement("a");
            editButton.href = "#editUserModal";
            editButton.className = "edit";
            editButton.addEventListener("click", function(){
                displayEditForm(item.id)
            });

            editButton.setAttribute("data-toggle", "modal");
            editButton.innerHTML = "<i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>";

            let deleteButton = document.createElement("a");
            deleteButton.href = "#deleteUserModal";
            deleteButton.className = "delete";
            deleteButton.addEventListener("click", function() {
                displayDeleteForm(item.id)
            });
            deleteButton.setAttribute("data-toggle", "modal");
            deleteButton.innerHTML = "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>";

            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textTitle = document.createTextNode(item.userName);

            td1.appendChild(textTitle);

            let td2 = tr.insertCell(1);
            let textAuthor = document.createTextNode(item.city);
            td2.appendChild(textAuthor);

            let td3 = tr.insertCell(2);
            let textPublisher = document.createTextNode(item.phonenumber);
            td3.appendChild(textPublisher);

            let td4 = tr.insertCell(3);
            td4.appendChild(editButton);
            td4.appendChild(deleteButton);
        });

        users = data;
    }
    

    // force the modal window to close on submit
    $("#addUserModal").submit(function() {
        $("#addUserModal").modal("hide");
    });

    $("#editUserModal").submit(function() {
    $("#editUserModal").modal("hide");
    });

    $("#deleteUserModal").submit(function() {
    $("#deleteUserModal").modal("hide");
    });






});
