const signupApiUrl = "http://localhost:5000/api/users/"; // ✅ correct URL (since you have router.post('/') for signup)

async function signup(name, email, phone_number, password) {
    const res = await fetch(signupApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone_number, password })
    });
    return res.json();
}

async function postsignup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone_number = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log({ name, email, phone_number, password }); // debug

    const result = await signup(name, email, phone_number, password);
    console.log(result);

    if (result.id) {
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert("Signup failed: " + (result.error || "Something went wrong"));
    }
}
