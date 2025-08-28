

const apiUrl = "http://localhost:5000/api";

async function getusers(){
    const  token = localStorage.getItem("token");
    // api call
    const res = await fetch(apiUrl +"/users/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
        },
    });
    return res.json();
}

getusers().then(users =>{
console.log(users);
});
