document.addEventListener("DOMContentLoaded", () => {

  // Initialize EmailJS
  emailjs.init("kDGSn8EznqcXCEQZZ");

  /* =========================
     Hamburger Menu
  ========================== */
  const ham = document.querySelector(".ham-menu");
  const nav = document.querySelector("header ul");

  if (ham && nav) {
    ham.addEventListener("click", () => {
      ham.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  /* =========================
     Cart Counter
  ========================== */
  let count = 0;
  window.addToCart = function () {
    count++;
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = count;
  };

  /* =========================
     Contact Form + EmailJS
  ========================== */
  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("contactForm not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!nameInput || !phoneInput || !messageInput) {
      alert("Form inputs missing");
      return;
    }

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput.value.trim();

    if (!name || !phone || !message) {
      alert("Please fill in Name, Phone Number and Message");
      return;
    }

    const params = {
      name: name,
      phone: phone,
      email: email || "Not provided",
      message: message,
    };

    alert("Sending message...");

    emailjs
      .send("service_hxaclye", "template_mu0gn0k", params)
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("❌ Failed to send message. Please try again.");
      });
  });

});