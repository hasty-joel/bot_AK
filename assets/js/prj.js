// --------------------------
// Hamburger Menu
// --------------------------
const ham = document.querySelector(".ham-menu");
const osm = document.querySelector("header ul");

if (ham && osm) {
  ham.addEventListener("click", () => {
    ham.classList.toggle("active");
    osm.classList.toggle("active");
  });
}

// --------------------------
// Cart functionality
// --------------------------
let count = 0;
function addToCart() {
  count++;
  document.getElementById("cart-count").textContent = count;
}

// --------------------------
// Contact Form (EmailJS)
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("contactForm not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    const params = {
      name: name,
      email: email,
      message: message,
    };

    alert("Sending message...");

    emailjs
      .send(
        "service_hxaclye",
        "template_mu0gn0k",
        params
      )
      .then(
        function () {
          alert("? Message sent successfully!");
          form.reset();
        },
        function (error) {
          console.error(error);
          alert("? Failed to send message. Try again.");
        }
      );
  });
});