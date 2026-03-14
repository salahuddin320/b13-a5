
const loginPage = () => {
    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;
    const contentContainer = document.getElementById("content-container");
    if (userName === "admin" && passWord === "admin123") {
        window.location.href = "main.html";
    } else {
        const msg = document.createElement("p");
        msg.innerText = "Invalid";
        contentContainer.innerHTML = "";
        contentContainer.append(msg);
    }
};