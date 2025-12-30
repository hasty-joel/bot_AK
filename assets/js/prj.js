//Interactive ham_b 
const ham = document.querySelector('.ham-menu');

const osm = document.querySelector('header ul');

ham.addEventListener('click', ( )  =>  {
  ham.classList.toggle('active');
  osm.classList.toggle('active');
})

// Optional: Simple contact form submission handling (demo)
const form = document.getElementById('contact-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for reaching out to Laceon_Ak_Stiches! We will get back to you soon.');
  form.reset();
});

// cart 
let count = 0;

function addToCart() {
  count++;
  document.getElementById('cart-count').textContent = count;
}