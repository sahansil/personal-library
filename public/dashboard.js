const apiUrl = "http://localhost:5000/api/users"; 

// ✅ Load all users when page loads
window.onload = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must login first!");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // if your backend uses auth
    }
  });

  const users = await res.json();
  console.log(users);

  const tableBody = document.querySelector("#usersTable tbody");
  tableBody.innerHTML = "";

  users.forEach(user => {
    const row = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone_number || ""}</td>
        <td>
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
};

// ✅ Delete user
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  });

  if (res.status === 204) {
    alert("User deleted!");
    window.location.reload();
  } else {
    alert("Delete failed");
  }
}

// ✅ Edit user (basic prompt example)
async function editUser(id) {
  window.location.href= `update.html?id=${id}`
}
