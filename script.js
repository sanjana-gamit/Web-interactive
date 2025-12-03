// Get the button
const btn = document.getElementById("colorBtn");

// Function to change background color
btn.addEventListener("click", function () {
    
    // Array of colors
    const colors = ["#f7f7f7", "#ffe5b4", "#d4f1f9", "#f5d3d3", "#e8f5e9", "#f0e6ff"];

    // Pick a random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Apply to body background
    document.body.style.backgroundColor = randomColor;
});
