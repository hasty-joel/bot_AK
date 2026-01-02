// --------------------------
// Hamburger Menu
// --------------------------
const ham = document.querySelector('.ham-menu');
const osm = document.querySelector('header ul');

ham.addEventListener('click', () => {
  ham.classList.toggle('active');
  osm.classList.toggle('active');
});

// --------------------------
// Cart functionality
// --------------------------
let count = 0;
function addToCart() {
  count++;
  document.getElementById('cart-count').textContent = count;
}

// --------------------------
// Contact Form Submission
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("contactForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!nameInput || !emailInput || !messageInput) {
      alert("Form inputs not found");
      return;
    }

    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      alert("Please fill in all fields");
      return;
    }

    try {
      alert("Sending message...");

      // Send data to backend
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      alert("? " + result.message);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("? " + err.message);
    }
  });
});