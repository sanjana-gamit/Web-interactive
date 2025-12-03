/* TASK 4 – Change Background Color */
document.getElementById("colorBtn").addEventListener("click", function () {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.background = randomColor;
});

/* TASK 5 – API Integration */
document.getElementById("loadApiBtn").addEventListener("click", function () {

    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => response.json())
        .then(data => {
            const box = document.getElementById("apiResult");
            box.style.display = "block";

            box.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <p><b>User ID:</b> ${data.userId}</p>
            `;
        })
        .catch(error => {
            alert("Error loading API!");
            console.log(error);
        });
});
