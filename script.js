/* ===========================
   TASK 4 – Change Background Color (Legacy Button, Optional)
=========================== */
const colorBtn = document.getElementById("colorBtn");
if (colorBtn) {
    colorBtn.addEventListener("click", function () {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        // Apply color to body, header, footer
        document.body.style.background = randomColor;
        document.querySelector("header").style.background = randomColor;
        document.querySelector("footer").style.background = randomColor;

        // Smooth transition
        ["header", "footer", "body"].forEach(el => {
            document.querySelector(el).style.transition = "background 0.7s ease-in-out";
        });
    });
}

/* ===========================
   TASK 5 – Basic API Integration
=========================== */
const loadApiBtn = document.getElementById("loadApiBtn");
if (loadApiBtn) {
    loadApiBtn.addEventListener("click", () => {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(res => res.json())
            .then(data => {
                const box = document.getElementById("apiResult");
                box.style.display = "block";
                box.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.body}</p>
                    <p><b>User ID:</b> ${data.userId}</p>
                `;
            })
            .catch(err => {
                alert("Error loading API!");
                console.error(err);
            });
    });
}

/* ===========================
   NAVBAR – Active Section Highlight
=========================== */
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

/* ===========================
   FEATURE 1 – Load Multiple Posts (Cards)
=========================== */
const loadAllPostsBtn = document.getElementById("loadAllPostsBtn");
if (loadAllPostsBtn) {
    loadAllPostsBtn.addEventListener("click", () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(posts => {
                const container = document.getElementById("postsContainer");
                container.innerHTML = ""; // clear previous posts

                posts.slice(0, 12).forEach(post => { // show first 12
                    container.innerHTML += `
                        <div class="card">
                            <h3>${post.title}</h3>
                            <p>${post.body}</p>
                            <p><b>User ID:</b> ${post.userId}</p>
                        </div>
                    `;
                });
            })
            .catch(err => console.error(err));
    });
}

/* ===========================
   FEATURE 2 – Search API by ID
=========================== */
const searchPostBtn = document.getElementById("searchPostBtn");
if (searchPostBtn) {
    searchPostBtn.addEventListener("click", () => {
        const id = document.getElementById("postIdInput").value;
        const output = document.getElementById("searchResult");

        if (!id || id <= 0 || id > 100) {
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
                console.error(err);
            });
    });
}

/* ===========================
   FEATURE 6 – Theme Color Change (Header + Main + Footer)
=========================== */
const colorThemes = [
    { header: "#0a3d62", main: "#82ccdd" },
    { header: "#6a1b9a", main: "#ba68c8" },
    { header: "#1e5631", main: "#a4de02" },
    { header: "#b33939", main: "#fab1a0" },
    { header: "#30336b", main: "#95afc0" },
    { header: "#2d3436", main: "#dfe6e9" }
];

const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

        ["header", "main", "footer"].forEach(el => {
            const element = document.querySelector(el);
            if (el === "main") element.style.background = theme.main;
            else element.style.background = theme.header;
            element.style.transition = "background 0.7s ease-in-out";
        });
    });
}

/* ===========================
   TASK 6 – FORM VALIDATION
=========================== */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();

        let isValid = true;
        const errorMessages = contactForm.querySelectorAll(".error-message");
        errorMessages.forEach(span => span.textContent = "");

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        // Name validation
        if (!name.value.trim()) {
            name.nextElementSibling.textContent = "Name is required.";
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            email.nextElementSibling.textContent = "Email is required.";
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            email.nextElementSibling.textContent = "Enter a valid email.";
            isValid = false;
        }

        // Message validation
        if (!message.value.trim()) {
            message.nextElementSibling.textContent = "Message cannot be empty.";
            isValid = false;
        }

        // Feedback
        const formFeedback = document.getElementById("formFeedback");
        if (isValid) {
            formFeedback.textContent = "Form submitted successfully!";
            formFeedback.style.color = "green";
            contactForm.reset();
        } else {
            formFeedback.textContent = "Please fix errors above.";
            formFeedback.style.color = "red";
        }
    });
}