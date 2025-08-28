const UpdateApiUrl = "http://localhost:5000/api/users/"; // ✅ correct URL (since you have router.post('/') for signup)

async function signup(id, name, email, phone_number, password) {
    const res = await fetch(UpdateApiUrl+'/'+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone_number, password })
    });
    return res.json();
}