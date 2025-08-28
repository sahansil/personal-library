// function login(){
//     const email=document.getElementById("email").value;
//       console.log("email",email,);

//     const password=document.getElementById("password").value;
//     console.log("password",password);
     
// }

//fetch("apiUrl{options}")
//options:{
//method:POST|GET|PUT|DELETE|PATCH
//headers:{
//"Content-Type":"application/json" | 'multipart/form-data;'
//"Authorization":Bearer token
//}
//body:JSON.stringify({email,password})
//}


const apiUrl = "http://localhost:5000/api/users/login";

async function login(email,password){
    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}


async function postlogin(){
    const email=document.getElementById("email").value;
      console.log("email",email,);

    const password=document.getElementById("password").value;
    console.log("password",password);

  const result = await login(email, password);
    console.log(result);

    if (result.token) {
        // Save values to localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", result.user.id);
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("name", result.user.name);

        // ✅ Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        alert(result.error || "Login failed");
    }
  }