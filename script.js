/* TASK 4 – Change Background Color (Page + Header) */
document.getElementById("colorBtn").addEventListener("click", function () {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    // Change full page color
    document.body.style.background = randomColor;

    // Change header color
    document.querySelector("header").style.background = randomColor;
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


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
/* FEATURE 1 – Load Multiple Posts (Cards) */
document.getElementById("loadAllPostsBtn").addEventListener("click", () => {
    
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(posts => {
            const container = document.getElementById("postsContainer");
            container.innerHTML = ""; // clear previous posts

            posts.slice(0, 12).forEach(post => {  // show first 12 cards
                const card = `
                    <div class="card">
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                        <p><b>User ID:</b> ${post.userId}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(err => console.log(err));
});
/* FEATURE 2 – Search API by ID */
document.getElementById("searchPostBtn").addEventListener("click", () => {
    const id = document.getElementById("postIdInput").value;
    const output = document.getElementById("searchResult");

    if (id === "" || id <= 0 || id > 100) {
        output.style.display = "block";
        output.innerHTML = "<p>Please enter a valid Post ID (1–100)</p>";
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            output.style.display = "block";
            output.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <p><b>User ID:</b> ${data.userId}</p>
            `;
        })
        .catch(err => {
            output.innerHTML = "<p>Error loading data</p>";
            console.log(err);
        });
});
